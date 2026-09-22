import React, { useState } from 'react';
import { OfferItem } from '../../types';
import { Plus, Edit2, Trash2, Tag, Calendar, Sparkles, Check, X } from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminOffersProps {
  offers: OfferItem[];
  onSaveOffer: (offer: OfferItem) => Promise<void>;
  onDeleteOffer: (offerId: string) => Promise<void>;
}

export const AdminOffers: React.FC<AdminOffersProps> = ({
  offers,
  onSaveOffer,
  onDeleteOffer
}) => {
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Deletion state
  const [offerToDelete, setOfferToDelete] = useState<OfferItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emptyOffer: OfferItem = {
    id: `promo-${Date.now()}`,
    titulo: '',
    descripcion: '',
    descuentoTexto: '20% OFF',
    imagenUrl: '',
    textoBoton: 'Aprovechar Oferta',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: '2026-12-31',
    activo: true,
    prioridad: 1
  };

  const handleStartEdit = (item: OfferItem) => {
    setEditingOffer({ ...item });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingOffer({ ...emptyOffer, id: `promo-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    setLoading(true);
    await onSaveOffer(editingOffer);
    setLoading(false);
    setEditingOffer(null);
    setIsCreating(false);
  };

  const handleToggleActive = async (o: OfferItem) => {
    await onSaveOffer({ ...o, activo: !o.activo });
  };

  const handleConfirmDelete = async () => {
    if (!offerToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteOffer(offerToDelete.id);
      if (editingOffer && editingOffer.id === offerToDelete.id) {
        setEditingOffer(null);
      }
      setOfferToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Descuentos y Banners</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#3B1E32]">
            Gestión de Promociones & Ofertas
          </h2>
          <p className="text-xs text-[#5C4054]">
            Configura descuentos de temporada, promociones de bodas y banners no invasivos para la web.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold tracking-wide transition-all cursor-pointer shadow-md shadow-rose-200 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Promoción</span>
        </button>
      </div>

      {/* Editor Form */}
      {editingOffer && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                {isCreating ? 'Crear Promoción' : 'Modificación'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#3B1E32]">
                {isCreating ? 'Nueva Oferta de Temporada' : `Editar: ${editingOffer.titulo}`}
              </h3>
            </div>
            <button
              onClick={() => setEditingOffer(null)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-[#5C4054] hover:text-[#3B1E32] hover:bg-rose-50 border border-rose-200"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Título de la Oferta *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Promoción de Bodas & Eventos"
                  value={editingOffer.titulo}
                  onChange={e => setEditingOffer({ ...editingOffer, titulo: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Etiqueta de Descuento (Badge)
                </label>
                <input
                  type="text"
                  placeholder="Ej. 20% OFF, 2x1, ESPECIAL"
                  value={editingOffer.descuentoTexto || ''}
                  onChange={e => setEditingOffer({ ...editingOffer, descuentoTexto: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Descripción o Beneficios *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explica qué incluye la promoción, condiciones o paquetes participantes..."
                value={editingOffer.descripcion}
                onChange={e => setEditingOffer({ ...editingOffer, descripcion: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Texto del Botón CTA
                </label>
                <input
                  type="text"
                  placeholder="Aprovechar Descuento"
                  value={editingOffer.textoBoton || ''}
                  onChange={e => setEditingOffer({ ...editingOffer, textoBoton: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Enlace externo (opcional - por defecto abre WhatsApp)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingOffer.enlaceUrl || ''}
                  onChange={e => setEditingOffer({ ...editingOffer, enlaceUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={editingOffer.fechaInicio || ''}
                  onChange={e => setEditingOffer({ ...editingOffer, fechaInicio: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Fecha de Fin
                </label>
                <input
                  type="date"
                  value={editingOffer.fechaFin || ''}
                  onChange={e => setEditingOffer({ ...editingOffer, fechaFin: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <label className="flex items-center gap-2 text-xs font-bold text-[#3B1E32] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingOffer.activo}
                    onChange={e => setEditingOffer({ ...editingOffer, activo: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <span>Promoción Activa en la Web</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-rose-100">
              <button
                type="button"
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-[#3B1E32] text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold tracking-wider shadow-md shadow-rose-200 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Guardando...' : 'Guardar Promoción'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Offers List */}
      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-100 hover:border-rose-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-base font-serif text-[#3B1E32]">
                  {offer.titulo}
                </span>
                {offer.descuentoTexto && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wide">
                    {offer.descuentoTexto}
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  offer.activo
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-stone-100 text-stone-600 border-stone-200'
                }`}>
                  {offer.activo ? 'ACTIVA' : 'INACTIVA'}
                </span>
              </div>

              <p className="text-xs text-[#5C4054] leading-relaxed">
                {offer.descripcion}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6E4965]">
                <span>📅 Vigencia: {offer.fechaInicio || 'Indefinida'} hasta {offer.fechaFin || 'Indefinida'}</span>
                <span>🔘 Botón: "{offer.textoBoton || 'Aprovechar'}"</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleActive(offer)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  offer.activo
                    ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {offer.activo ? 'Desactivar' : 'Activar'}
              </button>

              <button
                onClick={() => handleStartEdit(offer)}
                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setOfferToDelete(offer)}
                className="p-2.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                title="Eliminar promoción"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {offers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 shadow-sm p-8 space-y-2">
            <Sparkles className="w-10 h-10 text-rose-300 mx-auto" />
            <h4 className="text-sm font-bold text-[#3B1E32]">No hay promociones registradas</h4>
            <p className="text-[#5C4054] text-xs">
              Crea tu primera promoción o descuento para incentivar reservas de paquetes.
            </p>
          </div>
        )}
      </div>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={Boolean(offerToDelete)}
        title="¿Eliminar Promoción u Oferta?"
        message="¿Estás segura de que deseas eliminar permanentemente esta promoción? Esta acción no se puede deshacer."
        confirmLabel="Sí, Eliminar Promoción"
        isDeleting={isDeleting}
        itemDetails={
          offerToDelete
            ? [
                { label: 'Promoción', value: offerToDelete.titulo },
                { label: 'Descuento', value: offerToDelete.descuentoTexto || 'General' },
                { label: 'Vigencia', value: `${offerToDelete.fechaInicio || 'Inicio'} al ${offerToDelete.fechaFin || 'Fin'}` }
              ]
            : undefined
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setOfferToDelete(null)}
      />
    </div>
  );
};
