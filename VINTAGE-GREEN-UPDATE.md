# Vintage Green Wedding Update

This version updates the supplied Next.js wedding invitation template to follow the provided vintage green Dari With Love reference.

## Main changes

- Added the split floral/dark-green opening screen with a large curved green panel and OPEN button.
- Added the provided vintage floral background and decorative SVG assets under `public/vintage/`.
- Reworked the main invitation hero into the outlined vintage oval/card style.
- Grouped Program, Location and Details inside the large dark-green rounded section.
- Restyled Dress Code, RSVP, countdown, contacts, closing section and order form to match the cream/green/gold reference palette.
- Preserved the existing bilingual data system, music toggle, RSVP API route and central `src/data/wedding.ts` configuration.
- The loading button copy is set to `OPEN` for both languages to match the reference.

## Main customization file

Edit names, dates, venue, schedule, contacts and copy in:

`src/data/wedding.ts`
