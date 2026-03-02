import { motion } from "framer-motion";
import { Wrench, Truck, GraduationCap, Settings, ArrowRight, CheckCircle, Clock, Award, Users } from "lucide-react";
import { services } from "@/data/index";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { springPresets, staggerContainer, staggerItem } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Truck, GraduationCap, Settings,
};

const stats = [
  { icon: Clock, value: "24/7", label: "Disponibilité" },
  { icon: Award, value: "Certifié", label: "Poclain & Linde" },
  { icon: Users, value: "40+", label: "Spécialistes" },
  { icon: CheckCircle, value: "12 mois", label: "Garantie" },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_2_2}
            alt="Services hydrauliques"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-6">
              Ce que nous faisons
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Des services hydrauliques <span className="text-primary">à votre mesure</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Depuis 2008, Cameroun Hydraulique accompagne les industriels, les exploitants d'engins et les acteurs du transport dans toute l'Afrique Centrale.
            </p>
            <Link to={ROUTE_PATHS.CONTACT}>
              <Button size="lg" className="gap-2">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats bar ──────────────────────────────────────── */}
      <section className="py-10 border-y border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Service cards ───────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nos expertises</h2>
            <p className="text-xl text-muted-foreground">
              Cliquez sur un service pour découvrir le détail, les avantages et notre processus
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Wrench;
              return (
                <motion.div key={service.id} variants={staggerItem}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group block h-full rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {service.image && (
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-7">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        Voir ce service en détail
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Pourquoi nous choisir ───────────────────────────── */}
      <section className="py-24 bg-muted/30">
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
                { title: "Atelier certifié", description: "Certifications Poclain Hydraulics et Linde pour garantir la qualité de nos interventions" },
                { title: "Équipes expertes", description: "40 spécialistes techniques formés aux dernières technologies hydrauliques" },
                { title: "Disponibilité 24/7", description: "Service de dépannage d'urgence disponible jour et nuit pour vos interventions critiques" },
                { title: "Garantie qualité", description: "Garantie 12 mois sur toutes nos réparations et installations sans frais cachés" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
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

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-primary-foreground">
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
              <Button size="lg" variant="secondary" className="group gap-2">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
