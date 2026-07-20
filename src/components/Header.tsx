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
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 fill-[#25D366] shrink-0"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.875-1.875-4.374-2.907-7.014-2.908-5.439 0-9.864 4.414-9.867 9.865-.001 1.748.469 3.454 1.36 4.981l-.938 3.425 3.524-.925zm11.362-3.52c-.29-.146-1.714-.847-1.978-.942-.264-.096-.456-.146-.647.146-.191.293-.742.942-.909 1.134-.166.192-.332.215-.622.07-1.364-.683-2.511-1.221-3.486-2.892-.256-.44-.131-.678-.014-.881.104-.183.29-.342.435-.514.145-.172.193-.293.29-.49.097-.197.049-.369-.024-.515-.074-.146-.647-1.558-.887-2.133-.233-.562-.49-.485-.647-.493-.166-.008-.356-.01-.547-.01-.191 0-.503.072-.766.357-.263.287-1.006.983-1.006 2.396 0 1.413 1.029 2.78 1.173 2.973.143.193 2.024 3.09 4.903 4.332.685.295 1.22.472 1.637.605.688.219 1.314.188 1.81.114.551-.082 1.714-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.074-.12-.263-.191-.554-.337z" />
              </svg>
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
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#25D366] shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.875-1.875-4.374-2.907-7.014-2.908-5.439 0-9.864 4.414-9.867 9.865-.001 1.748.469 3.454 1.36 4.981l-.938 3.425 3.524-.925zm11.362-3.52c-.29-.146-1.714-.847-1.978-.942-.264-.096-.456-.146-.647.146-.191.293-.742.942-.909 1.134-.166.192-.332.215-.622.07-1.364-.683-2.511-1.221-3.486-2.892-.256-.44-.131-.678-.014-.881.104-.183.29-.342.435-.514.145-.172.193-.293.29-.49.097-.197.049-.369-.024-.515-.074-.146-.647-1.558-.887-2.133-.233-.562-.49-.485-.647-.493-.166-.008-.356-.01-.547-.01-.191 0-.503.072-.766.357-.263.287-1.006.983-1.006 2.396 0 1.413 1.029 2.78 1.173 2.973.143.193 2.024 3.09 4.903 4.332.685.295 1.22.472 1.637.605.688.219 1.314.188 1.81.114.551-.082 1.714-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.074-.12-.263-.191-.554-.337z" />
                </svg>
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
