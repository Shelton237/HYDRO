import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { IMAGES } from "@/assets/images";
import { COMPANY_INFO, ROUTE_PATHS } from "@/lib/index";
import { stats } from "@/data/index";
import { StatCard } from "@/components/Cards";
import { springPresets, staggerContainer, staggerItem } from "@/lib/motion";

const avantProposParagraphs = [
  "Cameroun Hydraulique SARL est une societe d'equipement de maintenance industrielle fondee en 2008 a Douala avec un capital social de 2 000 000 FCFA. Dirigee par des nationaux camerounais, elle evolue depuis son siege de Douala avec une autonomie de decision totale tout en restant au plus pres du terrain.",
  "Notre mission est d'apporter une reponse concrete a la demande locale en pieces hydrauliques et en pieces de rechange pour engins. Nous couvrons les besoins du territoire camerounais et de la sous-region Afrique Centrale en proposant une solution fiable et rapide, quelle que soit la duree des travaux de nos clients.",
  "Nous disposons de deux agences a Douala (Texaco Nkolouloun et Yassa) et d'une presence a Yaounde face a Tradex Olembe. Cette implantation couplee a notre stock important nous permet de repondre efficacement a toutes les urgences.",
];

const qualityPillars = [
  {
    title: "Respect rigoureux de la qualite",
    description:
      "Nos processus privilegient la qualite des produits et services fournis afin de garantir des prestations a la hauteur des exigences industrielles.",
  },
  {
    title: "Reception et livraison promptes",
    description:
      "Nous offrons un service de reception et de livraison rapide qui assure la disponibilite immediate du materiel hydraulique pour vos operations.",
  },
];

const serviceHighlights = [
  {
    title: "Vente d'accessoires hydrauliques",
    description: "Catalogue permanent d'accouplements, raccords, valves et consommables de maintenance.",
  },
  {
    title: "Vente de pieces d'engins",
    description: "Pieces de rechange d'origine pour vos engins agricoles, de construction ou de transport.",
  },
  {
    title: "Vente de materiel de soudure",
    description: "Postes, consommables et equipements de soudure adaptes aux interventions terrain.",
  },
  {
    title: "Fournitures hydrauliques completes",
    description: "Tout le materiel necessaire aux circuits hydrauliques : flexibles, raccords, coupleurs, durites.",
  },
  {
    title: "Confection de flexibles",
    description: "Atelier dedie pour la fabrication de flexibles sur mesure, nettoyes et testes avant livraison.",
  },
  {
    title: "Prestations de services",
    description: "Conseil, SAV et interventions techniques pour maintenir vos equipements en production.",
  },
];

const productLines = [
  "Flexibles hydrauliques tous diametres",
  "Flexibles industriels et synthetiques",
  "Douilles et embouts a sertir",
  "Coupleurs a bille et a clapet",
  "Durites et flexibles pour karcher ou lance",
  "Raccords rapides, union ou pompiers",
  "Raccords symetriques et adaptateurs",
  "Vannes et accessoires complementaires",
];

const serviceTools = [
  "Sertisseuse electrique haute puissance",
  "Denudeuse pour flexibles",
  "Presse et tronconneuse electriques",
  "Meuleuse et etablis equipes",
  "Outillage Makita pour interventions terrain",
];

const flexProcess = [
  {
    title: "Preparation minutieuse",
    description:
      "Chaque commande est verifiee et les composants necessaires sont prepares. Notre stock de plus de 1 500 references garantit une mise en production rapide et adaptee.",
  },
  {
    title: "Sertissage precis",
    description:
      "Nos flexibles hydrauliques jusqu'a 4 couches sont sertis a 45H avec une puissance de 340T pour des assemblages precis, sans fuite et conformes aux normes EN et ISO.",
  },
  {
    title: "Depoulon efficace",
    description:
      "Un passage dedie au depoulon par pistolet permet de livrer des flexibles propres, nets et pret a l'emploi.",
  },
  {
    title: "Expedition suivie",
    description:
      "Nous livrons sous 24h dans tout le Cameroun pour les composants disponibles en stock et nous informons en temps reel en cas d'approvisionnement specifique.",
  },
  {
    title: "Gravage special",
    description:
      "Les jupes peuvent etre gravees sur plaque metallique (aluminium ou inox) avec toutes les informations que vous souhaitez afficher.",
  },
];

const flexReasons = [
  {
    title: "Des composants de qualite",
    description:
      "Nous collaborons avec les leaders mondiaux de l'hydraulique afin de proposer les meilleurs composants du marche a des tarifs competitifs.",
  },
  {
    title: "Un regard d'hydraulicien",
    description:
      "Nos experts pensent le flexible selon son usage et conseillent le kit ideal pour optimiser les performances et la fiabilite de vos machines.",
  },
  {
    title: "Des possibilites amplifiees",
    description:
      "Nos importants stocks permettent d'ajouter pompes, distris, verins ou moteurs a votre kit initial sans allonger les delais.",
  },
];

const hoseChecklist = [
  "Un diametre adapte au debit et a la pression du circuit",
  "Un rayon de courbure correspondant a l'installation",
  "Une matiere compatible (caoutchouc, acier, nylon...)",
  "Des embouts DIN, BSP, ORFS ou coudes suivant l'application",
  "Un assemblage precis et etanche pour eviter toute fuite",
];

const partners = [
  "SMAR",
  "BATI Services",
  "Metch Elec",
  "BTA",
  "Global Trans",
  "Les Acieries du Cameroun",
  "Fokou Logistic",
  "BOCOM",
  "BOCOM Petroleum",
  "ERNO",
  "ESER Contracting",
  "Cameroun Timber",
  "SEFAC",
  "Nambois",
  "Afrimar",
  "STBC",
  "Negri Cameroun",
  "Transafrique",
  "ETP",
  "HYSACAM",
];

const getInitials = (name: string) =>
  name
    .split(/[\s&-]+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 3)
    .toUpperCase();

const createLogo = (name: string) => {
  const initials = getInitials(name);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
      <rect width="120" height="60" rx="12" fill="#e6f3ea" stroke="#1f6f2d" stroke-width="2" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, Arial" font-size="26" font-weight="600" fill="#1f6f2d">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const partnerLogos = partners.map((name) => ({
  name,
  logo: createLogo(name),
}));

const duplicatedPartners = [...partnerLogos, ...partnerLogos];

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_2_2}
            alt="Cameroun Hydraulique expertise"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              À propos de Cameroun Hydraulique
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.id} variants={staggerItem}>
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">Avant-propos</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-left">
              {avantProposParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {qualityPillars.map((pillar, index) => (
              <div key={pillar.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-semibold">{pillar.title}</span>
                </div>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Nos services</h2>
            <p className="text-xl text-muted-foreground">
              Une reponse concrete aux besoins des operateurs industrielles et des exploitants d'engins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceHighlights.map((service) => (
              <div key={service.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Produits disponibles</h2>
              <p className="text-muted-foreground mb-6">
                Un stock complet pour alimenter vos engins et vos chaines de production.
              </p>
              <ul className="space-y-2">
                {productLines.map((product) => (
                  <li key={product} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <span>{product}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Nos outils de services</h2>
              <p className="text-muted-foreground mb-6">
                Des equipements modernes pour realiser des interventions rapides et fiables.
              </p>
              <ul className="space-y-2">
                {serviceTools.map((tool) => (
                  <li key={tool} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Atelier flexibles sur mesure</h2>
            <p className="text-xl text-muted-foreground">
              Un process coordonne par des experts pour livrer des kits propres, testes et identifies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {flexProcess.map((step, index) => (
              <div key={step.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Pourquoi nous confier vos kits</h2>
              <p className="text-muted-foreground mb-6">
                Des composants selectionnes, l'experience de l'atelier et un accompagnement complet pour vos flexibles hydrauliques.
              </p>
              <div className="space-y-4">
                {flexReasons.map((reason) => (
                  <div key={reason.title} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <h3 className="font-semibold">{reason.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Choisir le flexible ideal</h2>
              <p className="text-muted-foreground mb-6">
                Notre equipe vous aide a definir le bon tuyau et les bons raccords afin de reduire les arrets, augmenter la fiabilite et prolonger la duree de vie des machines.
              </p>
              <ul className="space-y-2">
                {hoseChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section partenaires masquée selon nouvelle demande */}

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.INDUSTRIAL_TEAM_2_10}
            alt="Contact Cameroun Hydraulique"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Besoin d'un accompagnement immediat ?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Nos equipes commerciales et techniques sont disponibles pour dimensionner vos kits, preparer vos flexibles sur mesure
              et organiser vos livraisons partout au Cameroun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={ROUTE_PATHS.CONTACT}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-[1.02] active:scale-[0.97] transition-all shadow-lg"
              >
                Contacter notre equipe
              </Link>
              <a
                href={`mailto:${COMPANY_INFO.emails[0]}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:scale-[1.02] active:scale-[0.97] transition-all"
              >
                Écrire un email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
