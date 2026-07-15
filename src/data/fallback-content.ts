export type Service = { title: string; description: string; image?: string };
export type GalleryImage = { src: string; alt: string };

export interface SiteContent {
  settings: Record<string, string>;
  services: Service[];
  gallery: GalleryImage[];
  seo: Record<string, string>;
}

export const fallbackContent: SiteContent = {
  settings: {
    name: 'Pohřební služba Janata',
    owner: 'Daniel Janata',
    phone: '+420 465 614 492',
    phoneHref: '+420465614492',
    address: 'Pod Radnicí 154, 564 01 Žamberk',
    ico: '61212555',
    heroTitle: 'Důstojné rozloučení. Lidská pomoc.',
    heroText: 'Pomůžeme vám klidně projít vším, co je potřeba zařídit.',
    aboutTitle: 'Jsme vám nablízku v Žamberku a okolí',
    aboutText: 'Pohřební služba Daniel Janata zajišťuje poslední rozloučení s osobním a citlivým přístupem. Vysvětlíme jednotlivé kroky a pomůžeme s přípravou obřadu podle přání rodiny.',
    notice: 'Texty a rozsah služeb jsou návrhem k potvrzení provozovatelem před ostrým spuštěním.'
  },
  services: [
    { title: 'Sjednání pohřbu', description: 'Probereme s vámi podobu rozloučení, termín, místo i potřebné náležitosti.' },
    { title: 'Převoz zesnulého', description: 'Domluvíme další postup a zajistíme převoz v souladu s platnými pravidly.' },
    { title: 'Smuteční obřad', description: 'Pomůžeme připravit důstojné rozloučení v obřadní síni, kostele nebo u hrobu.' },
    { title: 'Kremace a uložení', description: 'Zajistíme kremaci, pohřeb do země i následné předání nebo uložení urny.' },
    { title: 'Smuteční oznámení', description: 'Připravíme parte a po souhlasu rodiny zajistíme jeho zveřejnění.' },
    { title: 'Květinová výzdoba', description: 'Pomůžeme s výběrem věnců, kytic a další výzdoby pro poslední rozloučení.' }
  ],
  gallery: [
    { src: '/images/hero-janata.webp', alt: 'Klidná cesta mezi stromy na místním hřbitově' },
    { src: '/images/priprava-obradu.webp', alt: 'Bílé květiny a připravený list papíru' },
    { src: '/images/obradni-sin.webp', alt: 'Důstojný vstup do obřadní budovy obklopený zelení' }
  ],
  seo: {
    title: 'Pohřební služba Janata | Žamberk',
    description: 'Pohřební služba Daniel Janata v Žamberku. Citlivá pomoc při zařizování posledního rozloučení, smuteční oznámení a kontakt.'
  }
};
