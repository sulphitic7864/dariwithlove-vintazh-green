# Reference background / flower asset workflow

The page layout in this project is intentionally full viewport width. The invitation content remains centered in a narrow rail, while decorative flower PNGs are positioned from the left/right edges of each full-width section.

## How to collect the original Tilda decorative assets (when you have permission)

1. Open `https://dariwithlove-card.ru/history_flowers` in Chrome.
2. Press **F12** → **Network**.
3. Select the **Img** filter, then reload the page.
4. Search for `tildacdn`, `daria_dwl`, `.png`, or `.webp`.
5. Click a request and inspect **Request URL** / **Preview**. Tilda often serves a tiny `thb.tildacdn.com/.../-/resize/...` preview first and loads a larger/original asset afterward.
6. For an image that is used as a CSS background, use **Elements** → select the flower/section → **Computed** → search `background-image`, then open the URL shown there.
7. Open the original/full-size request in a new tab and save it into `public/decor/`.
8. Update only the paths under `wedding.assets.decor.clusters` in `src/data/wedding.ts`.

Useful names visible on the live reference include variants such as:

- `daria_dwl_15.png`
- `daria_dwl_181.png`
- `daria_dwl_16.png`
- `daria_dwl_1911_11_1.png`
- `daria_dwl_12.png`
- `daria_dwl_13.png`

The local `public/decor/ref-edge-*.png` files are already arranged as reference-style fallbacks, so the layout works without depending on the reference site's CDN.

## Tools

Chrome DevTools is the most reliable option. For a one-off archive, extensions such as **SingleFile** can save the rendered page, but DevTools Network is better for identifying the actual full-resolution image URLs.
