import { useMemo, useState } from "react";
import { products as initialProducts } from "@/data/index";
import type { Product } from "@/lib/index";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { springPresets } from "@/lib/motion";

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
  const [catalog, setCatalog] = useState<ProductForm[]>(initialProducts);
  const [form, setForm] = useState<ProductForm>({ ...emptyForm, category: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>(() => {
    const base = new Set(initialProducts.map((p) => p.category));
    return Array.from(base);
  });

  const isEditing = Boolean(editingId);

  const filteredCatalog = useMemo(() => {
    if (!search.trim()) return catalog;
    const query = search.toLowerCase();
    return catalog.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [catalog, search]);

  const handleChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "specifications"
          ? value.split("\n").map((item) => item.trim()).filter(Boolean)
          : value,
    }));
  };

  const handleImageUpload = async (file?: File) => {
    if (!file) {
      handleChange("image", "");
      setImagePreview(undefined);
      return;
    }
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    handleChange("image", base64);
    setImagePreview(base64);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImagePreview(undefined);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.category) return;

    if (isEditing && editingId) {
      setCatalog((prev) =>
        prev.map((product) => (product.id === editingId ? { ...form, id: editingId } : product))
      );
    } else {
      const id = crypto.randomUUID();
      setCatalog((prev) => [...prev, { ...form, id }]);
    }
    resetForm();
  };

  const handleEdit = (product: ProductForm) => {
    setEditingId(product.id);
    setForm(product);
    setImagePreview(product.image);
  };

  const handleDelete = (id: string) => {
    setCatalog((prev) => prev.filter((product) => product.id !== id));
    if (editingId === id) {
      resetForm();
      setCategories((prev) => {
        if (!form.category || prev.includes(form.category)) return prev;
        return [...prev, form.category];
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.gentle}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-2">Backoffice Produits</h1>
          <p className="text-muted-foreground mb-8">
            Ajouter, modifier ou supprimer les produits de votre catalogue.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Modifier le produit" : "Ajouter un produit"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom</label>
                    <Input
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Pompe hydraulique..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categorie</label>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={form.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        required
                      >
                        <option value="">Choisir une categorie</option>
                        {categories.map((category) => (
                          <option value={category} key={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <Input
                        className="w-40"
                        placeholder="Nouvelle"
                        onBlur={(e) => {
                          const newCat = e.target.value.trim();
                          if (newCat && !categories.includes(newCat)) {
                            setCategories((prev) => [...prev, newCat]);
                            handleChange("category", newCat);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Resume du produit"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specifications (une par ligne)</label>
                    <Textarea
                      value={(form.specifications || []).join("\n")}
                      onChange={(e) => handleChange("specifications", e.target.value)}
                      placeholder="Pression max: 350 bar"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prix (facultatif)</label>
                    <Input
                      value={form.price ?? ""}
                      onChange={(e) => handleChange("price", e.target.value)}
                      placeholder="Sur devis / 250 000 FCFA"
                    />
                  </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Image produit</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Apercu"
                        className="h-32 w-full object-cover rounded-lg border"
                      />
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">{isEditing ? "Mettre a jour" : "Ajouter"}</Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Catalogue ({catalog.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filtrer par nom, categorie..."
                />
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredCatalog.map((product) => (
                    <div
                      key={product.id}
                      className="border border-border rounded-xl p-4 bg-card flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 object-cover rounded-md border"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                            Modifier
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                            Supprimer
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      {product.price && (
                        <p className="text-sm font-medium text-primary">Tarif: {product.price}</p>
                      )}
                    </div>
                  ))}
                  {filteredCatalog.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Aucun produit ne correspond a votre recherche.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
