import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image,
  Calendar,
  Tag,
  BookOpen,
  DollarSign,
  Link2,
  Sparkles
} from 'lucide-react';
import { getDirectImageUrl } from '../../firebase/driveUtils';
import { SectionGuideModal, GuideField, GuideStep } from './SectionGuideModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminPortfolioProps {
  portfolio: PortfolioItem[];
  onSaveItem: (item: PortfolioItem) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
}

export const AdminPortfolio: React.FC<AdminPortfolioProps> = ({
  portfolio,
  onSaveItem,
  onDeleteItem
}) => {
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emptyItem: PortfolioItem = {
    id: `port-${Date.now()}`,
    titulo: '',
    descripcion: '',
    categoria: 'bodas',
    imagenUrl: '',
    fecha: new Date().toISOString().split('T')[0],
    publicado: true,
    orden: portfolio.length + 1
  };

  const handleStartEdit = (item: PortfolioItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingItem({ ...emptyItem, id: `port-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    await onSaveItem(editingItem);
    setLoading(false);
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleTogglePublish = async (item: PortfolioItem) => {
    await onSaveItem({ ...item, publicado: !item.publicado });
  };

  const guideFields: GuideField[] = [
    {
      name: 'Título de la Fotografía o Sesión',
      meaning: 'Nombre descriptivo del trabajo o campaña.',
      example: 'Campaña Joyería Luna, Boda Camila & Mateo, Colección Verano',
      required: true
    },
    {
      name: 'Categoría',
      meaning: 'Define en qué pestaña de la galería pública se mostrará la foto.',
      example: 'Bodas, Campañas / Moda, Social / Eventos, Gastronomía / Producto',
      required: true
    },
    {
      name: 'URL de Imagen (Google Drive o Directo)',
      meaning: 'El link donde está guardada tu fotografía. Puedes pegar enlaces compartidos de Google Drive o enlaces de Imgur.',
      example: 'https://drive.google.com/file/d/1A2B3C.../view?usp=sharing',
      required: true
    },
    {
      name: 'Fecha de Realización',
      meaning: 'Fecha en que se llevó a cabo la sesión o publicación.',
      example: '2025-05-15'
    },
    {
      name: 'Orden de Aparición',
      meaning: 'Controla la posición (1 para que aparezca primera en la galería, luego 2, etc.).'
    },
    {
      name: 'Interruptor de Publicado',
      meaning: 'Te permite ocultar una fotografía temporalmente sin tener que borrarla.'
    }
  ];

  const guideSteps: GuideStep[] = [
    {
      step: 1,
      title: 'Obtener el enlace de tu foto en Google Drive (Gratis)',
      instruction: 'Sube tu foto a tu cuenta de Google Drive. Haz clic derecho > Compartir > Cambia a "Cualquier persona con el enlace" y copia el link.'
    },
    {
      step: 2,
      title: 'Crear la nueva entrada en el panel',
      instruction: 'Haz clic en el botón "+ Nueva Fotografía" arriba a la derecha.'
    },
    {
      step: 3,
      title: 'Pegar el enlace y asignar datos',
      instruction: 'Pega el link de Drive en el campo "URL de Imagen". El sistema lo convertirá automáticamente en imagen visible. Completa el título y la categoría.'
    },
    {
      step: 4,
      title: 'Guardar y verificar',
      instruction: 'Haz clic en "Guardar Fotografía" y tu galería se actualizará de inmediato en el sitio web.'
    }
  ];

  const basicPlanTips = [
    'En el Plan Básico no pagas hosting de imágenes: Google Drive te ofrece 15 GB gratuitos para alojar cientos de fotos de alta resolución.',
    'Asegúrate de que el enlace de Drive tenga permisos de Lector público.',
    'Si deseas una imagen de muestra para probar, también puedes usar fotos libres de Unsplash o Pexels.'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Galería Visual</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#33182B]">
            Gestión de Portafolio Fotográfico
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4758]">
            Agrega y organiza las fotos de bodas, campañas de moda y eventos mediante enlaces de Google Drive o web.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF9FA] hover:bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Guía de Portafolio</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md shadow-rose-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Fotografía</span>
          </button>
        </div>
      </div>

      {/* Editor Form Modal */}
      {editingItem && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                {isCreating ? 'Agregar al Portafolio' : 'Modificación'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#33182B]">
                {isCreating ? 'Nueva Fotografía' : `Editar: ${editingItem.titulo}`}
              </h3>
            </div>
            <button
              onClick={() => setEditingItem(null)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 border border-rose-200"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Título de la Fotografía o Sesión *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Boda Camila & Mateo en Cieneguilla"
                  value={editingItem.titulo}
                  onChange={e => setEditingItem({ ...editingItem, titulo: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Categoría de la Galería
                </label>
                <select
                  value={editingItem.categoria}
                  onChange={e => setEditingItem({ ...editingItem, categoria: e.target.value as any })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                >
                  <option value="bodas">Bodas & Matrimonios</option>
                  <option value="moda">Campañas & Moda</option>
                  <option value="eventos">Social & Eventos</option>
                  <option value="producto">Gastronomía & Producto</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#33182B]">
                Descripción o Créditos
              </label>
              <textarea
                rows={2}
                placeholder="Detalles de la sesión, cliente o locación..."
                value={editingItem.descripcion}
                onChange={e => setEditingItem({ ...editingItem, descripcion: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#33182B]">
                URL de Imagen (Enlace Compartido de Google Drive o Link Directo) *
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/1.../view?usp=sharing"
                value={editingItem.imagenUrl}
                onChange={e => setEditingItem({ ...editingItem, imagenUrl: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
              />
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <Link2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Convertidor Automático:</strong> Pega cualquier enlace de Google Drive. El sistema lo adapta automáticamente sin costo de almacenamiento.
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Fecha
                </label>
                <input
                  type="date"
                  value={editingItem.fecha}
                  onChange={e => setEditingItem({ ...editingItem, fecha: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Posición / Orden
                </label>
                <input
                  type="number"
                  min={1}
                  value={editingItem.orden || 1}
                  onChange={e => setEditingItem({ ...editingItem, orden: parseInt(e.target.value) || 1 })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Checkbox Publicado */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#33182B]">
                <input
                  type="checkbox"
                  checked={editingItem.publicado}
                  onChange={e => setEditingItem({ ...editingItem, publicado: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Publicada en la galería visible para los clientes</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-rose-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Fotografía'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {portfolio.map((item) => {
          const directImg = getDirectImageUrl(item.imagenUrl);
          return (
            <div
              key={item.id}
              className="rounded-3xl border border-rose-100 bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
                {directImg ? (
                  <img
                    src={directImg}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                    <Image className="w-8 h-8 opacity-40" />
                    <span className="text-[11px]">Sin imagen asignada</span>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                    {item.categoria}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                    item.publicado ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-white'
                  }`}>
                    {item.publicado ? 'Visible' : 'Oculto'}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm font-serif text-[#33182B] line-clamp-1">
                    {item.titulo}
                  </h4>
                  {item.descripcion && (
                    <p className="text-xs text-[#5E4758] line-clamp-2 mt-1">
                      {item.descripcion}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-rose-100 text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Posición #{item.orden || 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      title={item.publicado ? 'Ocultar' : 'Publicar'}
                      className="p-1.5 rounded-lg text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors"
                    >
                      {item.publicado ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-neutral-400" />}
                    </button>

                    <button
                      onClick={() => handleStartEdit(item)}
                      title="Editar foto"
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setItemToDelete(item)}
                      title="Eliminar foto"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Modal */}
      <SectionGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        sectionTitle="Portafolio de Fotos • Guía de Uso"
        subtitle="Muestra tus mejores sesiones de fotos con alojamiento 100% gratuito"
        whatIsIt="Es la galería fotográfica que se muestra a los visitantes de tu sitio web, dividida por categorías (Bodas, Moda, Eventos, Gastronomía)."
        whatIsItFor="Sirve como prueba visual de la calidad de tu trabajo fotográfico y convence a clientes potenciales para contratar a Studio Foráneas."
        fields={guideFields}
        steps={guideSteps}
        basicPlanTips={basicPlanTips}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(itemToDelete)}
        title="¿Eliminar Fotografía del Portafolio?"
        message="¿Estás segura de que deseas eliminar permanentemente esta foto? Ya no se mostrará en la galería de la web."
        confirmLabel="Sí, Eliminar Foto"
        isDeleting={isDeleting}
        itemDetails={
          itemToDelete
            ? [
                { label: 'Título', value: itemToDelete.titulo },
                { label: 'Categoría', value: itemToDelete.categoria },
                { label: 'Fecha', value: itemToDelete.fecha || 'Sin fecha' }
              ]
            : undefined
        }
        onConfirm={async () => {
          if (!itemToDelete) return;
          setIsDeleting(true);
          try {
            await onDeleteItem(itemToDelete.id);
            if (editingItem && editingItem.id === itemToDelete.id) {
              setEditingItem(null);
            }
            setItemToDelete(null);
          } finally {
            setIsDeleting(false);
          }
        }}
        onClose={() => setItemToDelete(null)}
      />
    </div>
  );
};
