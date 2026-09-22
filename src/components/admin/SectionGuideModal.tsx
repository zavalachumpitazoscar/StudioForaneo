import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2, HelpCircle, Lightbulb, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export interface GuideField {
  name: string;
  meaning: string;
  example?: string;
  required?: boolean;
}

export interface GuideStep {
  step: number;
  title: string;
  instruction: string;
}

export interface SectionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionTitle: string;
  subtitle: string;
  whatIsIt: string;
  whatIsItFor: string;
  fields: GuideField[];
  steps: GuideStep[];
  basicPlanTips: string[];
}

export const SectionGuideModal: React.FC<SectionGuideModalProps> = ({
  isOpen,
  onClose,
  sectionTitle,
  subtitle,
  whatIsIt,
  whatIsItFor,
  fields,
  steps,
  basicPlanTips
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl border border-rose-200 shadow-2xl shadow-rose-950/15 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F3] border-b border-rose-100 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-rose-600" />
              <span>Manual Paso a Paso</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#33182B]">
              {sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E4758]">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-rose-100/50 transition-colors"
            title="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-[#33182B] text-sm">
          {/* Plan Básico Notice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <DollarSign className="w-4 h-4 font-bold" />
            </div>
            <div className="space-y-1">
              <span className="block font-bold text-xs uppercase tracking-wider text-amber-800">
                100% Funcional en el Plan Básico Gratuito
              </span>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Esta sección está diseñada para funcionar sin ningún gasto adicional ni servidores de pago. Todo se guarda de forma segura y puedes enlazar tus fotos y videos desde servicios gratuitos (Google Drive, YouTube, Unsplash, Imgur, etc.).
              </p>
            </div>
          </div>

          {/* ¿Qué es y Para qué sirve? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wide">
                <HelpCircle className="w-4 h-4" />
                <span>¿Qué es esta sección?</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                {whatIsIt}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
              <div className="flex items-center gap-2 text-pink-700 font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>¿Para qué sirve?</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                {whatIsItFor}
              </p>
            </div>
          </div>

          {/* Paso a paso */}
          <div className="space-y-3">
            <h3 className="font-bold text-base font-serif text-[#33182B] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Paso a paso: ¿Cómo realizar cada acción?</span>
            </h3>

            <div className="space-y-2.5">
              {steps.map((st) => (
                <div 
                  key={st.step}
                  className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100/90 flex items-start gap-3 hover:border-rose-300 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {st.step}
                  </span>
                  <div className="space-y-0.5">
                    <span className="block font-bold text-xs text-[#33182B]">
                      {st.title}
                    </span>
                    <p className="text-xs text-[#5E4758] leading-relaxed">
                      {st.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ¿Qué significa cada campo? */}
          <div className="space-y-3">
            <h3 className="font-bold text-base font-serif text-[#33182B] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>¿Qué significa cada campo del formulario?</span>
            </h3>

            <div className="divide-y divide-rose-100 rounded-2xl border border-rose-100 overflow-hidden bg-white">
              {fields.map((f, idx) => (
                <div key={idx} className="p-3.5 hover:bg-rose-50/30 transition-colors flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <div className="sm:w-1/3 shrink-0">
                    <span className="font-bold text-xs text-rose-700 flex items-center gap-1.5">
                      {f.name}
                      {f.required && (
                        <span className="text-[10px] text-rose-500 font-semibold">(Obligatorio)</span>
                      )}
                    </span>
                  </div>
                  <div className="sm:w-2/3 space-y-1">
                    <p className="text-xs text-[#5E4758]">
                      {f.meaning}
                    </p>
                    {f.example && (
                      <p className="text-[11px] text-neutral-400 font-mono italic">
                        Ejemplo: {f.example}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consejos del Plan Básico */}
          {basicPlanTips.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Consejos Prácticos para el Plan Gratuito</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-900/90 pl-5 list-disc">
                {basicPlanTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FFF9FA] border-t border-rose-100 flex items-center justify-between">
          <span className="text-xs text-neutral-400 italic">
            Studio Foráneas • Documentación Interna
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-rose-200 transition-all cursor-pointer"
          >
            Entendido, volver a la sección
          </button>
        </div>
      </div>
    </div>
  );
};
