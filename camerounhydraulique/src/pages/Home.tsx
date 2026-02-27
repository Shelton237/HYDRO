import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { IMAGES } from "@/assets/images";
import { ROUTE_PATHS } from "@/lib/index";
import { services, stats, sectors } from "@/data/index";
import { ServiceCard, StatCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_1_1}
            alt="Hydraulique industrielle"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPresets.gentle, delay: 0.1 }}
            >
              L'expertise electro-hydraulique
              <br />
              <span className="text-primary">au coeur de votre activite</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPresets.gentle, delay: 0.2 }}
            >
              Depuis 2008, nous accompagnons l'industrie, l'agriculture, la construction et le transport avec des solutions hydrauliques fiables
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPresets.gentle, delay: 0.3 }}
            >
              <Button asChild size="lg" className="text-lg px-8">
                <Link to={ROUTE_PATHS.SERVICES}>
                  Nos services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to={ROUTE_PATHS.CONTACT}>Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos secteurs d'activite</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions hydrauliques adaptees a chaque industrie
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sectors.map((sector) => (
              <motion.div
                key={sector.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={springPresets.snappy}
              >
                <Link to={ROUTE_PATHS.SECTORS} className="block group">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{sector.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4">{sector.description}</p>
                      <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une expertise complete pour tous vos besoins hydrauliques
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
          >
            <Button asChild size="lg" className="text-lg px-8">
              <Link to={ROUTE_PATHS.SERVICES}>
                Decouvrir tous nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Pourquoi choisir Cameroun Hydraulique ?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Une expertise reconnue et un engagement qualite pour votre reussite
              </p>

              <div className="space-y-6">
                {[
                  "Vente d'accessoires hydrauliques et de pieces d'engins",
                  "Materiel de soudure et fournitures hydrauliques completes",
                  "Confection rapide de flexibles sur mesure",
                  "Prestations de service et SAV reactif 24/7",
                  "Livraison express sur l'ensemble du territoire",
                  "Team experte basee a Douala et Yaounde",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...springPresets.gentle, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to={ROUTE_PATHS.ABOUT}>
                    En savoir plus sur Cameroun Hydraulique
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={IMAGES.INDUSTRIAL_TEAM_1_9}
                  alt="Équipe Cameroun Hydraulique"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src={IMAGES.CONSTRUCTION_EQUIPMENT_3_6}
                  alt="Équipements hydrauliques"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl max-w-xs">
                <p className="text-4xl font-bold mb-1">Depuis 2008</p>
                <p className="text-sm opacity-90">au service des industriels camerounais</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pret a demarrer votre projet ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez nos experts pour une etude personnalisee de vos besoins hydrauliques
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to={ROUTE_PATHS.CONTACT}>
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link to={ROUTE_PATHS.PRODUCTS}>Voir le catalogue</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
