import { BlogPostDataType } from "@/types/blog";

export const blogPostsTwoData: BlogPostDataType[] = [
    {
        id: 1,
        image: '/img/news/04.jpg',
        date: { day: '05', month: 'Fév', year: '2025' },
        author: 'Cameroun Hydraulique',
        category: 'Engagement',
        title: 'Respect rigoureux de la qualité produits/services',
        link: '/news-details',
        description: '',
        delay: '.3',
    },
    {
        id: 2,
        image: '/img/news/05.jpg',
        date: { day: '12', month: 'Mar', year: '2025' },
        author: 'Cameroun Hydraulique',
        category: 'Logistique',
        title: 'Réception & livraisons promptes avec livraisons 24h',
        link: '/news-details',
        description: '',
        delay: '.5',
    },
    {
        id: 3,
        image: '/img/news/06.jpg',
        date: { day: '28', month: 'Mar', year: '2025' },
        author: 'Cameroun Hydraulique',
        category: 'Opérations',
        title: 'Parc de matériels roulants & jeunes équipes qualifiées',
        link: '/news-details',
        description: '',
        delay: '.7',
    },
];
