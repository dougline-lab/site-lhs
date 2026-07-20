import React, { useState } from "react";
import { Menu, X, Sliders, Phone } from "lucide-react";
import { SiteData } from "../types";

interface HeaderProps {
  siteData: SiteData;
  activeSection: string;
  onOpenAdmin: () => void;
}

export default function Header({ siteData, activeSection, onOpenAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Início" },
    { id: "sobre", label: "Sobre" },
    { id: "servicos", label: "Serviços" },
    { id: "portfolio", label: "Portfólio" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "contato", label: "Contato" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
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

  const formatPhoneNumber = (phone: string) => {
    // Basic format like (15) 99815-4321
    if (phone.length >= 11) {
      const isDdi = phone.startsWith("55");
      const clean = isDdi ? phone.substring(2) : phone;
      if (clean.length === 11) {
        return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
      }
    }
    return phone;
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-blue-950 text-white shadow-md border-b border-brand-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo LH Silva */}
          <button 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            id="header-logo-btn"
          >
            <div className="border-[3px] border-white px-2 py-1 flex items-center justify-center font-bold text-white text-xl tracking-tighter bg-brand-blue-900 leading-none h-10 w-11 transition-transform group-hover:scale-105">
              LH
            </div>
            <div className="font-display font-bold text-white text-2xl tracking-widest leading-none">
              SILVA
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? "text-brand-accent-500 bg-brand-blue-900/50"
                    : "text-gray-300 hover:text-white hover:bg-brand-blue-900/30"
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}

            {/* Admin Config Button */}
            <button
              onClick={onOpenAdmin}
              className="ml-4 p-2 rounded-full text-brand-accent-500 hover:text-white hover:bg-brand-blue-900/60 transition-all cursor-pointer flex items-center gap-1.5 border border-brand-accent-500/30 hover:border-brand-accent-500 text-xs"
              title="Personalizar Conteúdo e Imagens"
              id="admin-trigger-desktop"
            >
              <Sliders size={15} />
              <span>Personalizar</span>
            </button>

            {/* Quick Contact Link */}
            <a
              href={`https://wa.me/${siteData.company.phone}?text=${encodeURIComponent(siteData.company.whatsappMsgDefault)}`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 font-semibold px-4 py-2 rounded-md text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-sm"
              id="header-whatsapp-cta"
            >
              <Phone size={14} className="fill-brand-blue-950" />
              <span>{formatPhoneNumber(siteData.company.phone)}</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-brand-accent-500 hover:text-white hover:bg-brand-blue-900/60 transition-all cursor-pointer flex items-center gap-1"
              id="admin-trigger-mobile"
            >
              <Sliders size={18} />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-blue-900/40 focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-blue-950 border-t border-brand-blue-800 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-brand-accent-500 bg-brand-blue-900/60"
                    : "text-gray-300 hover:text-white hover:bg-brand-blue-900/30"
                }`}
                id={`mobile-nav-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-brand-blue-900 mt-2 px-3 flex flex-col gap-3">
              <a
                href={`https://wa.me/${siteData.company.phone}?text=${encodeURIComponent(siteData.company.whatsappMsgDefault)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 text-center font-semibold py-3 rounded-md text-base transition-colors flex items-center justify-center gap-2"
                id="mobile-nav-whatsapp-cta"
              >
                <Phone size={16} className="fill-brand-blue-950" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
