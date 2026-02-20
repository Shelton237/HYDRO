export type FooterLink = {
  text: string;
  link: string;
};

export type FooterService = {
  text: string;
  link: string;
};

export type FooterPost = {
  image: string;
  date: string;
  title: string;
  link: string;
};

export type FooterContent = {
  contact_phone?: string | null;
  contact_whatsapp?: string | null;
  contact_email?: string | null;
  contact_address?: string | null;
  footer_description?: string | null;
  quick_links?: FooterLink[];
  services?: FooterService[];
  recent_posts?: FooterPost[];
  facebook_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  youtube_url?: string | null;
  copyright_text?: string | null;
};

export const defaultQuickLinks: FooterLink[] = [
  { text: 'Accueil', link: '/' },
  { text: 'Catalogue', link: '/produit' },
  { text: 'À propos', link: '/about' },
  { text: 'FAQ', link: '/faq' },
  { text: 'Contact', link: '/contact' },
];

export const defaultServices: FooterService[] = [
  { text: 'Flexibles sur mesure', link: '/produit' },
  { text: 'Accessoires hydrauliques', link: '/produit' },
  { text: "Pièces d'engins", link: '/produit' },
  { text: 'Matériel de soudure', link: '/produit' },
  { text: 'Prestations atelier', link: '/contact' },
];

export const defaultRecentPosts: FooterPost[] = [
  {
    image: '/img/news/pp1.jpg',
    date: 'Process flexibles 4SH',
    title: 'Sertissage 340 T & dépollution par pistolet à balle',
    link: '/produit',
  },
  {
    image: '/img/news/pp2.jpg',
    date: 'Agences Cameroun HY',
    title: 'Douala (Texaco / Yassa) & Yaoundé Olembe à votre service',
    link: '/contact',
  },
];
