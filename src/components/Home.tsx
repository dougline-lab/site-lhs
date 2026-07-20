import React from "react";
import { motion } from "motion/react";
import { Phone, ArrowUpRight } from "lucide-react";
import { SiteData } from "../types";

interface HomeProps {
  siteData: SiteData;
  onScrollToSection: (id: string) => void;
}

export default function Home({ siteData, onScrollToSection }: HomeProps) {
  const { hero, company } = siteData;

  const handleWhatsappCta = () => {
    const text = encodeURIComponent(hero.title + " | " + company.whatsappMsgDefault);
    window.open(`https://wa.me/${company.phone}?text=${text}`, "_blank");
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-brand-blue-950 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImageUrl}
          alt="Operações de Máquinas Pesadas"
          className="w-full h-full object-cover object-center opacity-45 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-950/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Tagline / Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-accent-500/15 border border-brand-accent-500/30 text-brand-accent-500 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-brand-accent-500 animate-pulse"></span>
            Locação & Supressão Técnica Especializada
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleWhatsappCta}
              className="bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-brand-accent-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
              id="hero-whatsapp-btn"
            >
              <Phone size={18} className="fill-brand-blue-950 group-hover:rotate-12 transition-transform" />
              <span>{hero.ctaText}</span>
            </button>

            <button
              onClick={() => onScrollToSection("servicos")}
              className="bg-brand-blue-900/80 hover:bg-brand-blue-900 text-white font-semibold px-8 py-4 rounded-lg border border-brand-blue-700/60 transition-all hover:border-brand-accent-500 hover:text-brand-accent-500 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-services-btn"
            >
              <span>{hero.secondaryCtaText}</span>
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Brand Accent Indicator */}
      <div className="absolute right-0 bottom-32 hidden xl:block z-10 w-96 opacity-10 pointer-events-none">
        <div className="text-white text-[15rem] font-bold font-display tracking-tighter leading-none select-none">
          LHS
        </div>
      </div>
    </section>
  );
}
