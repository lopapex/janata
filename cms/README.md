# Redakce v Google Sheets

Vytvořte tabulku se čtyřmi listy. První řádek je vždy záhlaví.

## Nastaveni

Sloupce jsou `klic` a `hodnota`. Podporované klíče: `name`, `owner`, `phone`, `phoneHref`, `address`, `ico`, `heroTitle`, `heroText`, `aboutTitle`, `aboutText` a `notice`.

## Sluzby

Sloupce jsou `nazev`, `popis`, `obrazek`. Třetí sloupec je připravený pro budoucí použití a může zůstat prázdný.

## Galerie

Sloupce jsou `url` a `alt`. Obrázky musí být veřejně dostupné bez přihlášení. Doporučený rozměr je alespoň 1400 × 1000 px.

## SEO

Sloupce jsou `klic` a `hodnota`. Použijte klíče `title` a `description`.

## Připojení a publikování

1. V Google Cloud vytvořte service account a zapněte Google Sheets API.
2. Tabulku nasdílejte e-mailu service accountu pouze pro čtení.
3. V Netlify nastavte `GOOGLE_SHEET_ID` a celý JSON klíč jako `GOOGLE_SERVICE_ACCOUNT_JSON`.
4. Do tabulky vložte obsah souboru `Code.gs` jako Apps Script.
5. V Netlify vytvořte Build Hook. URL uložte v Apps Script Project Settings jako `NETLIFY_BUILD_HOOK`.
6. Po změně použijte nabídku **Web Janata > Publikovat web**.

Pokud Google API při buildu selže, web použije bezpečný obsah uložený v projektu. Poslední úspěšný deploy zůstane v Netlify dostupný.
