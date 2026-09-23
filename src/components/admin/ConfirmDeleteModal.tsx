import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

interface DetailItem {
  label: string;
  value: string;
}

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemDetails?: DetailItem[];
  confirmLabel?: string;
  isDeleting?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  message,
  itemDetails,
  confirmLabel = 'Sí, Eliminar Definitivamente',
  isDeleting = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241235]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-purple-100 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5 text-left animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-[#241235] hover:bg-purple-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon & Title */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-[#241235]">
              {title}
            </h3>
            <p className="text-xs text-[#554064] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Optional Context Details */}
        {itemDetails && itemDetails.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-purple-100/90 space-y-1.5 text-xs">
            {itemDetails.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center gap-2">
                <span className="text-[#6E4965] font-semibold">{item.label}:</span>
                <span className="font-bold text-[#241235] truncate max-w-[240px]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 leading-snug">
          ⚠️ <strong>Atención:</strong> Esta acción no se puede deshacer y el registro se eliminará permanentemente.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#241235] text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>{confirmLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
