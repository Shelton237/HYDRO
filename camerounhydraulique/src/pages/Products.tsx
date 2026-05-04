import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Package, ChevronRight } from "lucide-react";
import { products as initialProducts } from "@/data/index";
import { ProductCard } from "@/components/Cards";
import { IMAGES } from "@/assets/images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { springPresets, staggerContainer, staggerItem } from "@/lib/motion";
import type { Product } from "@/lib/index";

export default function Products() {
  const [catalog, setCatalog] = useState<Product[]>(() => {
    const saved = localStorage.getItem("hydro_catalog");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes catégories");

  useEffect(() => {
    // Sync with localStorage if it changes in another tab/window
    const handleStorage = () => {
      const saved = localStorage.getItem("hydro_catalog");
      if (saved) setCatalog(JSON.parse(saved));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const categories = useMemo(() => {
    const base = Array.from(new Set(catalog.map((p) => p.category)));
    return ["Toutes catégories", ...base.sort()];
  }, [catalog]);

  const filteredProducts = useMemo(() => {
    return catalog.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Toutes catégories" ||
        product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [catalog, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_1_1}
            alt="Produits hydrauliques"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-medium">Catalogue produits</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Équipements Hydrauliques
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Plus de {catalog.length > 25000 ? catalog.length : "25 000"} articles disponibles. Composants de qualité pour tous vos besoins hydrauliques.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPresets.gentle, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit ou une spécification..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-border/50 focus:ring-primary/20 transition-all"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64 h-12 rounded-xl border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Overview - Sinopulse Inspired */}
      {selectedCategory === "Toutes catégories" && !searchQuery && (
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Nos Gammes de Produits</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez notre catalogue complet de solutions hydrauliques haute performance adaptées à vos exigences techniques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Pompes & Moteurs",
                  desc: "Pompes à pistons, engrenages et moteurs orbitaux haute performance pour toutes vos transmissions hydrostatiques.",
                  image: IMAGES.HYDRAULIC_HERO_1_1,
                  cat: "Pompes hydrauliques"
                },
                {
                  title: "Filtration & Fluides",
                  desc: "Systèmes de filtration complets, cartouches et accessoires pour garantir la propreté de vos circuits et prolonger leur vie.",
                  image: IMAGES.HYDRAULIC_HERO_2_2,
                  cat: "Filtration"
                },
                {
                  title: "Composants & Distribution",
                  desc: "Distributeurs, valves de sécurité, échangeurs et accessoires de raccordement pour un contrôle précis de vos installations.",
                  image: IMAGES.CONSTRUCTION_EQUIPMENT_1_4,
                  cat: "Distribution"
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCategory(category.cat)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-md transition-shadow group-hover:shadow-xl">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <Button variant="secondary" className="w-full gap-2">
                        Découvrir la gamme <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{category.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={springPresets.gentle}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'un produit spécifique ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Notre équipe technique est à votre disposition pour vous conseiller et trouver la solution adaptée à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 rounded-xl h-14 px-8">
                Contactez-nous
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl h-14 px-8">
                Télécharger le catalogue
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
