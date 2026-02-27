import { motion } from "framer-motion";
import { Wrench, Truck, GraduationCap, Settings, CheckCircle, ArrowRight } from "lucide-react";
import { services } from "@/data/index";
import { ServiceCard } from "@/components/Cards";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";

const iconMap = {
  Wrench,
  Truck,
  GraduationCap,
  Settings,
};

export default function Services() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_2_2}
            alt="Services hydrauliques"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
              Nos Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expertise complète en hydraulique industrielle : réparation, installation, formation et solutions sur mesure
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
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
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Pourquoi choisir Cameroun Hydraulique ?</h2>
              <p className="text-xl text-muted-foreground">
                Depuis 2008, notre expertise accompagne vos projets hydrauliques partout au Cameroun
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Atelier certifié",
                  description: "Certifications Poclain Hydraulics et Linde pour garantir la qualité de nos interventions",
                },
                {
                  title: "Équipes expertes",
                  description: "40 spécialistes techniques formés aux dernières technologies hydrauliques",
                },
                {
                  title: "Disponibilité 24/7",
                  description: "Service de dépannage d'urgence disponible jour et nuit pour vos interventions critiques",
                },
                {
                  title: "Garantie qualité",
                  description: "Garantie 12 mois sur toutes nos réparations et installations",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Besoin d'un devis personnalisé ?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Nos experts analysent vos besoins et vous proposent la solution hydraulique adaptée à votre activité
            </p>
            <Link to={ROUTE_PATHS.CONTACT}>
              <Button
                size="lg"
                variant="secondary"
                className="group"
              >
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
              className="bg-card border border-border rounded-2xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Formation technique</h2>
                  <p className="text-muted-foreground mb-6">
                    Développez les compétences de vos équipes avec nos programmes de formation certifiants. Théorie, pratique et support continu.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Hydraulique fondamentale",
                      "Diagnostic et dépannage",
                      "Maintenance préventive",
                      "Sécurité des systèmes hydrauliques",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                  <img
                    src={IMAGES.INDUSTRIAL_TEAM_1_9}
                    alt="Formation technique"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
