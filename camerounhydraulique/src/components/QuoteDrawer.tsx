import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, Send, User, Building, Mail, Phone, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuoteStore } from "@/stores/quoteStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ROUTE_PATHS } from "@/lib/index";
import { toast } from "sonner";
import axios from "axios";

export function QuoteDrawer() {
    const { items, isOpen, setOpen, removeItem, updateQuantity, clearQuote } = useQuoteStore();
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
    });

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    const canSubmit = formData.name && formData.email && formData.phone && items.length > 0 && !isSending;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        setIsSending(true);
        const promise = axios.post("/api/quotation", {
            formData,
            items: items.map(item => ({
                product: {
                    name: item.product.name,
                    id: item.product.id
                },
                quantity: item.quantity
            }))
        });

        toast.promise(promise, {
            loading: "Envoi de votre demande de devis...",
            success: () => {
                setIsSending(false);
                clearQuote();
                setOpen(false);
                return "Votre demande a été envoyée avec succès !";
            },
            error: (err) => {
                setIsSending(false);
                console.error(err);
                return "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
            }
        });
    };

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        onClick={() => !isSending && setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="h-6 w-6 text-primary" />
                                <h2 className="text-xl font-bold">Ma demande de devis</h2>
                                {totalItems > 0 && (
                                    <Badge className="bg-primary text-primary-foreground">{totalItems}</Badge>
                                )}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => !isSending && setOpen(false)} disabled={isSending}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Items List */}
                            <div className="p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-4">
                                        <ShoppingCart className="h-16 w-16 opacity-30" />
                                        <p className="text-lg font-medium">Votre demande est vide</p>
                                        <Button asChild variant="outline" onClick={() => setOpen(false)}>
                                            <Link to={ROUTE_PATHS.PRODUCTS}>Voir le catalogue</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-sm"
                                        >
                                            {item.product.image && (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm leading-tight mb-2 truncate">{item.product.name}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                                                        <button 
                                                            className="p-1 hover:bg-secondary transition-colors disabled:opacity-50"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            disabled={isSending}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="px-2 text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                                                        <button 
                                                            className="p-1 hover:bg-secondary transition-colors disabled:opacity-50"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            disabled={isSending}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                                        onClick={() => removeItem(item.product.id)}
                                                        disabled={isSending}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* Contact Form */}
                            {items.length > 0 && (
                                <div className="px-6 py-8 bg-muted/30 border-y border-border space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">Vos coordonnées</h3>
                                        <p className="text-xs text-muted-foreground">Veuillez remplir ces informations pour finaliser votre demande.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input 
                                                    placeholder="Nom complet *"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="pl-10 h-11"
                                                    disabled={isSending}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input 
                                                    placeholder="Entreprise"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    className="pl-10 h-11"
                                                    disabled={isSending}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input 
                                                    type="email"
                                                    placeholder="Email *"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="pl-10 h-11"
                                                    disabled={isSending}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input 
                                                    type="tel"
                                                    placeholder="Téléphone / WhatsApp *"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="pl-10 h-11"
                                                    disabled={isSending}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border space-y-3 bg-background">
                                <div className="text-xs text-muted-foreground text-center">
                                    {totalItems} article{totalItems > 1 ? "s" : ""} sélectionné{totalItems > 1 ? "s" : ""}
                                </div>
                                <Button 
                                    className="w-full gap-2 text-base py-6 font-bold"
                                    disabled={!canSubmit}
                                    onClick={handleSubmit}
                                >
                                    {isSending ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...</>
                                    ) : (
                                        <><Send className="h-4 w-4" /> Envoyer la demande</>
                                    )}
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearQuote} disabled={isSending}>
                                    Vider la liste
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
