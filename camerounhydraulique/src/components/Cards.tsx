import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Package, Users, Award, TrendingUp, Plus, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service, Product, Exhibition, Stat } from "@/lib/index";
import { ROUTE_PATHS } from "@/lib/index";
import { springPresets, hoverLift } from "@/lib/motion";
import { useQuoteStore } from "@/stores/quoteStore";
import { useState } from "react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Wrench: Package,
    Truck: Users,
    GraduationCap: Award,
    Settings: TrendingUp,
  };

  const IconComponent = iconMap[service.icon] || Package;

  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center text-center">
        {service.image ? (
          <div className="relative h-56 w-full overflow-hidden bg-white">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : (
          <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconComponent className="h-8 w-8" />
          </div>
        )}
        <CardHeader className="px-6 pt-6 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold text-primary mb-3">
            {service.title}
          </CardTitle>
          <CardDescription className="text-[15px] leading-relaxed text-foreground/70">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 flex-1">
          <ul className="space-y-2 mt-4 text-sm text-foreground/70 inline-block text-left">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pb-8 pt-4">
          <Button variant="outline" className="px-8 py-5 rounded-md border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all duration-200" asChild>
            <Link to={ROUTE_PATHS.SERVICES}>
              Détails du service
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setOpen } = useQuoteStore();
  const [added, setAdded] = useState(false);

  const handleAddToQuote = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setOpen(true);
  };

  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-1 flex flex-col items-center text-center px-6 pt-2 pb-4">
          <CardTitle className="text-xl md:text-2xl font-bold text-primary mb-4">
            {product.name}
          </CardTitle>
          <CardDescription className="text-[15px] leading-relaxed text-foreground/70 line-clamp-4">
            {product.description}
            {product.specifications && product.specifications.length > 0 && (
              <span className="block mt-2 font-medium">
                {product.specifications.slice(0, 2).join(", ")}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pb-8 pt-0 flex justify-center">
          <Button
            onClick={handleAddToQuote}
            className={`px-8 py-6 rounded-md text-sm font-bold transition-all duration-200 min-w-[140px] shadow-md
              ${added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"}`}
          >
            {added ? (
              <><Check className="mr-2 h-4 w-4" /> Ajouté</>
            ) : (
              "En savoir plus"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

export function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
  return (
    <motion.div
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {exhibition.image && (
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={exhibition.image}
              alt={exhibition.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{exhibition.name}</CardTitle>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{exhibition.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{exhibition.location}</span>
            </div>
            {exhibition.booth && (
              <Badge variant="outline" className="mt-2">
                {exhibition.booth}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {exhibition.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full group" asChild>
            <Link to={ROUTE_PATHS.CONTACT}>
              Nous rencontrer
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Package: Package,
    Users: Users,
    Award: Award,
    TrendingUp: TrendingUp,
  };

  const IconComponent = stat.icon ? iconMap[stat.icon] || Package : Package;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springPresets.gentle}
      className="h-full"
    >
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          {stat.icon && (
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <IconComponent className="h-8 w-8" />
            </div>
          )}
          <div className="mb-2 text-4xl font-bold tracking-tight text-primary">
            {stat.value}
          </div>
          <div className="mb-3 text-lg font-semibold text-foreground">
            {stat.label}
          </div>
          {stat.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {stat.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}