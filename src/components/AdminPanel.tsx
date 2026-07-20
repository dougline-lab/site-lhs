import React, { useState } from "react";
import { X, Save, RotateCcw, Sliders, Info, FileCode, CheckCircle2, Phone, Sparkles, FolderSync, Plus, Trash2 } from "lucide-react";
import { SiteData, MachineItem, PortfolioItem } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: SiteData;
  onSave: (newData: SiteData) => void;
  onReset: () => void;
}

export default function AdminPanel({ isOpen, onClose, siteData, onSave, onReset }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<string>("empresa");
  const [localData, setLocalData] = useState<SiteData>({ ...siteData });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showExportGuide, setShowExportGuide] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (section: string, field: string, value: any) => {
    setLocalData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const handleSubItemChange = (section: "machines" | "portfolio", index: number, field: string, value: any) => {
    setLocalData(prev => {
      const items = [...(prev as any)[section]];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: items };
    });
  };

  const handleSave = () => {
    onSave(localData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleResetData = () => {
    if (window.confirm("Deseja realmente restaurar os dados originais do site? Todas as alterações personalizadas serão perdidas.")) {
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          {/* Panel content container */}
          <div className="pointer-events-auto w-screen max-w-2xl">
            <div className="flex h-full flex-col bg-white shadow-2xl border-l border-slate-200">
              
              {/* Header */}
              <div className="bg-brand-blue-950 px-6 py-5 sm:px-8 border-b border-brand-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sliders className="text-brand-accent-500" size={22} />
                    <h2 className="font-display font-bold text-white text-lg tracking-tight" id="slide-over-title">
                      Painel de Customização LH Silva
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-md text-slate-400 hover:text-white hover:bg-brand-blue-900 p-1.5 focus:outline-none transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Configure títulos, contatos, mídias e integre com sua pasta local de imagens do OneDrive.
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="bg-slate-50 border-b border-slate-200 flex px-4">
                {[
                  { id: "empresa", label: "Empresa & Contatos" },
                  { id: "textos", label: "Textos Gerais" },
                  { id: "maquinas", label: "Catálogo de Frota" },
                  { id: "portfolio", label: "Projetos" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3.5 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "border-brand-blue-900 text-brand-blue-950 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content - Scrollable area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
                
                {/* Save Toast success banner */}
                {saveSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-xs font-semibold">Alterações aplicadas com sucesso e salvas localmente! Navegue pelo site para conferir o resultado.</span>
                  </div>
                )}

                {/* TAB 1: Company details */}
                {activeTab === "empresa" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="font-display font-bold text-slate-800 text-sm border-b pb-2 mb-4">Informações de Contato & Canal de WhatsApp</h3>
                    
                    {/* Name & Logo */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nome Oficial</label>
                        <input
                          type="text"
                          value={localData.company.name}
                          onChange={(e) => handleInputChange("company", "name", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Texto Logo</label>
                        <input
                          type="text"
                          value={localData.company.logoText}
                          onChange={(e) => handleInputChange("company", "logoText", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Número WhatsApp (Código País + DDD + Num)</label>
                        <input
                          type="text"
                          value={localData.company.phone}
                          onChange={(e) => handleInputChange("company", "phone", e.target.value)}
                          placeholder="Ex: 5531973564074"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Sem hífens ou parênteses. Comece com 55.</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">E-mail Comercial</label>
                        <input
                          type="email"
                          value={localData.company.email}
                          onChange={(e) => handleInputChange("company", "email", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Address & City */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Endereço (Escritório/Pátio)</label>
                        <input
                          type="text"
                          value={localData.company.address}
                          onChange={(e) => handleInputChange("company", "address", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Cidade - UF</label>
                        <input
                          type="text"
                          value={localData.company.cityState}
                          onChange={(e) => handleInputChange("company", "cityState", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Hours */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Horário de Atendimento</label>
                      <input
                        type="text"
                        value={localData.company.workingHours}
                        onChange={(e) => handleInputChange("company", "workingHours", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                      />
                    </div>

                    {/* Default WhatsApp Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Mensagem Inicial do WhatsApp (Default)</label>
                      <textarea
                        rows={3}
                        value={localData.company.whatsappMsgDefault}
                        onChange={(e) => handleInputChange("company", "whatsappMsgDefault", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* TAB 2: Textos Início & Sobre */}
                {activeTab === "textos" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="font-display font-bold text-slate-800 text-sm border-b pb-2">Seção Início (Hero)</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Título de Impacto (Chamada Principal)</label>
                      <input
                        type="text"
                        value={localData.hero.title}
                        onChange={(e) => handleInputChange("hero", "title", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Descrição / Subtítulo</label>
                      <textarea
                        rows={3}
                        value={localData.hero.subtitle}
                        onChange={(e) => handleInputChange("hero", "subtitle", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Imagem de Fundo (URL ou Caminho Local)</label>
                      <input
                        type="text"
                        value={localData.hero.bgImageUrl}
                        onChange={(e) => handleInputChange("hero", "bgImageUrl", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white font-mono"
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Insira um link do Unsplash ou um caminho local como: <code className="bg-slate-100 p-0.5 rounded">imagens/maquina_banner.jpg</code></p>
                    </div>

                    <h3 className="font-display font-bold text-slate-800 text-sm border-b pb-2 pt-4">Seção Sobre & Licenciamento</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Título da Seção Sobre</label>
                      <input
                        type="text"
                        value={localData.about.title}
                        onChange={(e) => handleInputChange("about", "title", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Parágrafo História 1</label>
                      <textarea
                        rows={3}
                        value={localData.about.text1}
                        onChange={(e) => handleInputChange("about", "text1", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Parágrafo História 2</label>
                      <textarea
                        rows={3}
                        value={localData.about.text2}
                        onChange={(e) => handleInputChange("about", "text2", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 focus:bg-white resize-none"
                      ></textarea>
                    </div>

                    {/* License disclaimer editing */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                        <span>Aviso de Licença Ambiental</span>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Título do Alerta</label>
                        <input
                          type="text"
                          value={localData.about.licenseTitle}
                          onChange={(e) => handleInputChange("about", "licenseTitle", e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Corpo do Texto de Alerta</label>
                        <textarea
                          rows={3}
                          value={localData.about.licenseText}
                          onChange={(e) => handleInputChange("about", "licenseText", e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue-900 resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Catálogo de Frota */}
                {activeTab === "maquinas" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <h3 className="font-display font-bold text-slate-800 text-sm border-b pb-2">Gerenciar Catálogo de Maquinário</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Associe o caminho de suas fotos reais guardadas na sua pasta local do computador. Ao abrir a página no seu navegador local, as fotos carregarão automaticamente!
                    </p>

                    {localData.machines.map((machine, index) => (
                      <div key={machine.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 relative">
                        <div className="flex justify-between items-center">
                          <span className="bg-brand-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            Máquina #{index + 1}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">ID: {machine.id}</span>
                        </div>

                        {/* Name & Category */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Nome Comercial</label>
                            <input
                              type="text"
                              value={machine.name}
                              onChange={(e) => handleSubItemChange("machines", index, "name", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Categoria</label>
                            <select
                              value={machine.category}
                              onChange={(e) => handleSubItemChange("machines", index, "category", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 cursor-pointer"
                            >
                              <option value="pesada">Pesada (Tratores/Escavadeiras)</option>
                              <option value="suporte">Suporte (Retro/Caminhões)</option>
                              <option value="acessorios">Acessórios (Trituradores/Garras)</option>
                            </select>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Descrição Breve</label>
                          <input
                            type="text"
                            value={machine.description}
                            onChange={(e) => handleSubItemChange("machines", index, "description", e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                          />
                        </div>

                        {/* Image Source & Local Path */}
                        <div className="grid grid-cols-1 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Foto Preview (URL Online ou Caminho Local)</label>
                            <input
                              type="text"
                              value={machine.imageUrl}
                              onChange={(e) => handleSubItemChange("machines", index, "imageUrl", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                            />
                            <p className="text-[9.5px] text-slate-400 mt-1">
                              Físico: nomeie sua imagem de maquinário e salve na pasta local, ex: <code className="bg-slate-100 p-0.5 rounded">imagens/escavadeira_20t.jpg</code>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: Projetos */}
                {activeTab === "portfolio" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <h3 className="font-display font-bold text-slate-800 text-sm border-b pb-2">Galeria de Trabalhos Recentes</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Sincronize os arquivos locais em sua pasta OneDrive. Abaixo você configura o nome do arquivo que será lido localmente:
                    </p>

                    {localData.portfolio.map((item, index) => (
                      <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="bg-brand-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            Trabalho #{index + 1}
                          </span>
                        </div>

                        {/* Title & Category */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Título do Trabalho</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleSubItemChange("portfolio", index, "title", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Tipo de Serviço</label>
                            <select
                              value={item.category}
                              onChange={(e) => handleSubItemChange("portfolio", index, "category", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 cursor-pointer"
                            >
                              <option value="supressao">Supressão Vegetal</option>
                              <option value="locacao">Locação de Máquinas</option>
                              <option value="limpeza">Limpeza de Terreno</option>
                            </select>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Resumo da Execução</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleSubItemChange("portfolio", index, "description", e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                          />
                        </div>

                        {/* Paths */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Imagem Online Preview</label>
                            <input
                              type="text"
                              value={item.imageUrl}
                              onChange={(e) => handleSubItemChange("portfolio", index, "imageUrl", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Arquivo Local no PC (OneDrive)</label>
                            <input
                              type="text"
                              value={item.localPath}
                              onChange={(e) => handleSubItemChange("portfolio", index, "localPath", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Sticky bottom Action Bar */}
              <div className="bg-slate-50 px-6 py-5 border-t border-slate-200 flex items-center justify-between gap-4">
                {/* Reset button */}
                <button
                  onClick={handleResetData}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-slate-300/60 cursor-pointer"
                  title="Apagar modificações e restaurar dados padrão"
                >
                  <RotateCcw size={14} />
                  <span>Restaurar Padrão</span>
                </button>

                {/* Right actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowExportGuide(true)}
                    className="bg-brand-blue-900 hover:bg-brand-blue-950 text-white px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-brand-blue-800 cursor-pointer"
                  >
                    <FileCode size={14} />
                    <span>Como Exportar</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="bg-brand-accent-500 hover:bg-brand-accent-600 text-brand-blue-950 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-accent-500/15 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Local Export Guide Modal Overlay */}
      {showExportGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setShowExportGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-brand-blue-950 font-display font-bold text-lg mb-4 border-b pb-3">
              <FolderSync className="text-brand-accent-600" size={22} />
              <span>Sincronizando com seu Computador</span>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>
                Como seu site está rodando online em ambiente de nuvem, ele não pode acessar diretamente a sua pasta do computador (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono break-all text-slate-800">C:\Users\oo_ka\...\site LHS\</code>).
              </p>
              
              <div className="bg-brand-blue-50/60 p-4 rounded-xl border border-brand-blue-100 space-y-2">
                <h5 className="font-bold text-brand-blue-950 text-[11px] uppercase tracking-wide">Passos para rodar 100% Offline:</h5>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                  <li>Faça o download do seu projeto completo como ZIP através do menu de configurações superior do AI Studio.</li>
                  <li>Extraia os arquivos dentro da sua pasta de programação de preferência, que você mencionou: <br/>
                    <code className="bg-slate-100 font-mono p-1 rounded text-[10px] block mt-1 select-all text-brand-blue-900 truncate">C:\Users\oo_ka\OneDrive\Documentos\Programação\site LHS\</code>
                  </li>
                  <li>Insira as imagens que deseja exibir dentro da subpasta <code className="bg-slate-100 font-mono p-0.5 rounded text-slate-800">imagens/</code> criada lá dentro, nomeando-as de acordo com o que definiu neste painel (ex: <code className="bg-slate-100 font-mono p-0.5 rounded text-slate-800">portfolio_industrial.jpg</code>).</li>
                  <li>Abra o arquivo <code className="bg-slate-100 font-mono p-0.5 rounded text-slate-800">index.html</code> no seu navegador local e tudo carregará de forma automática e linda!</li>
                </ol>
              </div>
              
              <p className="text-gray-400 text-[10px] italic">
                Nota: O Painel de Customização possui persistência no navegador, ou seja, suas mídias e textos ficarão guardados no cache de seu computador enquanto constrói o site.
              </p>
            </div>

            <button
              onClick={() => setShowExportGuide(false)}
              className="mt-6 w-full bg-brand-blue-950 hover:bg-brand-blue-900 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Entendido! Continuar Customizando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
