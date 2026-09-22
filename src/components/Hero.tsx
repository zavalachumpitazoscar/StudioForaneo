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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF5F6] via-[#FFF9FA] to-[#FFF8F9]">
      {/* Background Media with Soft Warm Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
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
            alt="Studio Foráneas Producción Audiovisual"
            className="w-full h-full object-cover object-center scale-105"
          />
        )}
      </div>

      {/* Feminine Soft Ambient Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFF5F7]/70 via-[#FFF9FA]/90 to-[#FFF8F9]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Editorial Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-200/80 bg-white/90 backdrop-blur-md text-rose-600 text-xs sm:text-sm font-semibold tracking-wider shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>PUCP • Producción Audiovisual, Redes Sociales & Bodas</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-serif text-[#33182B] leading-[1.12]">
            {config.heroTitulo || 'Contenido auténtico que comunica la esencia de tu marca'}
          </h1>

          <p className="max-w-2xl mx-auto text-[#5E4758] text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            {config.heroSubtitulo || 'Combinamos fortalezas en producción audiovisual y estrategia de venta para potenciar tu presencia digital, bodas y eventos especiales.'}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onRequestQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-rose-200 hover:shadow-rose-300 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Solicitar Cotización</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-rose-200 bg-white hover:bg-rose-50/70 text-[#3B1E32] hover:text-rose-600 font-semibold text-sm sm:text-base tracking-wide shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Film className="w-4 h-4 text-rose-500" />
            <span>Ver Trabajos & Portafolio</span>
          </button>
        </div>

        {/* Trust Points / Highlights */}
        <div className="pt-10 border-t border-rose-100 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-sm shadow-rose-950/5">
            <span className="block text-2xl font-bold font-serif text-rose-600">S/. 500</span>
            <span className="text-xs text-[#6B5365] font-medium">Packs mensuales desde</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-sm shadow-rose-950/5">
            <span className="block text-2xl font-bold font-serif text-rose-600">En Vivo</span>
            <span className="text-xs text-[#6B5365] font-medium">Stories y Reels en eventos</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-sm shadow-rose-950/5">
            <span className="block text-2xl font-bold font-serif text-rose-600">100% Pro</span>
            <span className="text-xs text-[#6B5365] font-medium">Luces, micros y trípodes</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-rose-100 shadow-sm shadow-rose-950/5">
            <span className="block text-2xl font-bold font-serif text-rose-600">PUCP</span>
            <span className="text-xs text-[#6B5365] font-medium">Estrategia + Producción</span>
          </div>
        </div>
      </div>
    </section>
  );
};
