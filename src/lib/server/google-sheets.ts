import "server-only";

import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

const SHEET_HEADERS = [
  "Timestamp",
  "Name",
  "Attendance",
  "Drink Preferences",
] as const;

function base64Url(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function requireEnv(
  name:
    | "GOOGLE_CLIENT_EMAIL"
    | "GOOGLE_PRIVATE_KEY"
    | "GOOGLE_SHEET_ID"
): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getPrivateKey(): string {
  let privateKey = requireEnv("GOOGLE_PRIVATE_KEY");

  // Remove accidental wrapping quotes
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }

  // Convert escaped \n from .env into real newlines
  privateKey = privateKey.replace(/\\n/g, "\n");

  return privateKey;
}

async function getAccessToken(): Promise<string> {
  const clientEmail = requireEnv("GOOGLE_CLIENT_EMAIL");
  const privateKey = getPrivateKey();

  const now = Math.floor(Date.now() / 1000);

  const jwtHeader = {
    alg: "RS256",
    typ: "JWT",
  };

  const jwtPayload = {
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64Url(JSON.stringify(jwtHeader));
  const encodedPayload = base64Url(JSON.stringify(jwtPayload));

  const unsignedJwt = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign("RSA-SHA256");

  signer.update(unsignedJwt);
  signer.end();

  let signature: string;

  try {
    signature = signer
      .sign(privateKey)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  } catch (error) {
    console.error("Unable to sign Google JWT:", error);

    throw new Error(
      "Unable to sign Google JWT. Check GOOGLE_PRIVATE_KEY."
    );
  }

  const assertion = `${unsignedJwt}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({
      grant_type:
        "urn:ietf:params:oauth:grant-type:jwt-bearer",

      assertion,
    }),

    cache: "no-store",
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error(
      "Google OAuth error:",
      response.status,
      responseText
    );

    throw new Error(
      `Google OAuth failed (${response.status}): ${responseText}`
    );
  }

  let data: {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
  };

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Invalid Google OAuth response: ${responseText}`
    );
  }

  if (!data.access_token) {
    throw new Error(
      `Google OAuth response did not include access_token: ${responseText}`
    );
  }

  return data.access_token;
}

async function ensureHeaders(
  accessToken: string,
  sheetId: string
): Promise<void> {
  const range = encodeURIComponent("A1:E1");

  const valuesUrl =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${encodeURIComponent(sheetId)}/values/${range}`;

  // Check first row
  const readResponse = await fetch(valuesUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const readText = await readResponse.text();

  if (!readResponse.ok) {
    console.error(
      "Google Sheets header read error:",
      readResponse.status,
      readText
    );

    throw new Error(
      `Unable to inspect Google Sheet header (${readResponse.status}): ${readText}`
    );
  }

  const existing = JSON.parse(readText) as {
    values?: string[][];
  };

  const firstRow = existing.values?.[0] ?? [];

  const alreadyCorrect = SHEET_HEADERS.every(
    (header, index) => firstRow[index] === header
  );

  // Headers already exist
  if (alreadyCorrect) {
    return;
  }

  // Sheet is empty → create headers
  if (firstRow.length === 0) {
    const writeResponse = await fetch(
      `${valuesUrl}?valueInputOption=RAW`,
      {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          range: "A1:E1",
          majorDimension: "ROWS",
          values: [
            [
              "Timestamp",
              "Name",
              "Attendance",
              "Drink Preferences",
            ],
          ],
        }),

        cache: "no-store",
      }
    );

    const writeText = await writeResponse.text();

    if (!writeResponse.ok) {
      console.error(
        "Google Sheets header write error:",
        writeResponse.status,
        writeText
      );

      throw new Error(
        `Unable to create Google Sheet headers (${writeResponse.status}): ${writeText}`
      );
    }

    console.log("Google Sheet headers created successfully");

    return;
  }

  console.warn(
    "Google Sheet row 1 is not empty and does not contain expected headers:",
    firstRow
  );
}

export async function appendRsvp(
  input: Readonly<{
    timestamp: string;
    name: string;
    attendance: "Придёт" | "Не придёт";
    drinks: readonly string[];
  }>
): Promise<void> {
  const sheetId = requireEnv("GOOGLE_SHEET_ID");

  const accessToken = await getAccessToken();

  await ensureHeaders(accessToken, sheetId);

  const range = encodeURIComponent("A:E");

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${encodeURIComponent(sheetId)}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      values: [
        [
          input.timestamp,
          input.name,
          input.attendance,
          input.drinks.join(", "),
        ],
      ],
    }),

    cache: "no-store",
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error(
      "Google Sheets append error:",
      response.status,
      responseText
    );

    throw new Error(
      `Google Sheets append failed (${response.status}): ${responseText}`
    );
  }

  console.log("RSVP successfully stored in Google Sheets");
}