import { createSign } from 'node:crypto';
import { fallbackContent, type GalleryImage, type Service, type SiteContent } from '../data/fallback-content';

type Rows = string[][];

function keyValue(rows: Rows): Record<string, string> {
  return Object.fromEntries(rows.slice(1).filter((row) => row[0]).map(([key, value = '']) => [key.trim(), value.trim()]));
}

function services(rows: Rows): Service[] {
  return rows.slice(1).filter((row) => row[0] && row[1]).map(([title, description, image]) => ({ title: title.trim(), description: description.trim(), image: image?.trim() || undefined }));
}

function gallery(rows: Rows): GalleryImage[] {
  return rows.slice(1).filter((row) => row[0] && row[1]).map(([src, alt]) => ({ src: src.trim(), alt: alt.trim() }));
}

async function getRange(sheetId: string, range: string, token: string): Promise<Rows> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(range)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error(`Google Sheets ${response.status}`);
  const data = await response.json() as { values?: Rows };
  return data.values || [];
}

function base64url(value: string | Buffer): string {
  return Buffer.from(value).toString('base64url');
}

async function getGoogleToken(credentials: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  }));
  const unsigned = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(credentials.private_key, 'base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` })
  });
  if (!response.ok) throw new Error(`Google OAuth ${response.status}`);
  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error('Google token nebyl vydán');
  return data.access_token;
}

export async function loadContent(): Promise<SiteContent> {
  const sheetId = import.meta.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID;
  const rawCredentials = import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!sheetId || !rawCredentials) return fallbackContent;

  try {
    const credentials = JSON.parse(rawCredentials);
    const token = await getGoogleToken(credentials);
    const [settingsRows, serviceRows, galleryRows, seoRows] = await Promise.all([
      getRange(sheetId, 'Nastaveni!A:B', token),
      getRange(sheetId, 'Sluzby!A:C', token),
      getRange(sheetId, 'Galerie!A:B', token),
      getRange(sheetId, 'SEO!A:B', token)
    ]);

    return {
      settings: { ...fallbackContent.settings, ...keyValue(settingsRows) },
      services: services(serviceRows).length ? services(serviceRows) : fallbackContent.services,
      gallery: gallery(galleryRows).length ? gallery(galleryRows) : fallbackContent.gallery,
      seo: { ...fallbackContent.seo, ...keyValue(seoRows) }
    };
  } catch (error) {
    console.warn('Google Sheets není dostupný, používám bezpečný výchozí obsah.', error);
    return fallbackContent;
  }
}
