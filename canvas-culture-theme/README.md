# Canvas Culture — Shopify Theme

## Install via Shopify CLI (recommended)
```bash
npm install -g @shopify/cli @shopify/theme
shopify login --store yourstore.myshopify.com
shopify theme push --path ./canvas-culture-theme
```

## Install via ZIP
1. Zip the entire `canvas-culture-theme/` folder
2. Shopify admin → Online Store → Themes → Upload theme
3. Select the ZIP file → Upload
4. Click "Customize" to edit via theme editor
5. Click "Publish" when ready

## Printful sync
After installing: Shopify admin → Apps → Printful
Products synced from Printful auto-inherit theme styles.

## Collections setup
Create collections in Shopify with automated tag rules:
- `cars` / `christianity` / `smoking` / `bar-decor` / `bathroom`
- `animals` / `music` / `history` / `best-seller` / `new-releases`
- `vintage-art` / `cities` / `ansel-adams`

## Theme Customization
Go to **Online Store → Themes → Customize** to:
- Change gold accent color
- Update promo banner text
- Toggle welcome popup
- Change discount code
- Edit hero images and text
- Manage collection grids
