import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteData } from "../types";

interface ContatoProps {
  siteData: SiteData;
}

export default function Contato({ siteData }: ContatoProps) {
  const { company } = siteData;
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "supressao",
    mensagem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPhoneNumber = (phone: string) => {
    if (phone.length >= 11) {
      const isDdi = phone.startsWith("55");
      const clean = isDdi ? phone.substring(2) : phone;
      if (clean.length === 11) {
        return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
      }
    }
    return phone;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form service display name
    const serviceLabels: Record<string, string> = {
      supressao: "Supressão Vegetal Especializada",
      locacao: "Locação de Máquinas Pesadas",
      limpeza: "Limpeza de Terreno / Destocamento",
      outros: "Outro Assunto"
    };

    const chosenService = serviceLabels[formData.servico] || formData.servico;

    // Build the WhatsApp api string
    const textMsg = `Olá *LH Silva*!\n\n` +
      `Me chamo *${formData.nome}*.\n` +
      `*WhatsApp:* ${formData.telefone}\n` +
      `*Serviço de interesse:* ${chosenService}\n\n` +
      `*Mensagem:* ${formData.mensagem || "Gostaria de solicitar um orçamento!"}`;

    const encodedText = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/${company.phone}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, "_blank");

      // Reset success banner after 5s
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-[#0a2540] text-white overflow-hidden relative">
      {/* Decorative dark background assets */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-accent-500 font-bold uppercase tracking-wider text-sm">
            Fale Conosco
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
            Solicite um Orçamento Rápido
          </h2>
          <div className="h-1 w-20 bg-brand-accent-500 mx-auto mt-4 rounded"></div>
          <p className="text-gray-400 text-sm mt-4">
            Preencha os dados e fale diretamente com o nosso setor operacional via WhatsApp. Estamos prontos para responder em minutos!
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Side (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-brand-accent-500">
                L.H. Silva Ltda.
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Logística de máquinas pesadas para locação e suporte técnico operacional em supressões florestais licenciadas. Conte com frota revisada e equipe qualificada.
              </p>

              {/* Contact detail cards */}
              <div className="space-y-4 pt-4">
                {/* Phone */}
                <div className="flex items-center gap-4 bg-brand-blue-950/50 p-4 rounded-xl border border-brand-blue-800/40">
                  <div className="bg-brand-accent-500 text-brand-blue-950 p-2.5 rounded-lg flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4.5 h-4.5 fill-[#25D366] shrink-0"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.904-6.999-1.875-1.875-4.374-2.907-7.014-2.908-5.439 0-9.864 4.414-9.867 9.865-.001 1.748.469 3.454 1.36 4.981l-.938 3.425 3.524-.925zm11.362-3.52c-.29-.146-1.714-.847-1.978-.942-.264-.096-.456-.146-.647.146-.191.293-.742.942-.909 1.134-.166.192-.332.215-.622.07-1.364-.683-2.511-1.221-3.486-2.892-.256-.44-.131-.678-.014-.881.104-.183.29-.342.435-.514.145-.172.193-.293.29-.49.097-.197.049-.369-.024-.515-.074-.146-.647-1.558-.887-2.133-.233-.562-.49-.485-.647-.493-.166-.008-.356-.01-.547-.01-.191 0-.503.072-.766.357-.263.287-1.006.983-1.006 2.396 0 1.413 1.029 2.78 1.173 2.973.143.193 2.024 3.09 4.903 4.332.685.295 1.22.472 1.637.605.688.219 1.314.188 1.81.114.551-.082 1.714-.7 1.956-1.378.24-.678.24-1.258.17-1.378-.074-.12-.263-.191-.554-.337z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Telefone & WhatsApp</h5>
                    <p className="text-sm font-semibold text-white">{formatPhoneNumber(company.phone)}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 bg-brand-blue-950/50 p-4 rounded-xl border border-brand-blue-800/40">
                  <div className="bg-brand-accent-500 text-brand-blue-950 p-2.5 rounded-lg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">E-mail Corporativo</h5>
                    <p className="text-sm font-semibold text-white">{company.email}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4 bg-brand-blue-950/50 p-4 rounded-xl border border-brand-blue-800/40">
                  <div className="bg-brand-accent-500 text-brand-blue-950 p-2.5 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Escritório & Pátio</h5>
                    <p className="text-sm font-semibold text-white">
                      {company.address} - {company.cityState}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-4 bg-brand-blue-950/50 p-4 rounded-xl border border-brand-blue-800/40">
                  <div className="bg-brand-accent-500 text-brand-blue-950 p-2.5 rounded-lg">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Atendimento Operacional</h5>
                    <p className="text-sm font-semibold text-white">{company.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="border-t border-brand-blue-800/60 pt-6">
              <div className="text-xs text-gray-400 leading-relaxed bg-brand-blue-950/30 p-4 rounded-xl border border-dashed border-brand-blue-800">
                📍 <strong>Localização Estratégica:</strong> Baseados em Sorocaba-SP, atendemos com rapidez e agilidade logística toda a região metropolitana, interior de São Paulo e estados vizinhos.
              </div>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-brand-blue-950/80 rounded-2xl p-6 sm:p-10 border border-brand-blue-800/80 shadow-2xl relative">
              
              <h4 className="font-display font-bold text-white text-xl mb-6">
                Preencha o Formulário de Orçamento
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="nome" className="block text-xs font-bold uppercase text-gray-300 tracking-wide mb-1.5">
                    Seu Nome ou Empresa *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: João da Silva / Construtora Real"
                    className="w-full bg-[#03152d] border border-brand-blue-800/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent-500 focus:ring-1 focus:ring-brand-accent-500 transition-all placeholder:text-gray-500"
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label htmlFor="telefone" className="block text-xs font-bold uppercase text-gray-300 tracking-wide mb-1.5">
                    Telefone com WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    required
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="Ex: (31) 97356-4074"
                    className="w-full bg-[#03152d] border border-brand-blue-800/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent-500 focus:ring-1 focus:ring-brand-accent-500 transition-all placeholder:text-gray-500"
                  />
                </div>

                {/* Service Select */}
                <div>
                  <label htmlFor="servico" className="block text-xs font-bold uppercase text-gray-300 tracking-wide mb-1.5">
                    Serviço Desejado *
                  </label>
                  <select
                    id="servico"
                    name="servico"
                    value={formData.servico}
                    onChange={handleInputChange}
                    className="w-full bg-[#03152d] border border-brand-blue-800/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent-500 focus:ring-1 focus:ring-brand-accent-500 transition-all cursor-pointer"
                  >
                    <option value="supressao">Supressão Vegetal Especializada</option>
                    <option value="locacao">Locação de Máquinas Pesadas</option>
                    <option value="limpeza">Limpeza de Terreno e Destocamento</option>
                    <option value="outros">Dúvidas / Outros Assuntos</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="mensagem" className="block text-xs font-bold uppercase text-gray-300 tracking-wide mb-1.5">
                    Mensagem ou Detalhes da Solicitação
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Descreva brevemente o terreno, área total em hectares, maquinários necessários ou prazos previstos..."
                    className="w-full bg-[#03152d] border border-brand-blue-800/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-accent-500 focus:ring-1 focus:ring-brand-accent-500 transition-all placeholder:text-gray-500 resize-none"
                  ></textarea>
                </div>

                {/* License warning indicator */}
                <div className="text-[10.5px] text-brand-accent-500/80 leading-relaxed pt-1 bg-brand-blue-950/40 p-3 rounded border border-brand-blue-800/30">
                  ⚠️ <strong>Aviso:</strong> Para serviços de supressão vegetal, certifique-se de já possuir as devidas licenças ambientais emitidas pelos órgãos competentes (como CETESB, IBAMA, etc.).
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 font-bold py-4 rounded-xl shadow-lg shadow-brand-accent-500/10 hover:shadow-brand-accent-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  id="contact-form-submit-btn"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Enviando..." : "Enviar Solicitação p/ WhatsApp"}</span>
                </button>
                
                {/* Success Banner */}
                {isSuccess && (
                  <div className="bg-emerald-500/25 border border-emerald-500 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span className="text-xs font-semibold">Orçamento iniciado! Você está sendo redirecionado para o WhatsApp de atendimento...</span>
                  </div>
                )}
              </form>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
