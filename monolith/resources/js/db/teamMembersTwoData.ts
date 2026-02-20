import { TeamMemberDataType } from "@/types/teamMember";

export const teamMembersTwoData: TeamMemberDataType[] = [
    {
        id: 1,
        name: 'Département hydraulique',
        role: 'Flexibles & fluides',
        image: '/img/team/01.jpg',
        delay: '.3',
        socialLinks: [
            {
                icon: 'fab fa-facebook-f',
                link: ''
            },
            {
                icon: 'fa-brands fa-twitter',
                link: ''
            },
            {
                icon: 'fab fa-linkedin-in',
                link: ''
            },
        ],
        description: [
            'Flexibles hydrauliques tous diamètres',
            'Durites, tuyaux d’air et flexibles gasoil',
            'Raccords rapides, raccords union & pompiers symétriques',
            'Adaptateurs, vannes, coupleurs à bille/clapet',
            'Embouts & flexibles pour karcher, huile hydraulique'
        ].join('\n')
    },
    {
        id: 2,
        name: 'Département soudure',
        role: 'Consommables & EPI',
        image: '/img/team/02.jpg',
        delay: '.5',
        socialLinks: [
            {
                icon: 'fab fa-facebook-f',
                link: ''
            },
            {
                icon: 'fa-brands fa-twitter',
                link: ''
            },
            {
                icon: 'fab fa-linkedin-in',
                link: ''
            },
        ],
        description: [
            'Baguettes ordinaires (3,2 et 2,5)',
            'Baguettes basiques (3,2 et 2,5)',
            'Casquettes de sécurité & lunettes de protection',
            'Gants adaptés aux ateliers et chantiers'
        ].join('\n')
    },
    {
        id: 3,
        name: 'Boulonnerie',
        role: 'Fixations & accessoires',
        image: '/img/team/03.jpg',
        delay: '.7',
        socialLinks: [
            {
                icon: 'fab fa-facebook-f',
                link: ''
            },
            {
                icon: 'fa-brands fa-twitter',
                link: ''
            },
            {
                icon: 'fab fa-linkedin-in',
                link: ''
            },
        ],
        description: [
            'Sélection de boulonnerie pour vos ateliers',
            'Compatibles avec nos flexibles et équipements',
            'Disponibles à Douala & Yaoundé'
        ].join('\n')
    },
];
