import React from 'react';
import { Sparkles, Film, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';
import { getDirectImageUrl, parseVideoUrl } from '../firebase/driveUtils';

interface HeroProps {
  config: SiteConfig;
  onRequestQuote: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onRequestQuote, onExploreWork }) => {
  const bgImageUrl = getDirectImageUrl(config.heroImagen || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop');
  const videoParsed = config.heroVideoUrl ? parseVideoUrl(config.heroVideoUrl) : null;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F0FD] via-[#FAF8FD] to-[#FAF8FC]">
      {/* Background Media with Soft Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        {videoParsed?.embedUrl ? (
          <iframe
            src={`${videoParsed.embedUrl}?autoplay=1&mute=1&loop=1&controls=0`}
            className="w-full h-full object-cover pointer-events-none scale-125"
            allow="autoplay; fullscreen"
            title="Hero Video Background"
          />
        ) : (
          <img
            src={bgImageUrl}
            alt={config.nombreComercial || 'Studio Foráneas'}
            className="w-full h-full object-cover object-center scale-105"
          />
        )}
      </div>

      {/* Modern Lavender & Lime Ambient Glows */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5F0FD]/80 via-[#FAF8FD]/90 to-[#FAF8FC]" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Editorial Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200/90 bg-white/95 backdrop-blur-md text-purple-800 text-xs sm:text-sm font-semibold tracking-wider shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>{config.heroBadge || 'PUCP • Producción Audiovisual, Redes Sociales & Bodas'}</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-serif text-[#241235] leading-[1.12]">
            {config.heroTitulo || 'Contenido auténtico que comunica la esencia de tu marca'}
          </h1>

          <p className="max-w-2xl mx-auto text-[#554064] text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            {config.heroSubtitulo || 'Combinamos fortalezas en producción audiovisual y estrategia de venta para potenciar tu presencia digital, bodas y eventos especiales.'}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-purple-500/25 hover:shadow-purple-500/35 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-lime-300" />
            <span>{config.heroBotonPrincipalTexto || 'Solicitar Cotización'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-purple-200 bg-white hover:bg-purple-50/70 text-[#241235] hover:text-purple-700 font-semibold text-sm sm:text-base tracking-wide shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Film className="w-4 h-4 text-purple-600" />
            <span>{config.heroBotonSecundarioTexto || 'Ver Trabajos & Portafolio'}</span>
          </button>
        </div>

        {/* Trust Points / Highlights (Editable from Admin) */}
        <div className="pt-10 border-t border-purple-100/90 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/95 border border-purple-100/90 shadow-sm shadow-purple-900/5 hover:border-purple-200 transition-all">
            <span className="block text-2xl font-bold font-serif text-purple-700">
              {config.heroMetrica1Valor || 'S/. 500'}
            </span>
            <span className="text-xs text-[#634E72] font-medium">
              {config.heroMetrica1Label || 'Packs mensuales desde'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border border-lime-200/80 shadow-sm shadow-purple-900/5 hover:border-lime-300 transition-all">
            <span className="block text-2xl font-bold font-serif text-lime-700">
              {config.heroMetrica2Valor || 'En Vivo'}
            </span>
            <span className="text-xs text-[#634E72] font-medium">
              {config.heroMetrica2Label || 'Stories y Reels en eventos'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border border-purple-100/90 shadow-sm shadow-purple-900/5 hover:border-purple-200 transition-all">
            <span className="block text-2xl font-bold font-serif text-purple-700">
              {config.heroMetrica3Valor || '100% Pro'}
            </span>
            <span className="text-xs text-[#634E72] font-medium">
              {config.heroMetrica3Label || 'Luces, micros y trípodes'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/95 border border-lime-200/80 shadow-sm shadow-purple-900/5 hover:border-lime-300 transition-all">
            <span className="block text-2xl font-bold font-serif text-lime-700">
              {config.heroMetrica4Valor || 'PUCP'}
            </span>
            <span className="text-xs text-[#634E72] font-medium">
              {config.heroMetrica4Label || 'Estrategia + Producción'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
