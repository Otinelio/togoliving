import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Localisation | TOGOLIVING Lomé, Togo" },
      { name: "description", content: "Contactez TOGOLIVING : +228 93 87 20 88, togolivinginfo@gmail.com. Kpogan Agbetsiko, Route N2." },
      { property: "og:url", content: "https://residencetogoliving.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://residencetogoliving.com/contact" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const [f, setF] = useState({ nom: "", email: "", objet: "Reservation", message: "" });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `${t("contact.msg.greeting")}\n${t("contact.msg.name")} ${f.nom}\n${t("contact.msg.email")} ${f.email}\n${t("contact.msg.subject")} ${f.objet}\n${t("contact.msg.message")} ${f.message}`;
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/70 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("contact.hero.subtitle")}</p>
          <h1 className="font-display text-5xl md:text-6xl">{t("contact.hero.title")}</h1>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-ocean mb-6">{t("contact.info.title")}</h2>
            <ul className="space-y-4 text-ocean">
              {[
                { i: MapPin, l: "Kpogan Agbetsiko, face Station Total, Route N2, 36BP50 Lomé, Togo" },
                { i: Phone,  l: "+228 93 87 20 88", href: "tel:+22893872088" },
                { i: Mail,   l: "togolivinginfo@gmail.com", href: "mailto:togolivinginfo@gmail.com" },
                { i: Globe,  l: "residencetogoliving.com" },
                { i: Clock,  l: t("contact.info.open") },
              ].map((c, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-10 h-10 rounded-full bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0"><c.i size={18} /></span>
                  {c.href ? <a href={c.href} className="hover:text-turquoise">{c.l}</a> : <span>{c.l}</span>}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl overflow-hidden border border-turquoise/30">
              <iframe
                title="TOGOLIVING Localisation"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1983!2d1.38426!3d6.1794601!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023ef6ce7ef6e2b%3A0x147374ea27bbec54!2sResidence%20Togoliving!5e0!3m2!1sfr!2stg"
                className="w-full h-64"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            onSubmit={send}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass p-7 space-y-4"
          >
            <h2 className="font-display text-3xl text-ocean">{t("contact.form.title")}</h2>
            <label className="block">
              <span className="text-sm text-ocean">{t("contact.form.name")}</span>
              <input required value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })}
                className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" />
            </label>
            <label className="block">
              <span className="text-sm text-ocean">{t("contact.form.email")}</span>
              <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })}
                className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" />
            </label>
            <label className="block">
              <span className="text-sm text-ocean">{t("contact.form.subject")}</span>
              <select value={f.objet} onChange={(e) => setF({ ...f, objet: e.target.value })}
                className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise">
                <option>{t("contact.form.s1")}</option><option>{t("contact.form.s2")}</option><option>{t("contact.form.s3")}</option><option>{t("contact.form.s4")}</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-ocean">{t("contact.form.message")}</span>
              <textarea required rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })}
                className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" />
            </label>
            <button className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-ocean text-white hover:bg-gold hover:text-ocean transition shimmer-gold">
              <MessageCircle size={18} /> {t("contact.form.send")}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
