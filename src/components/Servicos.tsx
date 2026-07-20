import React, { useState } from "react";
import { Trees, Truck, Wrench, ShieldCheck, HelpCircle, ChevronRight, Calculator, Calendar } from "lucide-react";
import { SiteData, MachineItem } from "../types";

interface ServicosProps {
  siteData: SiteData;
}

export default function Servicos({ siteData }: ServicosProps) {
  const { services, machines, company } = siteData;
  const [activeCategory, setActiveCategory] = useState<string>("todas");

  // Filter machines based on selected category
  const filteredMachines = activeCategory === "todas" 
    ? machines 
    : machines.filter(m => m.category === activeCategory);

  // Helper to render service icon by name
  const renderServiceIcon = (name: string) => {
    switch (name) {
      case "Trees":
        return <Trees size={32} className="text-brand-accent-500" />;
      case "Truck":
        return <Truck size={32} className="text-brand-accent-500" />;
      case "Wrench":
        return <Wrench size={32} className="text-brand-accent-500" />;
      default:
        return <Trees size={32} className="text-brand-accent-500" />;
    }
  };

  const handleRentRequest = (machineName: string) => {
    const text = encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento para a locação da máquina: *${machineName}*.`);
    window.open(`https://wa.me/${company.phone}?text=${text}`, "_blank");
  };

  return (
    <section id="servicos" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-accent-600 font-bold uppercase tracking-wider text-sm">
            {services.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-blue-950 mt-2 tracking-tight">
            {services.title}
          </h2>
          <div className="h-1 w-20 bg-brand-accent-500 mx-auto mt-4 rounded"></div>
          <p className="text-gray-500 mt-4 text-base">
            {services.text}
          </p>
        </div>

        {/* Services List - Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {services.items.map((srv, idx) => (
            <div 
              key={idx}
              className="bg-[#f8fafc] border border-slate-100 hover:border-brand-blue-200/50 hover:shadow-xl hover:shadow-brand-blue-950/5 p-8 rounded-2xl transition-all duration-300 relative group"
            >
              {/* Top Bar Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue-900 rounded-t-2xl transition-all group-hover:bg-brand-accent-500 duration-300"></div>

              {/* Icon Container */}
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 border border-slate-100 group-hover:bg-brand-blue-950 group-hover:text-white transition-all duration-300">
                <span className="transition-transform group-hover:scale-110">
                  {renderServiceIcon(srv.iconName)}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-brand-blue-950 text-xl mb-4 group-hover:text-brand-blue-900 transition-colors">
                {srv.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {srv.description}
              </p>

              {/* Features bullets */}
              <ul className="space-y-3 border-t border-slate-100 pt-6">
                {srv.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                    <ShieldCheck size={16} className="text-brand-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dynamic Equipment Fleet Catalog */}
        <div className="bg-brand-blue-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-12 translate-y-12"></div>

          <div className="relative z-10">
            {/* Catalog header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-brand-blue-800 pb-8">
              <div>
                <span className="text-brand-accent-500 text-xs font-bold uppercase tracking-widest block mb-2">
                  Catálogo de Frota
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Locação de Máquinas e Equipamentos
                </h3>
              </div>

              {/* Category buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "todas", label: "Toda Frota" },
                  { id: "pesada", label: "Pesadas" },
                  { id: "suporte", label: "Suporte" },
                  { id: "acessorios", label: "Acessórios" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveCategory(btn.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      activeCategory === btn.id
                        ? "bg-brand-accent-500 text-brand-blue-950 font-bold shadow-lg shadow-brand-accent-500/20"
                        : "bg-brand-blue-900/60 hover:bg-brand-blue-900 text-gray-300 hover:text-white"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Machines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMachines.map((machine) => (
                <div 
                  key={machine.id}
                  className="bg-brand-blue-900/40 rounded-2xl overflow-hidden border border-brand-blue-800/80 hover:border-brand-accent-500/50 transition-all duration-300 flex flex-col group h-full"
                >
                  {/* Photo with overlay */}
                  <div className="relative aspect-video overflow-hidden shrink-0 bg-brand-blue-950">
                    <img
                      src={
                        machine.imageUrl.startsWith("http://") ||
                        machine.imageUrl.startsWith("https://") ||
                        machine.imageUrl.startsWith("data:")
                          ? machine.imageUrl
                          : `${import.meta.env.BASE_URL}${machine.imageUrl.startsWith("/") ? machine.imageUrl.slice(1) : machine.imageUrl}`
                      }
                      alt={machine.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/80 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 bg-brand-accent-500/90 text-brand-blue-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                      {machine.category === "pesada" ? "Pesada" : machine.category === "suporte" ? "Suporte" : "Acessório"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-white text-lg mb-2 group-hover:text-brand-accent-500 transition-colors">
                        {machine.name}
                      </h4>
                      <p className="text-gray-300 text-xs leading-relaxed mb-4">
                        {machine.description}
                      </p>

                      {/* Specifications lists */}
                      <div className="space-y-1.5 mb-6 bg-brand-blue-950/50 p-3.5 rounded-lg border border-brand-blue-800/50">
                        {machine.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                            <span className="h-1 w-1 bg-brand-accent-500 rounded-full"></span>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rent Action Trigger */}
                    <button
                      onClick={() => handleRentRequest(machine.name)}
                      className="w-full bg-brand-accent-500/10 hover:bg-brand-accent-500 text-brand-accent-500 hover:text-brand-blue-950 border border-brand-accent-500/20 hover:border-brand-accent-500 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Solicitar Aluguel</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty check */}
            {filteredMachines.length === 0 && (
              <div className="text-center py-12 bg-brand-blue-900/20 rounded-2xl border border-dashed border-brand-blue-800">
                <HelpCircle size={40} className="mx-auto text-gray-400 mb-4 animate-bounce" />
                <p className="text-gray-300 font-medium text-sm">Nenhuma máquina cadastrada nesta categoria.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
