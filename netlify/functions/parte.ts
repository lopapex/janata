import { parseObituaries } from '../../src/lib/parte-parser';

const DEFAULT_SOURCE = 'https://www.zamberk.cz/smutecni-deska/gs-1803';

export default async () => {
  const sourceUrl = process.env.PARTE_SOURCE_URL || DEFAULT_SOURCE;
  try {
    const response = await fetch(sourceUrl, {
      headers: { 'User-Agent': 'PohrebniSluzbaJanata/1.0 (+https://pohrebni-sluzba-janata.netlify.app)' },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error(`Zdroj odpověděl ${response.status}`);
    const items = parseObituaries(await response.text());
    return new Response(JSON.stringify({ items, sourceUrl, updatedAt: new Date().toISOString() }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=1800, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ items: [], sourceUrl, error: 'Smuteční oznámení se nyní nepodařilo načíst.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, s-maxage=300' }
    });
  }
};
