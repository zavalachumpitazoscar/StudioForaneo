import React from 'react';
import { Camera, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotras" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF2F5]/50 border-y border-rose-100 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
            ¿Quiénes Somos?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#33182B]">
            Unimos visión audiovisual & estrategia de ventas
          </h2>
          <p className="text-[#5E4758] text-base sm:text-lg leading-relaxed">
            Combinamos nuestras fortalezas y perspectivas para crear contenido auténtico, estratégico y cercano a las audiencias. Nuestro objetivo es ayudar a las marcas a comunicar su esencia de una manera clara, atractiva y coherente.
          </p>
        </div>

        {/* Founders / Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Nathaly Vergara */}
          <div className="relative rounded-3xl bg-white border border-rose-100 p-8 space-y-6 shadow-sm hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/70 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600 shadow-xs">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#33182B]">Nathaly Vergara</h3>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                  Comunicadora Audiovisual • PUCP
                </span>
              </div>
            </div>

            <p className="text-[#665060] text-sm sm:text-base leading-relaxed">
              Comunicadora Audiovisual por la Pontificia Universidad Católica del Perú (PUCP) con amplia experiencia en producción audiovisual, creación de contenido, manejo de redes sociales, redacción creativa, edición profesional y estrategia digital.
            </p>

            <div className="pt-4 border-t border-rose-100 flex flex-wrap gap-2 text-xs text-[#665060]">
              <span className="bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-100 font-medium">Dirección Audiovisual</span>
              <span className="bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-100 font-medium">Edición & Guiones</span>
              <span className="bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-100 font-medium">Reels Dinámicos</span>
            </div>
          </div>

          {/* Rosa Velasquez */}
          <div className="relative rounded-3xl bg-white border border-rose-100 p-8 space-y-6 shadow-sm hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/70 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0 text-pink-600 shadow-xs">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#33182B]">Rosa Velásquez</h3>
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block">
                  Gestora Empresarial y Social • PUCP
                </span>
              </div>
            </div>

            <p className="text-[#665060] text-sm sm:text-base leading-relaxed">
              Gestora empresarial y social por la Pontificia Universidad Católica del Perú (PUCP), con experiencia en el área comercial y en creación de contenido. Combina estrategias de venta con crecimiento digital para potenciar marcas y resultados reales.
            </p>

            <div className="pt-4 border-t border-rose-100 flex flex-wrap gap-2 text-xs text-[#665060]">
              <span className="bg-pink-50/80 px-3.5 py-1 rounded-full border border-pink-100 font-medium">Estrategia Comercial</span>
              <span className="bg-pink-50/80 px-3.5 py-1 rounded-full border border-pink-100 font-medium">Crecimiento Digital</span>
              <span className="bg-pink-50/80 px-3.5 py-1 rounded-full border border-pink-100 font-medium">Planificación de Ventas</span>
            </div>
          </div>
        </div>

        {/* What all our plans include & Considerations */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-rose-200 p-8 sm:p-10 space-y-6 shadow-md shadow-rose-100/50">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <h4 className="text-lg sm:text-xl font-bold font-serif text-[#33182B]">
              Todos nuestros planes de contenido para redes sociales incluyen:
            </h4>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#523E4D]">
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Planificación mensual de contenidos estratégicos</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Desarrollo de ideas y conceptos creativos</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Creación de las piezas contempladas en tu plan</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Redacción de captions persuasivos para engagement</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Programación y publicación en la red social escogida</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-rose-600 font-bold">✓</span>
              <span>Coordinación y seguimiento del calendario de contenidos</span>
            </div>
          </div>

          <div className="pt-4 border-t border-rose-100 text-xs text-[#665060] leading-relaxed">
            <strong className="text-[#33182B]">Consideraciones importantes:</strong> Las locaciones, desplazamientos o modelos especiales se coordinan previamente. Cualquier pieza o contenido adicional podrá ser cotizado por separado a la medida de tus necesidades.
          </div>
        </div>
      </div>
    </section>
  );
};
