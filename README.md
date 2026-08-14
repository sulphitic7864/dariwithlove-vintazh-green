# Kyrgyz / Russian Wedding Invitation — Reference Flowers Style

A mobile-first Next.js wedding invitation recreated from the supplied `history_flowers` reference composition using **Tailwind CSS** for the actual layout and styling.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Server Components by default
- Client Components only for language switching, intro video/music, countdown and RSVP
- Google Sheets RSVP API

## What matches the supplied reference

The invitation is intentionally narrow and mobile-first (up to 430px) with the same visual rhythm as the reference screenshot:

1. Intro / opening video
2. Dear guests / invitation copy
3. Program of the day
4. Centered quote
5. Rounded monochrome couple photo
6. Location with venue photo and black pill button
7. Details (presents / flowers / small request)
8. Dress code palette
9. Girls outfit strip
10. Men outfit strip
11. Guest questionnaire
12. Countdown
13. Second monochrome couple photo
14. Contacts / monogram / social buttons
15. See you / hosts
16. Bottom white order block to preserve the reference-page composition

Large white floral decorations are layered around the narrow centered text just like the reference.

## Tailwind implementation

All section sizing, spacing, typography, positioning, borders, buttons, galleries and responsive behavior are implemented directly with Tailwind utility classes in the `.tsx` components.

`src/app/globals.css` contains only:

- Tailwind import
- two font-family theme tokens
- small global reset
- KG/RU visibility selectors
- reduced-motion fallback

There is no old monolithic custom section CSS.

## Main wedding configuration

Normally edit only:

```text
src/data/wedding.ts
```

It contains:

- groom and bride names
- date and start time
- timezone
- venue and map URL
- timeline
- detail cards
- dress-code copy and images
- RSVP copy
- contact person
- hosts
- Kyrgyz / Russian translations
- intro video
- music
- decorative assets
- gallery images

## Language

Kyrgyz is the default language. The `KG | RU` switcher changes visible text instantly without a page reload.

The audio element, countdown and RSVP state are not remounted when language changes.

## Intro video + music

The supplied MP4 is configured in:

```ts
wedding.assets.introVideo.mp4
```

On the first user interaction:

1. the intro text/button disappears
2. the video plays inline
3. music starts from the same user gesture
4. the invitation remains covered until the video ends
5. the overlay fades away

If video playback fails, the page still opens.

## RSVP / Google Sheets

Route:

```text
src/app/api/rsvp/route.ts
```

Server utility:

```text
src/lib/server/google-sheets.ts
```

The reference-style questionnaire includes attendance, guest name, guest count and drink preferences.

The Google Sheet columns are:

```text
Timestamp | Name | Attendance | Guest Count | Drink Preferences
```

Attendance is normalized to:

```text
Придёт
Не придёт
```

## Environment variables

Create `.env.local` from `.env.example`:

```env
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

Google credentials are read only by server-side code.

## Google Sheets setup for each couple

1. Create a new Google Sheet.
2. Rename it using the couple's names.
3. Share it with the email in `GOOGLE_CLIENT_EMAIL` and grant **Editor** access.
4. Copy the spreadsheet ID from the Google Sheets URL.
5. Set `GOOGLE_SHEET_ID` in `.env.local`.
6. Reuse the existing `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` values.
7. Add the same three environment variables to the Vercel project.
8. Redeploy after changing the environment variables.

The first RSVP submission creates the header row when the sheet is empty.

## Local development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

For a production check:

```bash
npm run typecheck
npm run build
npm start
```

## Vercel deployment

1. Push the project to GitHub/GitLab/Bitbucket or import the folder directly.
2. Create a new Vercel project.
3. Add the three Google environment variables.
4. Deploy.
5. Make sure the Google Sheet is shared with `GOOGLE_CLIENT_EMAIL`.

## Replacing the demo content

### Couple

Edit:

```ts
wedding.couple
```

### Date and time

Edit:

```ts
wedding.event
```

### Venue

Edit:

```ts
wedding.venue
```

### Timeline

Add/remove entries from:

```ts
wedding.timeline
```

### Dress-code images

Edit:

```ts
wedding.dressCode.paletteImage
wedding.dressCode.women.images
wedding.dressCode.men.images
```

### Contacts

Edit:

```ts
wedding.contact
```

### Translations

All Russian and Kyrgyz copy is centralized in:

```ts
wedding.copy
```

## Reference-specific note

The bottom white order block is included because it appears in the supplied full-page screenshot. If this project is used only as a private couple invitation and you do not want the template-sales area, remove `<OrderInvitation />` from `src/app/page.tsx`.

## Build verification in this workspace

The source was syntax-checked with TypeScript. A full dependency install/build could not be completed in the current sandbox because npm registry access timed out. Run `npm install && npm run build` in a normal networked development environment before deployment.
