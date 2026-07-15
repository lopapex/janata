import * as cheerio from 'cheerio';

export interface Obituary {
  name: string;
  detailUrl: string;
  imageUrl?: string;
  fullImageUrl?: string;
}

const BASE_URL = 'https://www.zamberk.cz';

function absoluteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try { return new URL(value, BASE_URL).toString(); } catch { return undefined; }
}

function originalImageUrl(detailUrl: string, imageUrl: string | undefined): string | undefined {
  if (!imageUrl) return undefined;
  const imageId = detailUrl.match(/id_obrazky=(\d+)/)?.[1];
  if (!imageId) return undefined;
  try {
    const url = new URL(imageUrl);
    if (!/\/assets\/Image\.ashx$/i.test(url.pathname)) return undefined;
    url.searchParams.set('id_obrazky', imageId);
    const result = url.toString();
    return result === imageUrl ? undefined : result;
  } catch {
    return undefined;
  }
}

export function parseObituaries(html: string, limit = 12): Obituary[] {
  const $ = cheerio.load(html);
  const result: Obituary[] = [];
  const seen = new Set<string>();

  $('a[href*="/g-"], a[href*="id_obrazky"]').each((_, element) => {
    if (result.length >= limit) return false;
    const link = $(element);
    const name = link.attr('title')?.trim() || link.find('img').attr('alt')?.trim() || link.text().trim();
    const detailUrl = absoluteUrl(link.attr('href'));
    if (!name || !detailUrl || /předchozí|další|smuteční deska/i.test(name) || seen.has(detailUrl)) return;
    const imageUrl = absoluteUrl(link.find('img').attr('src') || link.find('img').attr('data-src'));
    const fullImageUrl = originalImageUrl(detailUrl, imageUrl);
    seen.add(detailUrl);
    result.push({ name: name.replace(/\s+/g, ' '), detailUrl, imageUrl, ...(fullImageUrl ? { fullImageUrl } : {}) });
  });

  return result;
}
