import React, { useState, useEffect } from "react";
import { Sliders, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { SiteData } from "./types";
import { defaultSiteData } from "./data";

// Subcomponents imports
import Header from "./components/Header";
import Home from "./components/Home";
import Sobre from "./components/Sobre";
import Servicos from "./components/Servicos";
import Portfolio from "./components/Portfolio";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Load saved modifications from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lhsilva_site_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        let wasHealed = false;
        
        // Auto-heal legacy or stale images in localStorage
        if (parsed.portfolio) {
          parsed.portfolio = parsed.portfolio.map((item: any) => {
            const defaultItem = defaultSiteData.portfolio.find((p) => p.id === item.id);
            if (defaultItem) {
              const isStale = 
                !item.imageUrl ||
                item.imageUrl.includes("unsplash.com") ||
                item.imageUrl.includes("imagens/") ||
                item.imageUrl.includes("portfolio_") ||
                item.imageUrl === "tritImg" ||
                item.imageUrl === "limpImg" ||
                item.imageUrl === "caminhoesImg";
              if (isStale) {
                wasHealed = true;
                return { ...item, imageUrl: defaultItem.imageUrl };
              }
            }
            return item;
          });
        }
        if (parsed.machines) {
          parsed.machines = parsed.machines.map((item: any) => {
            const defaultItem = defaultSiteData.machines.find((m) => m.id === item.id);
            if (defaultItem) {
              const isStale = 
                !item.imageUrl ||
                item.imageUrl.includes("unsplash.com") ||
                item.imageUrl.includes("imagens/") ||
                item.imageUrl.includes("portfolio_");
              if (isStale) {
                wasHealed = true;
                return { ...item, imageUrl: defaultItem.imageUrl };
              }
            }
            return item;
          });
        }

        if (wasHealed) {
          localStorage.setItem("lhsilva_site_data", JSON.stringify(parsed));
        }

        setSiteData(parsed);
      }
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage", e);
    }
  }, []);

  // Set up an scroll listener to detect current active section for nav highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre", "servicos", "portfolio", "depoimentos", "contato"];
      const scrollPosition = window.scrollY + 200; // Offset for better detection triggers

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save changes handler
  const handleSaveData = (newData: SiteData) => {
    setSiteData(newData);
    try {
      localStorage.setItem("lhsilva_site_data", JSON.stringify(newData));
    } catch (e) {
      console.error("Erro ao salvar dados no localStorage", e);
    }
  };

  // Reset changes handler
  const handleResetData = () => {
    setSiteData(defaultSiteData);
    try {
      localStorage.removeItem("lhsilva_site_data");
    } catch (e) {
      console.error("Erro ao limpar dados do localStorage", e);
    }
  };

  // Smooth scroll helper
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-accent-500 selection:text-brand-blue-950">
      
      {/* Header Sticky Navigation */}
      <Header 
        siteData={siteData} 
        activeSection={activeSection} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        
        {/* Início (Home) Section */}
        <Home 
          siteData={siteData} 
          onScrollToSection={handleScrollToSection} 
        />

        {/* Sobre Section */}
        <Sobre 
          siteData={siteData} 
        />

        {/* Serviços Section */}
        <Servicos 
          siteData={siteData} 
        />

        {/* Portfólio Section */}
        <Portfolio 
          siteData={siteData} 
        />

        {/* Depoimentos Section */}
        <Depoimentos 
          siteData={siteData} 
        />

        {/* Contato Section */}
        <Contato 
          siteData={siteData} 
        />

      </main>

      {/* Institutional Footer Block */}
      <footer className="bg-brand-blue-950 text-gray-400 py-12 border-t border-brand-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-brand-blue-800 pb-8">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="border-2 border-white px-1.5 py-0.5 flex items-center justify-center font-bold text-white text-md tracking-tight bg-brand-blue-900 leading-none h-8 w-9">
                  LH
                </div>
                <div className="font-display font-bold text-white text-lg tracking-widest leading-none">
                  SILVA
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                Locação de maquinário pesado para terraplanagem, obras civis e execução técnica credenciada de supressão de vegetação florestal.
              </p>
            </div>

            {/* Sitemap Column */}
            <div>
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Navegação</h4>
              <ul className="space-y-2 text-xs">
                {["Home", "Sobre", "Servicos", "Portfolio", "Depoimentos", "Contato"].map((sec) => (
                  <li key={sec}>
                    <button 
                      onClick={() => handleScrollToSection(sec.toLowerCase())}
                      className="hover:text-brand-accent-500 hover:translate-x-1 transition-all cursor-pointer text-left"
                    >
                      {sec === "Servicos" ? "Serviços" : sec === "Portfolio" ? "Portfólio" : sec}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal compliance Column */}
            <div>
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Conformidade Legal</h4>
              <p className="text-xs leading-relaxed">
                As autorizações e licenças ambientais para limpeza ou supressão vegetal devem ser fornecidas pelo cliente contratante previamente à mobilização das equipes de campo.
              </p>
            </div>

            {/* Contact details brief Column */}
            <div>
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Fale Conosco</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-brand-accent-500 shrink-0 mt-0.5" />
                  <span>{siteData.company.address}, {siteData.company.cityState}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-accent-500 shrink-0" />
                  <span>{siteData.company.phone}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="text-brand-accent-500 shrink-0" />
                  <span>{siteData.company.email}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright notice & Admin trigger footer block */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} L.H. Silva Ltda. Todos os direitos reservados. CNPJ sob consulta.</p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hover:text-brand-accent-500 transition-colors flex items-center gap-1 cursor-pointer font-semibold border-b border-dashed border-gray-500 hover:border-brand-accent-500"
              >
                <Sliders size={12} />
                <span>Painel do Administrador</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action WhatsApp with smart popup form */}
      <FloatingWhatsApp siteData={siteData} />

      {/* Admin Customization Sidebar Slide-Over */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        siteData={siteData} 
        onSave={handleSaveData} 
        onReset={handleResetData} 
      />

    </div>
  );
}
