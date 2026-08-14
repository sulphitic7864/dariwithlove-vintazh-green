import { NextResponse } from "next/server";
import { appendRsvp } from "@/lib/server/google-sheets";

export const runtime = "nodejs";

type Payload = Readonly<{ name?: unknown; attendance?: unknown; guestCount?: unknown; drinks?: unknown }>;
const allowedDrinks = new Set(["red-wine", "white-wine", "whisky", "vodka", "champagne", "soft"]);

function sanitizeName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 100) return null;
  if (/[<>\u0000-\u001F]/.test(name)) return null;
  return name;
}

function parseGuestCount(value: unknown): 1 | 2 | 3 | null {
  return value === 1 || value === 2 || value === 3 ? value : null;
}

function parseDrinks(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && allowedDrinks.has(item)).slice(0, 6);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, code: "INVALID_CONTENT_TYPE" }, { status: 415 });
  }

  const raw = await request.text();
  if (raw.length > 4096) return NextResponse.json({ ok: false, code: "PAYLOAD_TOO_LARGE" }, { status: 413 });

  let payload: Payload;
  try { payload = JSON.parse(raw) as Payload; }
  catch { return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 }); }

  const name = sanitizeName(payload.name);
  const attendance = payload.attendance === "yes" || payload.attendance === "no" ? payload.attendance : null;
  const guestCount = parseGuestCount(payload.guestCount);
  const drinks = parseDrinks(payload.drinks);

  if (!name || !attendance || !guestCount) {
    return NextResponse.json({ ok: false, code: "INVALID_FIELDS" }, { status: 400 });
  }

  try {
    await appendRsvp({
      timestamp: new Date().toISOString(),
      name,
      attendance: attendance === "yes" ? "Придёт" : "Не придёт",
      guestCount,
      drinks,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return NextResponse.json({ ok: false, code: "SHEETS_ERROR" }, { status: 500 });
  }
}
