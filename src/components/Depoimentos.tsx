import React from "react";
import { Quote, Star } from "lucide-react";
import { SiteData } from "../types";

interface DepoimentosProps {
  siteData: SiteData;
}

export default function Depoimentos({ siteData }: DepoimentosProps) {
  const { testimonials } = siteData;

  return (
    <section id="depoimentos" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-accent-600 font-bold uppercase tracking-wider text-sm">
            Depoimentos de Parceiros
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-blue-950 mt-2 tracking-tight">
            Quem Confia na LH Silva
          </h2>
          <div className="h-1 w-20 bg-brand-accent-500 mx-auto mt-4 rounded"></div>
          <p className="text-gray-500 text-sm mt-4">
            A satisfação dos nossos contratantes é a prova do nosso compromisso com prazos, engenharia qualificada e segurança de canteiro.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="bg-[#f8fafc] border border-slate-100 hover:border-slate-200 p-8 rounded-2xl relative shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card content */}
              <div>
                {/* Quote Icon */}
                <div className="text-brand-accent-500/20 absolute top-6 right-6">
                  <Quote size={50} className="stroke-[3]" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-brand-accent-500 stroke-brand-accent-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 text-sm leading-relaxed italic mb-6 relative z-10">
                  "{test.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-200/60 pt-5 flex items-center gap-3">
                {/* Initial circle avatar matching their color palette */}
                <div className="h-10 w-10 rounded-full bg-brand-blue-900 flex items-center justify-center font-display font-bold text-white text-sm shrink-0">
                  {test.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <h5 className="font-bold text-sm text-brand-blue-950 leading-none mb-1">
                    {test.name}
                  </h5>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {test.role} • <span className="text-brand-blue-600 font-semibold">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
