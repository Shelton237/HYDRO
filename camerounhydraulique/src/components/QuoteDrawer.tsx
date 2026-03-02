import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuoteStore } from "@/stores/quoteStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTE_PATHS, COMPANY_INFO } from "@/lib/index";

export function QuoteDrawer() {
    const { items, isOpen, setOpen, removeItem, updateQuantity, clearQuote } = useQuoteStore();

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    const subject = encodeURIComponent("Demande de devis – Cameroun Hydraulique");
    const body = encodeURIComponent(
        `Bonjour,\n\nJe souhaite recevoir un devis pour les articles suivants :\n\n${items
            .map((i) => `- ${i.product.name} (Réf: ${i.product.id}) x${i.quantity}`)
            .join("\n")}\n\nCordialement,`
    );
    const mailtoLink = `mailto:${COMPANY_INFO.emails[0]}?subject=${subject}&body=${body}`;

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
                        onClick={() => setOpen(false)}
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
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-4">
                                    <ShoppingCart className="h-16 w-16 opacity-30" />
                                    <p className="text-lg font-medium">Votre demande est vide</p>
                                    <p className="text-sm">Ajoutez des produits depuis notre catalogue pour demander un devis.</p>
                                    <Button asChild variant="outline" onClick={() => setOpen(false)}>
                                        <Link to={ROUTE_PATHS.PRODUCTS}>Voir le catalogue</Link>
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.product.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                                    >
                                        {item.product.image && (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <Badge variant="secondary" className="text-xs mb-1">{item.product.category}</Badge>
                                            <p className="font-semibold text-sm leading-tight">{item.product.name}</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="font-bold w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                                                    onClick={() => removeItem(item.product.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border space-y-3">
                                <div className="text-sm text-muted-foreground text-center">
                                    {totalItems} article{totalItems > 1 ? "s" : ""} dans votre demande
                                </div>
                                <a href={mailtoLink} className="block">
                                    <Button className="w-full gap-2 text-base py-6">
                                        <Send className="h-4 w-4" />
                                        Envoyer la demande de devis
                                    </Button>
                                </a>
                                <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearQuote}>
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
