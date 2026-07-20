import React, { useState, useEffect } from "react";
import { MessageSquare, X, ChevronRight, Send } from "lucide-react";
import { SiteData } from "../types";

interface FloatingWhatsAppProps {
  siteData: SiteData;
}

export default function FloatingWhatsApp({ siteData }: FloatingWhatsAppProps) {
  const { company } = siteData;
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a greeting tooltip after 3 seconds, then hide it after 8 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 11000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSendQuick = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = quickMsg.trim() 
      ? encodeURIComponent(`Olá LH Silva! ${quickMsg.trim()}`)
      : encodeURIComponent(company.whatsappMsgDefault);
    
    window.open(`https://wa.me/${company.phone}?text=${finalMsg}`, "_blank");
    setQuickMsg("");
    setIsOpen(false);
  };

  const handleDirectClick = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Tooltip Greeting */}
      {showTooltip && !isOpen && (
        <div className="bg-white text-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-100 text-xs font-semibold mb-3 mr-1 animate-in fade-in slide-in-from-bottom-3 duration-500 max-w-xs relative">
          <div className="absolute right-5 bottom-0 translate-y-1.5 rotate-45 h-3.5 w-3.5 bg-white border-r border-b border-slate-100"></div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Olá! Precisa de orçamento ou máquinas hoje? Fale comigo no WhatsApp!</span>
          </div>
        </div>
      )}

      {/* Quick Chat Bubble / Card Form */}
      {isOpen && (
        <div className="bg-[#0a2540] border border-brand-blue-800 text-white rounded-2xl shadow-2xl w-80 sm:w-88 mb-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-brand-blue-950 p-4 border-b border-brand-blue-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Fake online avatar */}
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-brand-accent-500 flex items-center justify-center font-display font-bold text-brand-blue-950">
                  LHS
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-brand-blue-950"></div>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">LH Silva Suporte</h4>
                <p className="text-[10px] text-emerald-400 font-medium">● Online agora</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-brand-blue-900 text-gray-400 hover:text-white transition-colors"
              id="close-whatsapp-chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-5 bg-brand-blue-900/40 text-slate-300 text-xs space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-[#03152d] border border-brand-blue-800/60 p-3 rounded-xl rounded-tl-none">
              Olá! Obrigado pelo interesse na LH Silva. 🛠️
            </div>
            <div className="bg-[#03152d] border border-brand-blue-800/60 p-3 rounded-xl rounded-tl-none">
              Alugamos escavadeiras, tratores de esteira e executamos supressão vegetal. Como podemos acelerar seu projeto hoje?
            </div>
          </div>

          {/* Chat Footer Input */}
          <form onSubmit={handleSendQuick} className="p-3 bg-brand-blue-950 border-t border-brand-blue-800 flex items-center gap-2">
            <input
              type="text"
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder="Digite sua mensagem rápida..."
              className="flex-grow bg-[#03152d] border border-brand-blue-800/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-accent-500"
              id="quick-whatsapp-input"
            />
            <button
              type="submit"
              className="bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 p-2.5 rounded-xl transition-all shadow-md shadow-brand-accent-500/10 cursor-pointer"
              id="send-quick-whatsapp"
              title="Enviar mensagem"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Action Button */}
      <button
        onClick={handleDirectClick}
        className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-600/40 transform hover:scale-110 active:scale-95 transition-all cursor-pointer relative"
        title="Fale Conosco via WhatsApp"
        id="floating-whatsapp-trigger"
      >
        {/* Pulsing radar rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none scale-105"></span>
        <span className="absolute inset-0 rounded-full bg-emerald-500/15 animate-pulse pointer-events-none scale-125"></span>

        {isOpen ? (
          <X size={24} className="animate-in spin-in-12 duration-200" />
        ) : (
          <MessageSquare size={24} className="fill-white" />
        )}
      </button>

    </div>
  );
}
