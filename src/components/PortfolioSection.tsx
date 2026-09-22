import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { ZoomIn, ChevronLeft, ChevronRight, LayoutGrid, Sliders } from 'lucide-react';
import { getDirectImageUrl } from '../firebase/driveUtils';

interface PortfolioSectionProps {
  items: PortfolioItem[];
  onSelectPhoto: (item: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ items, onSelectPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const categories = [
    { id: 'todas', label: 'Todas las Fotografías' },
    { id: 'bodas', label: 'Bodas' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'marcas', label: 'Marcas & Moda' },
    { id: 'retratos', label: 'Retratos' },
  ];

  const filteredItems = items
    .filter(i => i.publicado)
    .filter(i => activeCategory === 'todas' || i.categoria === activeCategory)
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  const handlePrev = () => {
    setCarouselIndex(prev => (prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex(prev => (prev >= filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="portafolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
            Portafolio Visual
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#33182B]">
            Nuestros Trabajos Realizados
          </h2>
          <p className="text-[#5E4758] text-sm sm:text-base">
            Fotografía documental de bodas, campañas comerciales para marcas y contenido audiovisual dinámico que conecta con la emoción y la estética.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-white p-1 rounded-2xl border border-rose-200 shadow-xs">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'grid' ? 'bg-rose-50 text-rose-700 shadow-xs' : 'text-[#7A6172] hover:text-[#33182B]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cuadrícula</span>
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'carousel' ? 'bg-rose-50 text-rose-700 shadow-xs' : 'text-[#7A6172] hover:text-[#33182B]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Carrusel</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCarouselIndex(0);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                : 'bg-white text-[#5C4054] hover:text-rose-600 border border-rose-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CAROUSEL VIEW */}
      {viewMode === 'carousel' && filteredItems.length > 0 && (
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-rose-200 group shadow-xl">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-[600px] overflow-hidden">
            <img
              src={getDirectImageUrl(filteredItems[carouselIndex].imagenUrl)}
              alt={filteredItems[carouselIndex].titulo}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 cursor-pointer"
              onClick={() => onSelectPhoto(filteredItems[carouselIndex])}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="space-y-2 max-w-2xl">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  {filteredItems[carouselIndex].categoria}
                </span>
                <h3 className="text-xl sm:text-3xl font-bold font-serif text-white drop-shadow-md">
                  {filteredItems[carouselIndex].titulo}
                </h3>
                {filteredItems[carouselIndex].descripcion && (
                  <p className="text-stone-200 text-xs sm:text-sm line-clamp-2 drop-shadow">
                    {filteredItems[carouselIndex].descripcion}
                  </p>
                )}
              </div>

              <button
                onClick={() => onSelectPhoto(filteredItems[carouselIndex])}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md border border-white/30 transition-all cursor-pointer shrink-0"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Ampliar Fotografía</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente foto"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === carouselIndex ? 'w-6 bg-rose-500' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const directImg = getDirectImageUrl(item.imagenUrl);

            return (
              <div
                key={item.id}
                onClick={() => onSelectPhoto(item)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-rose-50 border border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/70 cursor-pointer shadow-sm transition-all duration-300"
              >
                <img
                  src={directImg}
                  alt={item.titulo}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1225]/90 via-[#2D1225]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="space-y-1.5">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.categoria}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-white">
                      {item.titulo}
                    </h3>
                    {item.descripcion && (
                      <p className="text-xs text-rose-100 line-clamp-2">
                        {item.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/20 text-xs text-white/80">
                    <span>{item.fecha || 'Studio Foráneas'}</span>
                    <span className="flex items-center gap-1 text-rose-300 font-semibold">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ver en grande</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 shadow-sm">
          <p className="text-[#7A6172] text-sm">No hay fotografías disponibles en esta categoría.</p>
        </div>
      )}
    </section>
  );
};
