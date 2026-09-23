import React from 'react';
import { PortfolioItem } from '../types';
import { X, Calendar, ExternalLink } from 'lucide-react';
import { getDirectImageUrl } from '../firebase/driveUtils';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const directImg = getDirectImageUrl(item.imagenUrl);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden"
      >
        {/* Top bar with close button */}
        <div className="p-4 px-6 border-b border-purple-100 flex items-center justify-between bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider">
              {item.categoria}
            </span>
            <span className="text-xs text-purple-800 font-semibold hidden sm:inline">
              Studio Foráneas • Fotografía
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={item.imagenUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full text-[#6B5365] hover:text-purple-700 hover:bg-purple-100 transition-colors"
              title="Abrir imagen original"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-2 rounded-full text-[#6B5365] hover:text-[#241235] hover:bg-purple-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-res Image container */}
        <div className="flex-1 min-h-[300px] max-h-[68vh] overflow-hidden bg-stone-950 flex items-center justify-center p-2">
          <img
            src={directImg}
            alt={item.titulo}
            className="max-h-full max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Bottom Details Bar */}
        <div className="p-5 px-6 border-t border-purple-100 bg-[#FAF8FD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <h4 className="text-base font-bold font-serif text-[#241235]">
              {item.titulo}
            </h4>
            {item.descripcion && (
              <p className="text-[#665060] text-xs leading-relaxed max-w-2xl">
                {item.descripcion}
              </p>
            )}
          </div>

          {item.fecha && (
            <div className="flex items-center gap-1.5 text-[#8A6D81] shrink-0 font-medium">
              <Calendar className="w-3.5 h-3.5 text-purple-700" />
              <span>{item.fecha}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
