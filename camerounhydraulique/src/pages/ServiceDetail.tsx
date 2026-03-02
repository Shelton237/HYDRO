import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { Wrench, Truck, GraduationCap, Settings, ArrowLeft, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { services } from "@/data/index";
import { ROUTE_PATHS, COMPANY_INFO } from "@/lib/index";
import { springPresets, staggerContainer, staggerItem } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Wrench, Truck, GraduationCap, Settings,
};

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const service = services.find((s) => s.id === id);

    if (!service) return <Navigate to={ROUTE_PATHS.SERVICES} replace />;

    const Icon = iconMap[service.icon] || Wrench;
    const otherServices = services.filter((s) => s.id !== id);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-28 overflow-hidden">
                {service.image && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover opacity-25"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
                    </div>
                )}
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springPresets.gentle}
                    >
                        <Link
                            to={ROUTE_PATHS.SERVICES}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Retour aux services
                        </Link>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Icon className="h-8 w-8" />
                            </div>
                            <Badge variant="secondary" className="text-sm">Service</Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">{service.title}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">{service.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Intro + Key features */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={springPresets.gentle}
                        >
                            <h2 className="text-3xl font-bold mb-6">À propos de ce service</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg mb-8">{service.intro}</p>
                            <div className="space-y-3">
                                {service.features.map((f) => (
                                    <div key={f} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Benefits */}
                        {service.benefits && (
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={springPresets.gentle}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                            >
                                {service.benefits.map((b, i) => (
                                    <div
                                        key={b.title}
                                        className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="text-2xl font-black text-primary/20 mb-2">0{i + 1}</div>
                                        <h3 className="font-semibold mb-2">{b.title}</h3>
                                        <p className="text-sm text-muted-foreground">{b.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Process */}
            {service.process && (
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={springPresets.gentle}
                            className="text-center mb-14"
                        >
                            <h2 className="text-3xl font-bold mb-4">Notre processus</h2>
                            <p className="text-muted-foreground text-lg">Une méthode rodée pour vous garantir qualité et fiabilité</p>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {service.process.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    variants={staggerItem}
                                    className="relative bg-card border border-border/60 rounded-2xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                >
                                    {index < service.process!.length - 1 && (
                                        <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-border h-6 w-6 z-10" />
                                    )}
                                    <span className="text-5xl font-black text-primary/10 block mb-4 leading-none">{step.step}</span>
                                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Applications */}
            {service.applications && (
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={springPresets.gentle}
                            >
                                <h2 className="text-3xl font-bold mb-4">Secteurs & applications</h2>
                                <p className="text-muted-foreground mb-8">
                                    Ce service est adapté à toutes les industries qui utilisent des systèmes hydrauliques.
                                </p>
                                <ul className="space-y-4">
                                    {service.applications.map((app) => (
                                        <li key={app} className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                            <span className="font-medium">{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                            {service.image && (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={springPresets.gentle}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-96 object-cover rounded-2xl shadow-xl"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={springPresets.gentle}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold mb-6">Besoin de ce service ?</h2>
                        <p className="text-xl mb-8 text-primary-foreground/85">
                            Nos experts sont disponibles pour analyser vos besoins et vous proposer un devis personnalisé.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={ROUTE_PATHS.CONTACT}>
                                <Button size="lg" variant="secondary" className="gap-2">
                                    Demander un devis
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <a href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, "")}`}>
                                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                                    <Phone className="h-4 w-4" />
                                    {COMPANY_INFO.phones[0]}
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Other services */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center">Nos autres services</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherServices.map((s) => {
                            const OtherIcon = iconMap[s.icon] || Wrench;
                            return (
                                <Link
                                    key={s.id}
                                    to={`/services/${s.id}`}
                                    className="group bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        <OtherIcon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                                        En savoir plus
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
