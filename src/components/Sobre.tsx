import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Shield, Clock, Leaf, AlertTriangle, FileText, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { SiteData } from "../types";

interface SobreProps {
  siteData: SiteData;
}

export default function Sobre({ siteData }: SobreProps) {
  const { about } = siteData;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita pausar/dar play ao clicar no botão de som
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
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
          <div className="lg:col-span-5 relative" id="sobre-video-container">
            <div 
              onClick={togglePlay}
              className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group bg-brand-blue-950 cursor-pointer"
            >
              <video
                ref={videoRef}
                src="/src/assets/images/triturador-trabalhand.mp4"
                poster="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                title="Operação Florestal com Maquinário Pesado"
              >
                Seu navegador não suporta a exibição de vídeos HTML5.
              </video>
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/80 via-transparent to-black/30 pointer-events-none opacity-60"></div>

              {/* Top Bar for Sound Control */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={toggleMute}
                  className="bg-brand-blue-950/70 hover:bg-brand-blue-900/90 text-white p-2 rounded-full border border-brand-blue-800/40 backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center justify-center cursor-pointer"
                  title={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Play/Pause Large Center Icon on Hover or Paused State */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-10 ${
                !isPlaying ? "opacity-100 scale-100 bg-black/20" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
              }`}>
                <div className="bg-brand-accent-500 text-brand-blue-950 p-4 rounded-full shadow-lg border border-brand-accent-400">
                  {isPlaying ? <Pause size={24} className="fill-brand-blue-950" /> : <Play size={24} className="fill-brand-blue-950 ml-0.5" />}
                </div>
              </div>

              {/* Video Badge Title */}
              <div className="absolute top-4 left-4 bg-brand-accent-500/90 text-brand-blue-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-brand-accent-400/30 shadow-sm z-10 pointer-events-none">
                Vídeo Operacional
              </div>
              
              {/* Experience badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md text-brand-blue-950 p-6 rounded-xl shadow-lg border border-gray-100 z-10 pointer-events-none">
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
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-brand-accent-500/10 rounded-full blur-2xl z-0 pointer-events-none"></div>
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
