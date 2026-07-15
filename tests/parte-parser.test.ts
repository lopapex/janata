import { describe, expect, it } from 'vitest';
import { parseObituaries } from '../src/lib/parte-parser';

describe('parseObituaries', () => {
  it('normalizuje jméno, detail a obrázek', () => {
    const html = `<div class="gallery"><a href="/jana-novakova/g-42" title="Jana Nováková"><img src="/assets/parte.jpg" alt="Jana Nováková"></a></div>`;
    expect(parseObituaries(html)).toEqual([{ name: 'Jana Nováková', detailUrl: 'https://www.zamberk.cz/jana-novakova/g-42', imageUrl: 'https://www.zamberk.cz/assets/parte.jpg' }]);
  });

  it('ignoruje navigační a duplicitní odkazy', () => {
    const html = `<a href="/x/g-1" title="Smuteční deska">x</a><a href="/jana/g-2" title="Jana">Jana</a><a href="/jana/g-2" title="Jana">Jana</a>`;
    expect(parseObituaries(html)).toHaveLength(1);
  });

  it('vrací prázdné pole při změně struktury', () => {
    expect(parseObituaries('<main><p>Bez záznamů</p></main>')).toEqual([]);
  });
});
