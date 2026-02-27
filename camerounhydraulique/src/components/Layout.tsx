import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search, ChevronDown, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiLinkedin, SiFacebook, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTE_PATHS, LANGUAGES, COMPANY_INFO, CERTIFICATIONS } from "@/lib/index";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES.FR);

  const navigationItems = [
    { path: ROUTE_PATHS.HOME, label: "Accueil" },
    { path: ROUTE_PATHS.SERVICES, label: "Services" },
    { path: ROUTE_PATHS.SECTORS, label: "Secteurs" },
    { path: ROUTE_PATHS.PRODUCTS, label: "Produits" },
    { path: ROUTE_PATHS.ABOUT, label: "À propos" },
    { path: ROUTE_PATHS.CONTACT, label: "Contact" },
  ];

  const languageLabels = {
    [LANGUAGES.FR]: "FR",
    [LANGUAGES.EN]: "EN",
    [LANGUAGES.DE]: "DE",
    [LANGUAGES.NL]: "NL",
  };

  const footerLinks = {
    services: [
      { label: "Réparation", href: ROUTE_PATHS.SERVICES },
      { label: "Montage sur site", href: ROUTE_PATHS.SERVICES },
      { label: "Formation", href: ROUTE_PATHS.SERVICES },
      { label: "Solutions personnalisées", href: ROUTE_PATHS.SERVICES },
    ],
    sectors: [
      { label: "Agricole", href: ROUTE_PATHS.SECTORS },
      { label: "Construction", href: ROUTE_PATHS.SECTORS },
      { label: "Transport", href: ROUTE_PATHS.SECTORS },
      { label: "Maritime", href: ROUTE_PATHS.SECTORS },
      { label: "Industrie", href: ROUTE_PATHS.SECTORS },
    ],
    company: [
      { label: "À propos", href: ROUTE_PATHS.ABOUT },
      { label: "Nos équipes", href: ROUTE_PATHS.ABOUT },
      { label: "Certifications", href: ROUTE_PATHS.ABOUT },
      { label: "Carrières", href: ROUTE_PATHS.CONTACT },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              to={ROUTE_PATHS.HOME}
              className="inline-flex items-center"
              aria-label="Cameroun Hydraulique"
            >
              <img
                src="/images/logo.jpeg"
                alt="Cameroun Hydraulique logo"
                className="block h-16 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-sm font-medium">{languageLabels[currentLanguage]}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(languageLabels).map(([lang, label]) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setCurrentLanguage(lang as typeof currentLanguage)}
                      className={currentLanguage === lang ? "bg-secondary" : ""}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="default" size="sm" asChild>
                <Link to={ROUTE_PATHS.CONTACT}>Demande de devis</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {searchOpen && (
            <div className="py-4 border-t border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits, services..."
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to={ROUTE_PATHS.CONTACT} onClick={() => setMobileMenuOpen(false)}>
                    Demande de devis
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Sector quick links removed per updated UX */}

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/images/logo.jpeg"
                  alt="Cameroun Hydraulique logo"
                  className="h-12 w-auto"
                  loading="lazy"
                />
                <span className="font-bold text-xl text-foreground">
                  Cameroun Hydraulique
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {COMPANY_INFO.tagline}
              </p>
              <div className="flex space-x-3">
                <a
                  href={COMPANY_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href={COMPANY_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a
                  href={COMPANY_INFO.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiX className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Secteurs</h3>
              <ul className="space-y-2">
                {footerLinks.sectors.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex flex-col text-sm text-muted-foreground">
                    {COMPANY_INFO.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\\s+/g, "")}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex flex-col text-sm text-muted-foreground">
                    {COMPANY_INFO.emails.map((mail) => (
                      <a
                        key={mail}
                        href={`mailto:${mail}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {mail}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-3">
                    {COMPANY_INFO.offices.map((office) => (
                      <div key={office.city}>
                        <p className="font-semibold text-foreground">{office.city}</p>
                        <ul className="mt-1 space-y-1">
                          {office.addresses.map((line, index) => (
                            <li key={`${office.city}-${index}`}>{line}</li>
                          ))}
                        </ul>
                        {office.bp && (
                          <p className="text-xs uppercase tracking-wide mt-1">{office.bp}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <div>Lun-Ven: {COMPANY_INFO.hours.weekdays}</div>
                    <div>Sam: {COMPANY_INFO.hours.saturday}</div>
                    <div>Dim: {COMPANY_INFO.hours.sunday}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2026 {COMPANY_INFO.name}. Tous droits réservés.
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <span key={cert} className="text-xs text-muted-foreground">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
