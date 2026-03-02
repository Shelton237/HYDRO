export const ROUTE_PATHS = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_DETAIL: "/services/:id",
  SECTORS: "/secteurs",
  PRODUCTS: "/produits",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  ADMIN_PRODUCTS: "/admin/produits",
} as const;

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

export const LANGUAGES = {
  FR: "fr",
  EN: "en",
  DE: "de",
  NL: "nl",
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

export const SECTORS = {
  AGRICULTURAL: "agricultural",
  CONSTRUCTION: "construction",
  TRANSPORT: "transport",
  MARITIME: "maritime",
  INDUSTRIAL: "industrial",
} as const;

export type Sector = typeof SECTORS[keyof typeof SECTORS];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  intro?: string;
  benefits?: { title: string; description: string }[];
  process?: { step: string; title: string; description: string }[];
  applications?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications?: string[];
  image?: string;
  price?: string;
}

export interface Exhibition {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  booth?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image?: string;
  bio?: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface SectorInfo {
  id: Sector;
  name: string;
  description: string;
  applications: string[];
  image?: string;
}

export const COMPANY_INFO = {
  name: "Cameroun Hydraulique",
  tagline: "Vente d'accessoires, flexibles sur mesure et prestations hydrauliques au Cameroun",
  phones: ["+237 674 048 225", "+237 696 781 077"],
  emails: ["contact@camerounhydraulique.com", "cameroun.hydraulique@yahoo.fr"],
  offices: [
    {
      city: "Douala",
      addresses: [
        "Texaco Nkolouloun et Carrefour Photo Golden (face Boulangerie de luxe)",
        "Agence Yassa : entree salle de fete BOCOM (2eme entree apres la station BOCOM)",
      ],
      bp: "BP 9593 Douala Cameroun",
    },
    {
      city: "Yaounde",
      addresses: ["Face Tradex Olembe"],
      bp: undefined,
    },
  ],
  hours: {
    weekdays: "8h00 - 18h00",
    saturday: "9h00 - 12h00",
    sunday: "Ferme",
  },
  social: {
    linkedin: "https://linkedin.com/company/cameroun-hydraulique",
    facebook: "https://facebook.com/cameroun-hydraulique",
    twitter: "https://twitter.com/cameroun-hydraulique",
  },
} as const;

export const CERTIFICATIONS = [
  "Atelier certifié Poclain Hydraulics",
  "Agréé Linde Hydraulics",
  "ISO 9001:2015",
  "Certification Qualité Hydraulique",
] as const;
