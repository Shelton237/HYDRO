export interface TestimonialType {
    id: number;
    name: string;
    role: string;
    image: string;
    icon: string;
    stars: number;
    feedback: string;
}

export const testimonialsTwoData:TestimonialType[] = [
    {
        id: 1,
        name: 'HYSACAM',
        role: 'Exploitation flotte',
        image: '/img/testimonial/02.jpg',
        icon: '/img/testimonial/icon.png',
        stars: 5,
        feedback: "Flexibles et raccords livrés sous 24h avec une équipe qui comprend nos contraintes terrain. La réactivité nous évite des arrêts prolongés.",
    },
    {
        id: 2,
        name: 'GLOBAL TRANS',
        role: 'Logistique portuaire',
        image: '/img/testimonial/03.jpg',
        icon: '/img/testimonial/icon.png',
        stars: 4.5,
        feedback: "Nous apprécions le regard d’hydraulicien et la possibilité d’ajouter pompes, vérins et moteurs à la même commande.",
    },
    {
        id: 3,
        name: 'ESER CONTRACTING',
        role: 'BTP & énergie',
        image: '/img/testimonial/04.jpg',
        icon: '/img/testimonial/icon.png',
        stars: 5,
        feedback: "Les flexibles sur mesure sont marqués et dépollués, prêts à être montés sur nos chantiers. Le SAV assuré fait la différence.",
    },
];
