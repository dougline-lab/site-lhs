import React, { useState } from "react";
import { Folder, Eye, CheckCircle2, ChevronRight, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { SiteData, PortfolioItem } from "../types";
import { resolveImagePath } from "../utils/image";

interface PortfolioProps {
  siteData: SiteData;
}

export default function Portfolio({ siteData }: PortfolioProps) {
  const { portfolio, company } = siteData;
  const [activeTab, setActiveTab] = useState<string>("todos");

  const filteredItems = activeTab === "todos"
    ? portfolio
    : portfolio.filter(p => p.category === activeTab);

  const handleConsultProject = (projectTitle: string) => {
    const text = encodeURIComponent(`Olá! Vi o projeto "${projectTitle}" no portfólio do site de vocês e gostaria de solicitar um orçamento para um serviço semelhante.`);
    window.open(`https://wa.me/${company.phone}?text=${text}`, "_blank");
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-accent-600 font-bold uppercase tracking-wider text-sm">
            Portfólio de Campo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-blue-950 mt-2 tracking-tight">
            Nossos Trabalhos Recentes
          </h2>
          <div className="h-1 w-20 bg-brand-accent-500 mx-auto mt-4 rounded"></div>
          <p className="text-gray-500 text-sm mt-4">
            Confira registros reais de operações executadas pela nossa equipe. Note as especificações de arquivos locais para alimentar o site em sua máquina física.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {[
            { id: "todos", label: "Todos os Projetos" },
            { id: "supressao", label: "Supressão Vegetal" },
            { id: "locacao", label: "Locação de Máquinas" },
            { id: "limpeza", label: "Limpeza de Terreno" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-blue-900 text-white shadow-md shadow-brand-blue-950/20 border-transparent"
                  : "bg-white hover:bg-slate-100 text-gray-500 hover:text-brand-blue-950 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
            >
              {/* Photo or Video cover */}
              <div className="relative aspect-4/3 overflow-hidden bg-brand-blue-950 group/img">
                {item.videoUrl ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.play().catch((err) => console.log("Autoplay interrupted/blocked:", err));
                      }
                    }}
                    poster={resolveImagePath(item.imageUrl)}
                    className="w-full h-full object-cover animate-fade-in"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={resolveImagePath(item.videoUrl)} type="video/mp4" />
                    Seu navegador não suporta a exibição de vídeos.
                  </video>
                ) : (
                  <>
                    <img
                      src={resolveImagePath(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/90 via-brand-blue-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button 
                        onClick={() => handleConsultProject(item.title)}
                        className="bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-brand-accent-500/20 cursor-pointer transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300"
                      >
                        <span>Orçar Semelhante</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                )}

                {/* Media Type indicator banner */}
                <div className="absolute top-4 right-4 bg-brand-blue-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-blue-800/40 flex items-center gap-1 text-[10px] text-white font-semibold z-10">
                  {item.videoUrl ? (
                    <>
                      <VideoIcon size={12} className="text-brand-accent-500" />
                      <span className="uppercase tracking-wider">Vídeo</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={12} className="text-brand-accent-500" />
                      <span className="uppercase tracking-wider">Imagem</span>
                    </>
                  )}
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue-600 block mb-2">
                    {item.category === "supressao" ? "Supressão Vegetal" : item.category === "locacao" ? "Locação de Máquinas" : "Limpeza & Destocamento"}
                  </span>
                  <h4 className="font-display font-bold text-brand-blue-950 text-lg mb-2 group-hover:text-brand-blue-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
              <Folder size={40} className="mx-auto text-gray-400 mb-4 animate-pulse" />
              <p className="text-gray-400 font-medium text-sm">Nenhum projeto cadastrado nesta aba.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
