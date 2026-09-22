import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Sparkles, Check, ArrowRight, Star } from 'lucide-react';
import { getDirectImageUrl } from '../firebase/driveUtils';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRequestService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onRequestService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos los Servicios' },
    { id: 'redes', label: 'Redes Sociales' },
    { id: 'eventos', label: 'Eventos & Bodas' },
    { id: 'shoot', label: 'Full Day Shoot' },
  ];

  // Filter published services
  const filteredServices = services
    .filter(s => s.publicado)
    .filter(s => activeCategory === 'todos' || s.categoria === activeCategory)
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  return (
    <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
          Nuestros Servicios
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#33182B]">
          Hacemos realidad lo que necesites
        </h2>
        <p className="text-[#5E4758] text-base sm:text-lg">
          Planes flexibles pensados para negocios, marcas personales y eventos especiales. Elige el plan que mejor se adapte a tu proyecto.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-[#5C4054] hover:text-rose-600 border border-rose-200 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const directImg = getDirectImageUrl(service.imagenUrl);

          return (
            <div
              key={service.id}
              className={`group flex flex-col rounded-3xl bg-white border ${
                service.destacado ? 'border-rose-300 ring-2 ring-rose-200 shadow-xl shadow-rose-100/80' : 'border-rose-100 shadow-sm'
              } overflow-hidden hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/60 transition-all duration-300`}
            >
              {/* Media Image */}
              <div className="relative h-60 w-full overflow-hidden bg-rose-50">
                <img
                  src={directImg}
                  alt={service.nombre}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B1E32]/70 via-transparent to-transparent opacity-75" />

                {service.destacado && (
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Recomendado</span>
                  </div>
                )}

                {service.precio && (
                  <div className="absolute bottom-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-rose-200 text-xs font-bold text-rose-700 shadow-sm">
                    {service.precio}
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3.5">
                  <h3 className="text-xl font-bold font-serif text-[#33182B] group-hover:text-rose-600 transition-colors">
                    {service.nombre}
                  </h3>

                  <p className="text-[#665060] text-sm leading-relaxed line-clamp-3">
                    {service.descripcion}
                  </p>

                  {/* Included features list */}
                  {service.detallesIncluidos && service.detallesIncluidos.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-rose-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6D81] block">
                        Incluye en el servicio:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#523E4D]">
                        {service.detallesIncluidos.slice(0, 5).map((det, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                            <span>{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Request CTA Button */}
                <button
                  onClick={() => onRequestService(service.nombre)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-rose-50 hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-600 text-rose-700 hover:text-white border border-rose-200 hover:border-transparent text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Solicitar este Servicio</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Packs Reference from Canva */}
      <div className="mt-16 pt-12 border-t border-rose-100 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold font-serif text-[#33182B]">
            Estructura de Packs Mensuales para Redes Sociales
          </h3>
          <p className="text-[#665060] text-xs sm:text-sm">
            Tarifas referenciales fijas para mantener una comunicación constante, estratégica y cercana.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Pack Básico */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-rose-100 space-y-4 text-center hover:border-rose-300 shadow-sm transition-all">
            <span className="text-xs uppercase font-bold text-rose-600 tracking-wider">Pack Básico</span>
            <div className="text-3xl font-extrabold text-[#33182B] font-serif">S/. 500 <span className="text-xs font-normal text-[#8A6D81]">/ mes</span></div>
            <p className="text-xs text-[#665060]">El punto de partida para comenzar a comunicar el valor de tu marca.</p>
            <ul className="text-xs text-[#523E4D] space-y-2 text-left pt-3 border-t border-rose-100">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 1 Post o Carrusel informativo</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Reels de engagement</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 1 Reel de servicio o venta</li>
            </ul>
            <button
              onClick={() => onRequestService('Pack Básico Redes Sociales (S/. 500)')}
              className="w-full py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors"
            >
              Elegir Pack Básico
            </button>
          </div>

          {/* Pack Crecimiento */}
          <div className="rounded-3xl bg-gradient-to-b from-[#FFF2F5] to-white p-6 sm:p-7 border-2 border-rose-400 space-y-4 text-center relative shadow-xl shadow-rose-100">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Más Popular
            </div>
            <span className="text-xs uppercase font-bold text-rose-600 tracking-wider">Pack Crecimiento</span>
            <div className="text-3xl font-extrabold text-rose-700 font-serif">S/. 700 <span className="text-xs font-normal text-[#8A6D81]">/ mes</span></div>
            <p className="text-xs text-[#665060]">Mayor frecuencia para fortalecer la conexión con tu audiencia.</p>
            <ul className="text-xs text-[#523E4D] space-y-2 text-left pt-3 border-t border-rose-200">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Posts o Carruseles informativos</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Reels de engagement</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 1 Reel de servicio o venta</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 1 Bloque de Stories (3 a 4)</li>
            </ul>
            <button
              onClick={() => onRequestService('Pack Crecimiento Redes Sociales (S/. 700)')}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-xs font-bold text-white shadow-md shadow-rose-200 transition-all"
            >
              Elegir Crecimiento
            </button>
          </div>

          {/* Pack Pro */}
          <div className="rounded-3xl bg-white p-6 sm:p-7 border border-rose-100 space-y-4 text-center hover:border-rose-300 shadow-sm transition-all">
            <span className="text-xs uppercase font-bold text-rose-600 tracking-wider">Pack Pro</span>
            <div className="text-3xl font-extrabold text-[#33182B] font-serif">S/. 900 <span className="text-xs font-normal text-[#8A6D81]">/ mes</span></div>
            <p className="text-xs text-[#665060]">Una presencia más constante para impulsar la comunicación de tu marca.</p>
            <ul className="text-xs text-[#523E4D] space-y-2 text-left pt-3 border-t border-rose-100">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Posts o Carruseles informativos</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Reels de engagement</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Reels de servicio o venta</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose-600" /> 2 Bloques de Stories (6 a 8)</li>
            </ul>
            <button
              onClick={() => onRequestService('Pack Pro Redes Sociales (S/. 900)')}
              className="w-full py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors"
            >
              Elegir Pack Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
