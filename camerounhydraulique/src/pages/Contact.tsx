import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiLinkedin, SiFacebook, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY_INFO, CERTIFICATIONS } from "@/lib/index";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { IMAGES } from "@/assets/images";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "none",
    message: "",
    office: COMPANY_INFO.offices[0]?.city ?? "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "none",
        message: "",
        office: COMPANY_INFO.offices[0]?.city ?? "",
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedOffice = COMPANY_INFO.offices.find((office) => office.city === formData.office);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.HYDRAULIC_HERO_3_3}
            alt="Cameroun Hydraulique contact"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/50 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-xl text-muted-foreground">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-6"
            >
              <motion.div variants={staggerItem}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Adresses</h3>
                        {COMPANY_INFO.offices.map((office) => (
                          <div key={office.city}>
                            <p className="text-sm font-medium text-foreground">{office.city}</p>
                            <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                              {office.addresses.map((line, index) => (
                                <li key={`${office.city}-${index}`}>{line}</li>
                              ))}
                            </ul>
                            {office.bp && (
                              <p className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
                                {office.bp}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                        <div className="flex flex-col text-muted-foreground space-y-1">
                          {COMPANY_INFO.phones.map((phone) => (
                            <a
                              key={phone}
                              href={`tel:${phone.replace(/\s+/g, "")}`}
                              className="hover:text-foreground transition-colors"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                        <div className="flex flex-col text-muted-foreground space-y-1">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">Horaires</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lun - Ven</span>
                            <span className="font-medium">{COMPANY_INFO.hours.weekdays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Samedi</span>
                            <span className="font-medium">{COMPANY_INFO.hours.saturday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dimanche</span>
                            <span className="font-medium">{COMPANY_INFO.hours.sunday}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
                    <div className="flex gap-3">
                      <a
                        href={COMPANY_INFO.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <SiLinkedin className="w-5 h-5 text-primary" />
                      </a>
                      <a
                        href={COMPANY_INFO.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <SiFacebook className="w-5 h-5 text-primary" />
                      </a>
                      <a
                        href={COMPANY_INFO.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <SiX className="w-5 h-5 text-primary" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPresets.gentle, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="border-border/50 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={springPresets.bouncy}
                      className="text-center py-12"
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold mb-2">Message envoyé !</h3>
                      <p className="text-muted-foreground">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Jean Dupont"
                            required
                            className="border-border/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="jean.dupont@exemple.fr"
                            required
                            className="border-border/50"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+33 6 12 34 56 78"
                            className="border-border/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Entreprise</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Nom de votre entreprise"
                            className="border-border/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleChange("subject", value)}
                        >
                          <SelectTrigger className="border-border/50">
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sélectionnez un sujet</SelectItem>
                            <SelectItem value="repair">Réparation</SelectItem>
                            <SelectItem value="installation">Montage sur site</SelectItem>
                            <SelectItem value="training">Formation</SelectItem>
                            <SelectItem value="quote">Demande de devis</SelectItem>
                            <SelectItem value="parts">Pièces détachées</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Agence concernÃ©e *</Label>
                        <Select
                          value={formData.office}
                          onValueChange={(value) => handleChange("office", value)}
                        >
                          <SelectTrigger className="border-border/50">
                            <SelectValue placeholder="Choisissez l'agence Ã  contacter" />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPANY_INFO.offices.map((office) => (
                              <SelectItem key={office.city} value={office.city}>
                                {office.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedOffice && (
                          <div className="rounded-lg border border-dashed border-border/60 bg-muted/40 p-4 text-sm space-y-2">
                            <p className="font-semibold">{selectedOffice.city}</p>
                            <ul className="space-y-1 text-muted-foreground">
                              {selectedOffice.addresses.map((line, index) => (
                                <li key={`${selectedOffice.city}-${index}`}>{line}</li>
                              ))}
                            </ul>
                            {selectedOffice.bp && (
                              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                {selectedOffice.bp}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Décrivez votre demande en détail..."
                          required
                          rows={6}
                          className="border-border/50 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPresets.gentle, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Nos certifications</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {CERTIFICATIONS.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
