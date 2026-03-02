import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/index";
import { ProductCard } from "@/components/Cards";
import { IMAGES } from "@/assets/images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/lib/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

const categories = [
  "Toutes catégories",
  "Unités hydrauliques",
  "Équipements de test",
  "Composants de sécurité",
  "Pompes hydrauliques",
  "Moteurs hydrauliques",
  "Filtration",
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes catégories");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Toutes catégories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Plus de 25 000 articles disponibles. Composants de qualité pour tous vos besoins hydrauliques.
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
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64 h-12">
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
              <Button variant="ghost" size="sm" className="gap-2">
                Demander un devis
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

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

      <section className="py-16 bg-muted/30">
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
              <Button size="lg" className="gap-2">
                Contactez-nous
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Télécharger le catalogue
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
