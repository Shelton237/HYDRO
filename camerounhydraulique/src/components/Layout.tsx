import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu, X, Search, ChevronDown, Phone, Mail, MapPin, Clock,
  PhoneCall, ShoppingCart, Wrench, Factory, Truck, Anchor,
  Tractor, Settings, GraduationCap, Zap, Globe, ArrowRight
} from "lucide-react";
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
import { useQuoteStore } from "@/stores/quoteStore";
import { QuoteDrawer } from "@/components/QuoteDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

const servicesDropdown = [
  { icon: Wrench, label: "Réparation hydraulique", desc: "Diagnostic & remise en état", path: ROUTE_PATHS.SERVICES },
  { icon: Settings, label: "Flexibles sur mesure", desc: "Fabrication à la demande", path: ROUTE_PATHS.SERVICES },
  { icon: Factory, label: "Montage sur site", desc: "Intervention chez vous", path: ROUTE_PATHS.SERVICES },
  { icon: GraduationCap, label: "Formation technique", desc: "Experts certifiés", path: ROUTE_PATHS.SERVICES },
  { icon: Zap, label: "Urgences 24/7", desc: "Intervention rapide", path: ROUTE_PATHS.SERVICES },
  { icon: Settings, label: "Solutions personnalisées", desc: "Sur mesure pour votre activité", path: ROUTE_PATHS.SERVICES },
];

const sectorsDropdown = [
  { icon: Tractor, label: "Agriculture", path: ROUTE_PATHS.SECTORS },
  { icon: Factory, label: "Construction", path: ROUTE_PATHS.SECTORS },
  { icon: Truck, label: "Transport", path: ROUTE_PATHS.SECTORS },
  { icon: Anchor, label: "Maritime", path: ROUTE_PATHS.SECTORS },
  { icon: Settings, label: "Industrie", path: ROUTE_PATHS.SECTORS },
];

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES.FR);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, toggleOpen } = useQuoteStore();
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* ── TOPBAR ── */}
      <div className="hidden lg:block bg-[#1F6F2D] text-white text-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, "")}`}
                className="flex items-center gap-1.5 hover:text-green-200 transition-colors"
              >
                <Phone className="h-3 w-3" />
                <span>{COMPANY_INFO.phones[0]}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.emails[0]}`}
                className="flex items-center gap-1.5 hover:text-green-200 transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>{COMPANY_INFO.emails[0]}</span>
              </a>
              <span className="flex items-center gap-1.5 text-green-200">
                <Clock className="h-3 w-3" />
                <span>Lun–Ven {COMPANY_INFO.hours.weekdays}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
              >
                <SiLinkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank" rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
              >
                <SiFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank" rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
              >
                <SiX className="h-3.5 w-3.5" />
              </a>
              <div className="w-px h-4 bg-green-500 mx-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 hover:text-green-200 transition-colors font-medium">
                    <Globe className="h-3 w-3" />
                    <span>{languageLabels[currentLanguage]}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[80px]">
                  {Object.entries(languageLabels).map(([lang, label]) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setCurrentLanguage(lang as typeof currentLanguage)}
                      className={currentLanguage === lang ? "bg-secondary font-semibold" : ""}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "bg-white/90 dark:bg-[#061208]/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
            : "bg-background border-b border-border"
          }`}
      >
        <div className="container mx-auto px-4" ref={dropdownRef}>
          <div className="flex h-[68px] items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to={ROUTE_PATHS.HOME}
              className="flex-shrink-0 inline-flex items-center group"
              aria-label="Cameroun Hydraulique"
            >
              <img
                src="/images/logo.jpeg"
                alt="Cameroun Hydraulique logo"
                className="block h-14 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Accueil */}
              <NavLink
                to={ROUTE_PATHS.HOME}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                   ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    Accueil
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </NavLink>

              {/* Services mega dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                    ${location.pathname.startsWith(ROUTE_PATHS.SERVICES) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
                >
                  Services
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                    ${location.pathname.startsWith(ROUTE_PATHS.SERVICES) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
                {/* Services Mega Panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white dark:bg-card border border-border rounded-xl shadow-2xl shadow-black/10 overflow-hidden transition-all duration-200 origin-top
                    ${activeDropdown === "services" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
                >
                  <div className="p-2">
                    <div className="grid grid-cols-2 gap-1">
                      {servicesDropdown.map((s) => (
                        <Link
                          key={s.label}
                          to={s.path}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors group/item"
                        >
                          <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                            <s.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">{s.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-border mt-2 pt-2 px-2">
                      <Link
                        to={ROUTE_PATHS.SERVICES}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-sm font-medium text-primary"
                      >
                        <span>Voir tous nos services</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secteurs dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("sectors")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                    ${location.pathname.startsWith(ROUTE_PATHS.SECTORS) ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
                >
                  Secteurs
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "sectors" ? "rotate-180" : ""}`} />
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                    ${location.pathname.startsWith(ROUTE_PATHS.SECTORS) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white dark:bg-card border border-border rounded-xl shadow-2xl shadow-black/10 overflow-hidden transition-all duration-200 origin-top
                    ${activeDropdown === "sectors" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
                >
                  <div className="p-1.5">
                    {sectorsDropdown.map((s) => (
                      <Link
                        key={s.label}
                        to={s.path}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors group/item"
                      >
                        <s.icon className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Produits */}
              <NavLink
                to={ROUTE_PATHS.PRODUCTS}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                   ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    Produits
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </NavLink>

              {/* À propos */}
              <NavLink
                to={ROUTE_PATHS.ABOUT}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                   ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    À propos
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </NavLink>

              {/* Contact */}
              <NavLink
                to={ROUTE_PATHS.CONTACT}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                   ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-left
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </NavLink>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${searchOpen
                    ? "bg-secondary text-primary"
                    : "text-foreground/60 hover:text-foreground hover:bg-secondary/60"
                  }`}
                aria-label="Rechercher"
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              {/* Cart / Devis */}
              <button
                onClick={toggleOpen}
                className="relative p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-colors duration-200"
                aria-label="Demande de devis"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA */}
              <Link
                to={ROUTE_PATHS.CONTACT}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#1F6F2D] to-[#2F8B45] text-white text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Demande de devis
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${mobileMenuOpen ? "bg-secondary text-primary" : "text-foreground/70 hover:bg-secondary/60"
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 top-[3px] h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 top-[9px]" : ""}`} />
                <span className={`absolute left-0 top-[9px] h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0 translate-x-2" : ""}`} />
                <span className={`absolute left-0 top-[15px] h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 top-[9px]" : ""}`} />
              </div>
            </button>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 border-t border-border pt-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits, services..."
                  className="pl-10 pr-4 h-10 bg-secondary/40 border-border rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/30 transition-all"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-350 ease-in-out ${mobileMenuOpen ? "max-h-[90vh] border-t border-border" : "max-h-0"
            }`}
        >
          <div className="bg-background/98 backdrop-blur-xl">
            {/* Mobile contact strip */}
            <div className="flex items-center gap-4 px-4 py-3 bg-[#1F6F2D] text-white text-xs">
              <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, "")}`} className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" /> {COMPANY_INFO.phones[0]}
              </a>
            </div>

            <nav className="px-3 py-3 space-y-0.5">
              <NavLink
                to={ROUTE_PATHS.HOME}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary/60"
                  }`
                }
              >
                Accueil
              </NavLink>

              {/* Services accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === "services" ? "max-h-96" : "max-h-0"}`}>
                  <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-1 mb-2 space-y-0.5">
                    {servicesDropdown.map((s) => (
                      <Link
                        key={s.label}
                        to={s.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
                      >
                        <s.icon className="h-3.5 w-3.5 text-primary/70 flex-shrink-0" />
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secteurs accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "sectors" ? null : "sectors")}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
                >
                  Secteurs
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === "sectors" ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === "sectors" ? "max-h-64" : "max-h-0"}`}>
                  <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-1 mb-2 space-y-0.5">
                    {sectorsDropdown.map((s) => (
                      <Link
                        key={s.label}
                        to={s.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
                      >
                        <s.icon className="h-3.5 w-3.5 text-primary/70 flex-shrink-0" />
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <NavLink
                to={ROUTE_PATHS.PRODUCTS}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary/60"
                  }`
                }
              >
                Produits
              </NavLink>
              <NavLink
                to={ROUTE_PATHS.ABOUT}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary/60"
                  }`
                }
              >
                À propos
              </NavLink>
              <NavLink
                to={ROUTE_PATHS.CONTACT}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary/60"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            <div className="px-3 pb-4 pt-2 border-t border-border space-y-2">
              <button
                onClick={() => { toggleOpen(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Demande de devis
                {totalItems > 0 && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                to={ROUTE_PATHS.CONTACT}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#1F6F2D] to-[#2F8B45] text-white text-sm font-semibold shadow-md"
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sector quick links removed per updated UX */}

      <main className="flex-1">{children}</main>

      <QuoteDrawer />

      {/* Floating Emergency Button */}
      <a
        href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, "")}`}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 hover:scale-105 transition-all duration-300 group"
        aria-label="Urgence 24/7"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
        <PhoneCall className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] transition-all duration-500 ease-in-out font-bold group-hover:ml-3">
          Urgence 24/7
        </span>
      </a>

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
