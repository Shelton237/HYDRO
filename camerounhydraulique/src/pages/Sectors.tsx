import { motion } from "framer-motion";
import { Tractor, HardHat, Truck, Ship, Factory } from "lucide-react";
import { IMAGES } from "@/assets/images";
import { sectors } from "@/data/index";
import { SECTORS } from "@/lib/index";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

const sectorIcons = {
  [SECTORS.AGRICULTURAL]: Tractor,
  [SECTORS.CONSTRUCTION]: HardHat,
  [SECTORS.TRANSPORT]: Truck,
  [SECTORS.MARITIME]: Ship,
  [SECTORS.INDUSTRIAL]: Factory,
};

export default function Sectors() {
  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={IMAGES.CONSTRUCTION_EQUIPMENT_1_4}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nos Secteurs d'Activité
            </h1>
            <p className="text-xl text-muted-foreground">
              Des solutions hydrauliques adaptées à chaque industrie. Expertise technique et accompagnement personnalisé pour tous vos projets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24"
          >
            {sectors.map((sector, index) => {
              const Icon = sectorIcons[sector.id];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={sector.id}
                  variants={staggerItem}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className={isEven ? "md:order-1" : "md:order-2"}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className={isEven ? "md:order-2" : "md:order-1"}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-4xl font-bold">{sector.name}</h2>
                    </div>

                    <p className="text-lg text-muted-foreground mb-8">
                      {sector.description}
                    </p>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Applications</h3>
                      <ul className="space-y-3">
                        {sector.applications.map((application, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{application}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Une expertise reconnue dans tous les secteurs
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Depuis 2008, Cameroun Hydraulique accompagne les professionnels de l'industrie avec des solutions hydrauliques sur mesure. Notre équipe de 40 spécialistes techniques est à votre service pour répondre à vos besoins spécifiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-background border border-border">
                <span className="font-semibold">Atelier certifié Poclain Hydraulics</span>
              </div>
              <div className="px-6 py-3 rounded-full bg-background border border-border">
                <span className="font-semibold">Agréé Linde Hydraulics</span>
              </div>
              <div className="px-6 py-3 rounded-full bg-background border border-border">
                <span className="font-semibold">ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
