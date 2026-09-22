import React, { useState } from 'react';
import { OfferItem } from '../types';
import { Sparkles, X, ArrowRight } from 'lucide-react';

interface OffersBannerProps {
  offers: OfferItem[];
  onRequestService: (serviceName?: string) => void;
  whatsappNumber: string;
}

export const OffersBanner: React.FC<OffersBannerProps> = ({ offers, onRequestService, whatsappNumber }) => {
  const [dismissed, setDismissed] = useState(false);

  // Filter active and unexpired offers
  const today = new Date().toISOString().split('T')[0];
  const activeOffers = offers.filter(o => {
    if (!o.activo) return false;
    if (o.fechaFin && o.fechaFin < today) return false;
    return true;
  }).sort((a, b) => (b.prioridad || 0) - (a.prioridad || 0));

  if (dismissed || activeOffers.length === 0) return null;

  const currentOffer = activeOffers[0];

  const handleClaim = () => {
    if (currentOffer.enlaceUrl) {
      window.open(currentOffer.enlaceUrl, '_blank');
      return;
    }
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    const text = encodeURIComponent(`Hola Studio Foráneas, quisiera aprovechar la promoción "${currentOffer.titulo}". ¿Podrían darme más detalles?`);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="relative bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 text-white border-b border-rose-300/30 px-4 py-2.5 z-40 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="p-1.5 rounded-full bg-white/20 text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <span className="font-bold tracking-wider text-rose-100 uppercase text-xs">
                {currentOffer.titulo}
              </span>
              {currentOffer.descuentoTexto && (
                <span className="bg-white text-rose-600 font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                  {currentOffer.descuentoTexto}
                </span>
              )}
            </div>
            <p className="text-white/90 text-xs sm:text-sm line-clamp-1 mt-0.5">
              {currentOffer.descripcion}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleClaim}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>{currentOffer.textoBoton || 'Aprovechar Oferta'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => setDismissed(true)}
            aria-label="Cerrar banner"
            className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
