import React from 'react';
import { Camera, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';
import { getDirectImageUrl } from '../firebase/driveUtils';

interface AboutSectionProps {
  config: SiteConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  // Parse tags for each founder
  const tagsFounder1 = (config.fundadora1Tags || 'Dirección Audiovisual, Edición & Guiones, Reels Dinámicos')
    .split(/[,;\n]/)
    .map(t => t.trim())
    .filter(Boolean);

  const tagsFounder2 = (config.fundadora2Tags || 'Estrategia Comercial, Crecimiento Digital, Planificación de Ventas')
    .split(/[,;\n]/)
    .map(t => t.trim())
    .filter(Boolean);

  // Parse included benefits list
  const defaultBenefits = [
    'Planificación mensual de contenidos estratégicos',
    'Desarrollo de ideas y conceptos creativos',
    'Creación de las piezas contempladas en tu plan',
    'Redacción de captions persuasivos para engagement',
    'Programación y publicación en la red social escogida',
    'Coordinación y seguimiento del calendario de contenidos'
  ];

  const benefitsList = config.beneficiosLista
    ? config.beneficiosLista.split('\n').map(b => b.trim()).filter(Boolean)
    : defaultBenefits;

  return (
    <section id="nosotras" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF8FC] via-[#F5F1FD]/70 to-[#FAF8FC] border-y border-purple-100/80 relative overflow-hidden">
      {/* Decorative Brand Circles & Flow Curves Inspired by Palette */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{config.quienesSomosBadge || '¿Quiénes Somos?'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#241235] tracking-tight">
            {config.quienesSomosTitulo || 'Unimos visión audiovisual & estrategia de ventas'}
          </h2>

          <p className="text-[#554064] text-base sm:text-lg leading-relaxed font-normal">
            {config.quienesSomosDescripcion || 'Combinamos nuestras fortalezas y perspectivas para crear contenido auténtico, estratégico y cercano a las audiencias. Nuestro objetivo es ayudar a las marcas a comunicar su esencia de una manera clara, atractiva y coherente.'}
          </p>
        </div>

        {/* Founders / Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Founder 1: Nathaly Vergara - Comunicadora Audiovisual */}
          <div className="relative rounded-3xl bg-white/95 border border-purple-100 p-8 sm:p-9 space-y-6 shadow-sm hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                {config.fundadora1Foto ? (
                  <img
                    src={getDirectImageUrl(config.fundadora1Foto)}
                    alt={config.fundadora1Nombre || 'Comunicadora Audiovisual'}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 text-purple-700 shadow-2xs">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#241235]">
                    {config.fundadora1Nombre || 'Nathaly Vergara'}
                  </h3>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mt-0.5">
                    {config.fundadora1Cargo || 'Comunicadora Audiovisual • PUCP'}
                  </span>
                </div>
              </div>

              <p className="text-[#523E60] text-sm sm:text-base leading-relaxed">
                {config.fundadora1Bio || 'Comunicadora Audiovisual por la Pontificia Universidad Católica del Perú (PUCP) con amplia experiencia en producción audiovisual, creación de contenido, manejo de redes sociales, redacción creativa, edición profesional y estrategia digital.'}
              </p>
            </div>

            <div className="pt-5 border-t border-purple-50 flex flex-wrap gap-2 text-xs">
              {tagsFounder1.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-purple-50 text-purple-800 px-3.5 py-1 rounded-full border border-purple-200/80 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Founder 2: Rosa Velásquez - Gestora Empresarial */}
          <div className="relative rounded-3xl bg-white/95 border border-lime-200/80 p-8 sm:p-9 space-y-6 shadow-sm hover:border-lime-400 hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                {config.fundadora2Foto ? (
                  <img
                    src={getDirectImageUrl(config.fundadora2Foto)}
                    alt={config.fundadora2Nombre || 'Gestora Empresarial'}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-lime-300 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-lime-100/90 border border-lime-300 flex items-center justify-center shrink-0 text-lime-800 shadow-2xs">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#241235]">
                    {config.fundadora2Nombre || 'Rosa Velásquez'}
                  </h3>
                  <span className="text-xs font-bold text-lime-800 uppercase tracking-wider block mt-0.5">
                    {config.fundadora2Cargo || 'Gestora Empresarial y Social • PUCP'}
                  </span>
                </div>
              </div>

              <p className="text-[#523E60] text-sm sm:text-base leading-relaxed">
                {config.fundadora2Bio || 'Gestora empresarial y social por la Pontificia Universidad Católica del Perú (PUCP), con experiencia en el área comercial y en creación de contenido. Combina estrategias de venta con crecimiento digital para potenciar marcas y resultados reales.'}
              </p>
            </div>

            <div className="pt-5 border-t border-lime-100 flex flex-wrap gap-2 text-xs">
              {tagsFounder2.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-lime-50 text-lime-900 px-3.5 py-1 rounded-full border border-lime-200 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* What all our plans include & Considerations */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-purple-200/90 p-8 sm:p-10 space-y-6 shadow-lg shadow-purple-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-200/40 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-700 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-lime-700" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-serif text-[#241235]">
              {config.beneficiosTitulo || 'Todos nuestros planes de contenido para redes sociales incluyen:'}
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#483355] relative z-10">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-lime-600 font-bold text-base leading-none mt-0.5">✓</span>
                <span className="leading-snug">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-purple-100/80 text-xs text-[#5E4770] leading-relaxed relative z-10">
            <strong className="text-[#241235] font-semibold">Consideraciones importantes: </strong>
            {config.consideracionesTexto || 'Las locaciones, desplazamientos o modelos especiales se coordinan previamente. Cualquier pieza o contenido adicional podrá ser cotizado por separado a la medida de tus necesidades.'}
          </div>
        </div>
      </div>
    </section>
  );
};
