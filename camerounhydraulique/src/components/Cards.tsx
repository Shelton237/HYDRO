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
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {service.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}
        <CardHeader>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconComponent className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
          </div>
          <CardDescription className="text-base leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full group" asChild>
            <Link to={ROUTE_PATHS.SERVICES}>
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        {product.image && (
          <div className="relative h-56 w-full overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.price && (
              <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground shadow-lg">
                {product.price}
              </Badge>
            )}
          </div>
        )}
        <CardHeader>
          <div className="mb-2">
            <Badge variant="secondary" className="mb-3">
              {product.category}
            </Badge>
            <CardTitle className="text-lg font-semibold leading-tight">
              {product.name}
            </CardTitle>
          </div>
          <CardDescription className="text-sm leading-relaxed">
            {product.description}
          </CardDescription>
        </CardHeader>
        {product.specifications && product.specifications.length > 0 && (
          <CardContent>
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Spécifications
              </p>
              <ul className="space-y-1">
                {product.specifications.slice(0, 3).map((spec, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 gap-2"
            onClick={handleAddToQuote}
            variant={added ? "secondary" : "default"}
          >
            {added ? (
              <><Check className="h-4 w-4" /> Ajouté !</>
            ) : (
              <><Plus className="h-4 w-4" /> Devis</>
            )}
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to={ROUTE_PATHS.PRODUCTS} title="Voir détails">
              <ArrowRight className="h-4 w-4" />
            </Link>
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