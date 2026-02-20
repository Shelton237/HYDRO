type MenuLink = {
  title: string;
  link: string;
};

export type MegaMenuDataType = {
  image: string;
  title: string;
  links: MenuLink[];
};

export type SubMenuDataType = {
  title: string;
  link: string;
  submenu?: MenuLink[];
};

export type MenuItemDataType = {
  title: string;
  link: string;
  megamenu?: MegaMenuDataType[];
  submenu?: SubMenuDataType[];
};

export const menuData: MenuItemDataType[] = [
  {
    title: 'Accueil',
    link: '/',
  },
  {
    title: 'Catalogue',
    link: '/produit',
  },
  {
    title: 'À propos',
    link: '/about',
  },
  {
    title: 'Contact',
    link: '/contact',
  },
];
