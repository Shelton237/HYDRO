import { useMemo, useState, useEffect } from "react";
import { products as initialProducts } from "@/data/index";
import type { Product } from "@/lib/index";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Plus, Search, Filter, Edit2, Trash2, Package, Layers, 
  BarChart3, LayoutDashboard, Settings, LogOut, ChevronRight,
  Image as ImageIcon, CheckCircle2, AlertCircle, X, Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { springPresets, staggerContainer, staggerItem } from "@/lib/motion";
import { toast } from "sonner";

type ProductForm = Omit<Product, "image" | "price"> & {
  price?: string;
  image?: string;
};

const emptyForm: ProductForm = {
  id: "",
  name: "",
  category: "",
  description: "",
  specifications: [],
  price: "",
  image: "",
};

export default function AdminProducts() {
  const [catalog, setCatalog] = useState<ProductForm[]>(() => {
    const saved = localStorage.getItem("hydro_catalog");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [form, setForm] = useState<ProductForm>({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "products">("products");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  useEffect(() => {
    localStorage.setItem("hydro_catalog", JSON.stringify(catalog));
  }, [catalog]);

  const categories = useMemo(() => {
    const base = new Set(catalog.map((p) => p.category));
    return Array.from(base);
  }, [catalog]);

  const stats = useMemo(() => [
    { label: "Total Produits", value: catalog.length, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Catégories", value: categories.length, icon: Layers, color: "text-green-500", bg: "bg-green-50" },
    { label: "Mises à jour", value: "Aujourd'hui", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50" },
  ], [catalog.length, categories.length]);

  const filteredCatalog = useMemo(() => {
    const query = search.toLowerCase();
    return catalog.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [catalog, search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "HydroAdmin123!") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("Connexion réussie");
    } else {
      toast.error("Identifiants incorrects");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    toast.info("Déconnexion effectuée");
  };

  const handleChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "specifications" 
        ? value.split("\n").filter(Boolean)
        : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    if (editingId) {
      setCatalog(prev => prev.map(p => p.id === editingId ? { ...form, id: editingId } : p));
      toast.success("Produit mis à jour");
    } else {
      setCatalog(prev => [...prev, { ...form, id: crypto.randomUUID() }]);
      toast.success("Produit ajouté au catalogue");
    }
    
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (product: ProductForm) => {
    setForm(product);
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const deleteProduct = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setCatalog(prev => prev.filter(p => p.id !== id));
      toast.success("Produit supprimé");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#061208] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-center mb-8">
              <img src="/images/logo.jpeg" alt="Logo" className="h-16" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Administration</h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Connectez-vous pour gérer le catalogue produits
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Utilisateur</label>
                <Input 
                  value={loginForm.username}
                  onChange={e => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="rounded-xl border-border/50"
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Mot de passe</label>
                <Input 
                  type="password"
                  value={loginForm.password}
                  onChange={e => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="rounded-xl border-border/50"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 mt-4 font-bold">
                Se connecter
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <img src="/images/logo.jpeg" alt="Logo" className="h-10 mx-auto" />
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "dashboard" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "products" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Package size={18} /> Catalogue
          </button>
          <div className="pt-4 mt-4 border-t border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary transition-all">
              <Settings size={18} /> Paramètres
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-2"
            >
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion du Catalogue</h1>
            <p className="text-muted-foreground mt-1">Gérez vos produits et catégories en temps réel</p>
          </div>
          <Button 
            onClick={() => { setForm(emptyForm); setEditingId(null); setIsFormOpen(true); }}
            className="rounded-xl px-6 h-12 bg-primary hover:bg-primary/90 flex items-center gap-2 shadow-xl shadow-primary/20"
          >
            <Plus size={20} /> Nouveau Produit
          </Button>
        </header>

        {activeTab === "dashboard" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm flex items-center gap-5"
                >
                  <div className={`p-4 rounded-2xl ${s.bg} ${s.color}`}>
                    <s.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold">{s.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-border/30">
                <CardTitle>Activités Récentes</CardTitle>
                <CardDescription>Aperçu des dernières modifications</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {catalog.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                        {p.image ? (
                          <img src={p.image} className="h-10 w-10 object-cover rounded-lg" alt="" />
                        ) : (
                          <Package className="text-muted-foreground" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Catégorie: {p.category}</p>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Actif</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="pl-12 h-12 rounded-2xl bg-white border-border/50 shadow-sm focus:ring-primary/20"
                />
              </div>
              <Button variant="outline" className="h-12 rounded-2xl px-6 gap-2 bg-white">
                <Filter size={18} /> Filtres
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCatalog.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group overflow-hidden"
                  >
                    <div className="h-48 bg-secondary relative overflow-hidden">
                      {p.image ? (
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                          <ImageIcon size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{p.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{p.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="font-bold text-primary">{p.price || "Sur devis"}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => startEdit(p)}
                            className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(p.id)}
                            className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredCatalog.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border/50">
                <Package className="mx-auto text-muted-foreground/20 mb-4" size={64} />
                <h3 className="text-xl font-bold mb-1">Aucun produit trouvé</h3>
                <p className="text-muted-foreground">Essayez d'ajuster votre recherche ou ajoutez un nouveau produit.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Slide-over Form */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{editingId ? "Modifier" : "Ajouter"} Produit</h2>
                  <p className="text-sm text-muted-foreground mt-1">Configurez les détails du produit ci-dessous</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-3 rounded-full hover:bg-secondary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Package size={16} className="text-primary" /> Nom du Produit
                    </label>
                    <Input 
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      className="h-12 rounded-xl focus:ring-primary/20"
                      placeholder="Ex: Pompe à pistons axiaux P30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Catégorie</label>
                      <select 
                        value={form.category}
                        onChange={e => handleChange("category", e.target.value)}
                        className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      >
                        <option value="">Sélectionner...</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        <option value="NEW">+ Nouvelle catégorie</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Prix / Tarif</label>
                      <Input 
                        value={form.price}
                        onChange={e => handleChange("price", e.target.value)}
                        className="h-12 rounded-xl"
                        placeholder="Ex: 250 000 FCFA"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Description courte</label>
                    <Textarea 
                      value={form.description}
                      onChange={e => handleChange("description", e.target.value)}
                      className="rounded-xl min-h-[100px] resize-none"
                      placeholder="Présentation du produit..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Spécifications (une par ligne)</label>
                    <Textarea 
                      value={form.specifications?.join("\n")}
                      onChange={e => handleChange("specifications", e.target.value)}
                      className="rounded-xl min-h-[120px] resize-none font-mono text-xs"
                      placeholder="Pression max: 350 bar\nDébit: 80L/min..."
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-semibold">Visuel Produit</label>
                    <div className="relative group cursor-pointer">
                      {form.image ? (
                        <div className="relative rounded-2xl overflow-hidden aspect-video border-2 border-dashed border-border">
                          <img src={form.image} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Button variant="secondary" size="sm" onClick={() => handleChange("image", "")}>Changer l'image</Button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-secondary/30 transition-all cursor-pointer">
                          <ImageIcon className="text-muted-foreground mb-2" size={32} />
                          <span className="text-sm font-medium text-muted-foreground">Cliquez pour uploader</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-border flex gap-4">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold gap-2 shadow-xl shadow-primary/20"
                >
                  <Save size={20} /> Sauvegarder
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFormOpen(false)}
                  className="px-8 h-14 rounded-2xl text-lg font-medium"
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
