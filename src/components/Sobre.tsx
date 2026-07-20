import React from "react";
import { motion } from "motion/react";
import { Shield, Clock, Leaf, AlertTriangle, FileText } from "lucide-react";
import { SiteData } from "../types";

interface SobreProps {
  siteData: SiteData;
}

export default function Sobre({ siteData }: SobreProps) {
  const { about } = siteData;

  // Helper to render icon by name
  const renderIcon = (name: string, size = 28) => {
    switch (name) {
      case "Shield":
        return <Shield size={size} className="text-brand-accent-500" />;
      case "Clock":
        return <Clock size={size} className="text-brand-accent-500" />;
      case "Leaf":
        return <Leaf size={size} className="text-brand-accent-500" />;
      default:
        return <Shield size={size} className="text-brand-accent-500" />;
    }
  };

  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-accent-600 font-bold uppercase tracking-wider text-sm">
            {about.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-blue-950 mt-2 tracking-tight">
            {about.title}
          </h2>
          <div className="h-1 w-20 bg-brand-accent-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Main Content (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-2xl font-bold text-brand-blue-900">
              Parceiro de confiança na locação de maquinários e manejo de solos
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {about.text1}
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              {about.text2}
            </p>

            {/* Crucial Disclaimer Alert Banner */}
            <div className="bg-brand-blue-900 text-white rounded-xl p-6 shadow-md border-l-4 border-brand-accent-500 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 opacity-5">
                <FileText size={180} />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-brand-accent-500 text-brand-blue-950 p-2.5 rounded-lg shrink-0 mt-1">
                  <AlertTriangle size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-brand-accent-500 text-lg mb-2">
                    {about.licenseTitle}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {about.licenseText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphic Banner (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"
                alt="Operação Florestal com Maquinário Pesado"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950 via-transparent to-transparent opacity-60"></div>
              
              {/* Experience badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md text-brand-blue-950 p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-display font-extrabold text-brand-blue-900">100%</span>
                  <div>
                    <h5 className="font-bold text-sm leading-tight">Execução Técnica Certificada</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Operações sob estrito regulamento de engenharia mecânica e florestal.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Dots background styling */}
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-brand-accent-500/10 rounded-full blur-2xl z-0"></div>
          </div>
        </div>

        {/* Values Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {about.values.map((val, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group duration-300"
            >
              <div className="bg-brand-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-blue-900 transition-colors duration-300">
                <span className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {renderIcon(val.iconName)}
                </span>
              </div>
              <h4 className="font-display font-bold text-brand-blue-950 text-xl mb-3">
                {val.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
