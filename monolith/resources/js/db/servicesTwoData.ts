import { ServiceDataType } from "@/types/service";

export const servicesTwoData:ServiceDataType[] = [
    {
        id: 1,
        icon: '/img/service/icon/s-icon-1.svg',
        title: 'Vente des accessoires hydrauliques',
        description: 'Stock permanent de coupleurs, adaptateurs, joints et consommables homologués.',
        link: '/produit',
        delay: '.3',
    },
    {
        id: 2,
        icon: '/img/service/icon/s-icon-2.svg',
        title: "Vente des pièces d'engins",
        description: 'Pièces de rechange pour engins BTP, forestiers, portuaires et logistiques.',
        link: '/produit',
        delay: '.5',
        active: true,
    },
    {
        id: 3,
        icon: '/img/service/icon/s-icon-3.svg',
        title: 'Vente du matériel de soudure',
        description: 'Postes, torches, baguettes et EPI adaptés aux ateliers et chantiers.',
        link: '/produit',
        delay: '.7',
    },
    {
        id: 4,
        icon: '/img/service/icon/s-icon-4.svg',
        title: 'Fournitures du matériel hydraulique',
        description: 'Pompes, vérins, vannes, huiles et organes de distribution EN/ISO.',
        link: '/produit',
        delay: '.9',
    },
    {
        id: 5,
        icon: '/img/service/icon/s-icon-5.svg',
        title: 'Confection des flexibles hydrauliques',
        description: 'Sertissage jusqu’à 4" 4SH (340 T), dépollution et marquage permanent.',
        link: '/produit',
        delay: '1.1',
    },
    {
        id: 6,
        icon: '/img/service/icon/s-icon-8.svg',
        title: 'Prestations de services',
        description: 'Conseils d’hydrauliciens, interventions urgentes, parc roulant dédié.',
        link: '/contact',
        delay: '1.3',
    },
];
