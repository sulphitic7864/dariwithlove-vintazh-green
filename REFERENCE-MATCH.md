# Reference Match Checklist

The page after the intro is intentionally ordered to match the supplied full-page screenshot:

- [x] Dear guests invitation block
- [x] Wedding date and love line
- [x] Program of the day with four time entries
- [x] Centered quotation
- [x] Rounded monochrome couple image
- [x] Location title, venue, address, rounded venue photo, map button
- [x] Details / presents / flowers / small request
- [x] Dress code heading and palette
- [x] Girls copy and edge-to-edge photo strip
- [x] Men copy and edge-to-edge photo strip
- [x] Guest questionnaire
- [x] Attendance controls
- [x] Name field
- [x] Guest count
- [x] Drink preferences
- [x] Black pill submit button
- [x] Countdown
- [x] Second rounded monochrome couple image
- [x] Contacts, monogram, phone, social controls
- [x] See-you / hosts ending
- [x] White order/contact block at the bottom
- [x] Large white floral edge decorations throughout
- [x] Narrow centered typography and muted grey paper background
- [x] Tailwind CSS utilities for all section layout/styling
- [x] KG/RU instant switching
- [x] Intro video + persistent music
- [x] Google Sheets RSVP API

## Full-width canvas update

The grey invitation background now spans the full viewport width. Every section remains full-width so its flower decorations attach to the browser edges, while the readable invitation content stays centered in the narrow reference-style column. The bottom order block remains full-width white, matching the reference transition.

## Contact icons

The Contacts section now uses the supplied 30x30 Phone, WhatsApp and Telegram SVG artwork and links from `src/data/wedding.ts`. The Telegram value supplied in the reference markup is literally `123`; replace that config value with the final Telegram URL when available.
