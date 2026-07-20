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
          referrerPolicy="no-referrer"
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
              <svg
                viewBox="0 0 24 24"
                className="w-5.5 h-5.5 fill-[#25D366] group-hover:rotate-12 transition-transform shrink-0"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.875-1.875-4.374-2.907-7.014-2.908-5.439 0-9.864 4.414-9.867 9.865-.001 1.748.469 3.454 1.36 4.981l-.938 3.425 3.524-.925zm11.362-3.52c-.29-.146-1.714-.847-1.978-.942-.264-.096-.456-.146-.647.146-.191.293-.742.942-.909 1.134-.166.192-.332.215-.622.07-1.364-.683-2.511-1.221-3.486-2.892-.256-.44-.131-.678-.014-.881.104-.183.29-.342.435-.514.145-.172.193-.293.29-.49.097-.197.049-.369-.024-.515-.074-.146-.647-1.558-.887-2.133-.233-.562-.49-.485-.647-.493-.166-.008-.356-.01-.547-.01-.191 0-.503.072-.766.357-.263.287-1.006.983-1.006 2.396 0 1.413 1.029 2.78 1.173 2.973.143.193 2.024 3.09 4.903 4.332.685.295 1.22.472 1.637.605.688.219 1.314.188 1.81.114.551-.082 1.714-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.074-.12-.263-.191-.554-.337z" />
              </svg>
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
