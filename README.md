# Pohřební služba Janata

Statický web v Astro pro Pohřební službu Daniel Janata v Žamberku. Obsah lze při buildu načítat z Google Sheets. Aktuální smuteční oznámení poskytuje Netlify Function z veřejné smuteční desky města Žamberk.

## Lokální spuštění

```bash
npm install
npm run dev
```

Pro lokální test Netlify integrace použijte `npx netlify dev`. Kontroly spustíte přes `npm test`, `npm run check` a `npm run build`.

## Nasazení na Netlify

1. Připojte Git repozitář v Netlify Sites.
2. Netlify načte build příkaz a adresář z `netlify.toml`.
3. Nastavte `SITE_URL` na finální doménu.
4. Volitelně nastavte proměnné podle `.env.example`.
5. Před spuštěním nahraďte doménu sitemap v `public/robots.txt` finální doménou.

Podrobný postup pro Google Sheets je v [cms/README.md](cms/README.md).

## Obsah ke schválení

Před ostrým zveřejněním musí provozovatel potvrdit seznam služeb, postup při úmrtí, kontakty, fotografie a text ochrany soukromí. Ve výchozí verzi je proto viditelné upozornění.

Tři výchozí fotografie byly vytvořeny generátorem obrázků pro tento projekt. Nezobrazují konkrétní provozovnu ani skutečné osoby.
