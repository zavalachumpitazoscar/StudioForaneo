import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  Image,
  ArrowUpDown,
  BookOpen,
  DollarSign,
  HelpCircle,
  Link2
} from 'lucide-react';
import { getDirectImageUrl } from '../../firebase/driveUtils';
import { SectionGuideModal, GuideField, GuideStep } from './SectionGuideModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminServicesProps {
  services: ServiceItem[];
  onSaveService: (service: ServiceItem) => Promise<void>;
  onDeleteService: (serviceId: string) => Promise<void>;
}

export const AdminServices: React.FC<AdminServicesProps> = ({
  services,
  onSaveService,
  onDeleteService
}) => {
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detallesInput, setDetallesInput] = useState<string>('');
  const [guideOpen, setGuideOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emptyService: ServiceItem = {
    id: `serv-${Date.now()}`,
    nombre: '',
    categoria: 'redes',
    descripcion: '',
    detallesIncluidos: [],
    precio: '',
    precioNumero: 500,
    imagenUrl: '',
    destacado: false,
    publicado: true,
    orden: services.length + 1
  };

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingService({ ...srv });
    setDetallesInput((srv.detallesIncluidos || []).join('\n'));
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingService({ ...emptyService, id: `serv-${Date.now()}` });
    setDetallesInput('');
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    // Parse newline-separated details into string array
    const detailsArray = detallesInput
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    const payload: ServiceItem = {
      ...editingService,
      detallesIncluidos: detailsArray
    };

    await onSaveService(payload);
    setLoading(false);
    setEditingService(null);
    setIsCreating(false);
  };

  const handleTogglePublish = async (srv: ServiceItem) => {
    await onSaveService({ ...srv, publicado: !srv.publicado });
  };

  const handleToggleFeatured = async (srv: ServiceItem) => {
    await onSaveService({ ...srv, destacado: !srv.destacado });
  };

  const guideFields: GuideField[] = [
    {
      name: 'Nombre del Servicio',
      meaning: 'El título principal del paquete que leerá el cliente en la tarjeta.',
      example: 'Pack Reels Mensuales, Cobertura Bodas en Tiempo Real',
      required: true
    },
    {
      name: 'Categoría',
      meaning: 'Determina en qué pestaña de filtro de la página web aparecerá.',
      example: 'Redes Sociales, Eventos & Bodas, Full Day Shoot',
      required: true
    },
    {
      name: 'Descripción Comercial',
      meaning: 'Párrafo breve explicando a quién está dirigido y el valor de contratarlo.',
      example: 'Pensado para marcas que buscan viralidad y contenido dinámico constante.'
    },
    {
      name: 'Qué incluye (Checklist)',
      meaning: 'Lista de entregables. Cada línea que escribas se convierte en un check verde en la web.',
      example: '4 Reels mensuales\nGrabación con luces profesionales\nEdición con subtítulos dinámicos'
    },
    {
      name: 'Precio Visible (Texto)',
      meaning: 'Lo que ve el cliente en grande en la tarjeta.',
      example: 'S/ 650 / mes, S/ 1,200 por evento, A cotizar',
      required: true
    },
    {
      name: 'URL de la Foto / Portada',
      meaning: 'Enlace de la imagen. ¡Puedes pegar enlaces compartidos de Google Drive y el sistema los convierte automáticamente!',
      example: 'https://drive.google.com/file/d/... o https://images.unsplash.com/...'
    },
    {
      name: 'Destacado ("Más Popular")',
      meaning: 'Si lo activas, tendrá un borde rosa/dorado brillante y la etiqueta de Más Popular para captar más ventas.'
    },
    {
      name: 'Orden de Visualización',
      meaning: 'Número que indica la posición de la tarjeta (1 aparece de primero, luego 2, etc.).'
    }
  ];

  const guideSteps: GuideStep[] = [
    {
      step: 1,
      title: 'Crear un nuevo servicio',
      instruction: 'Haz clic en el botón "+ Nuevo Servicio" arriba a la derecha. Se abrirá el formulario.'
    },
    {
      step: 2,
      title: 'Completar los datos principales',
      instruction: 'Escribe el nombre del paquete, elige la categoría y coloca el precio que deseas mostrar.'
    },
    {
      step: 3,
      title: 'Agregar la lista de lo que incluye',
      instruction: 'En el campo "Qué incluye", escribe cada beneficio en una línea separada presionando ENTER.'
    },
    {
      step: 4,
      title: 'Asignar una portada sin gastar dinero',
      instruction: 'Sube tu foto a Google Drive, dale permisos de "Cualquier persona con el enlace", copia el link y pégalo aquí. ¡Es 100% gratis!'
    },
    {
      step: 5,
      title: 'Guardar y verificar en el sitio web',
      instruction: 'Haz clic en "Guardar Servicio" y listo. Puedes pulsar "Ver Sitio Web" arriba para comprobar cómo quedó.'
    }
  ];

  const basicPlanTips = [
    'No necesitas pagar servidores de almacenamiento para las fotos de portada: Google Drive es 100% gratuito y compatible.',
    'Si un servicio es de temporada (ej. Especial San Valentín), no necesitas borrarlo: solo desactiva la casilla "Publicado" para ocultarlo temporalmente.',
    'Los clientes que hagan clic en "Solicitar Este Plan" en tu web llenarán un formulario que llegará directo a la pestaña "Solicitudes".'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Catálogo Público</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#33182B]">
            Gestión de Servicios & Tarifas
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4758]">
            Crea, edita y organiza los packs de contenido para redes, eventos y shoot.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF9FA] hover:bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Guía de Servicios</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md shadow-rose-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Servicio</span>
          </button>
        </div>
      </div>

      {/* Edit / Create Form Modal */}
      {editingService && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                {isCreating ? 'Creación de Paquete' : 'Modificación'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#33182B]">
                {isCreating ? 'Agregar Nuevo Servicio' : `Editar: ${editingService.nombre}`}
              </h3>
            </div>
            <button
              onClick={() => setEditingService(null)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 border border-rose-200"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Nombre del Servicio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cobertura de Bodas en Tiempo Real"
                  value={editingService.nombre}
                  onChange={e => setEditingService({ ...editingService, nombre: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:ring-1 focus:ring-rose-200 focus:outline-none"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Categoría
                </label>
                <select
                  value={editingService.categoria}
                  onChange={e => setEditingService({ ...editingService, categoria: e.target.value as any })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                >
                  <option value="redes">Redes Sociales (Mensual)</option>
                  <option value="eventos">Eventos & Bodas</option>
                  <option value="shoot">Full Day Shoot</option>
                  <option value="otro">Personalizado / Otro</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#33182B]">
                Descripción Comercial
              </label>
              <textarea
                rows={3}
                placeholder="Breve descripción del alcance, objetivo y beneficios del servicio para el cliente..."
                value={editingService.descripcion}
                onChange={e => setEditingService({ ...editingService, descripcion: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none resize-none"
              />
            </div>

            {/* Detalles Incluidos (checklist) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#33182B]">
                Qué incluye el servicio (Escribe cada beneficio en una línea nueva con ENTER)
              </label>
              <textarea
                rows={4}
                placeholder="Planificación mensual de contenidos&#10;4 Reels de alto impacto con audio tendencia&#10;Sesión de fotos de producto&#10;Luces y micrófonos profesionales"
                value={detallesInput}
                onChange={e => setDetallesInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none font-mono text-[11px]"
              />
              <span className="text-[11px] text-[#5E4758]">
                Cada línea se convertirá en un check verde en la tarjeta de precios de la web.
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Tarifa Texto */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Precio Visible (Texto) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. S/ 650 / mes o A cotizar"
                  value={editingService.precio}
                  onChange={e => setEditingService({ ...editingService, precio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              {/* Orden */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Posición / Orden
                </label>
                <input
                  type="number"
                  min={1}
                  value={editingService.orden || 1}
                  onChange={e => setEditingService({ ...editingService, orden: parseInt(e.target.value) || 1 })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              {/* Imagen URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  URL de Imagen / Google Drive
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... o enlace directo"
                  value={editingService.imagenUrl || ''}
                  onChange={e => setEditingService({ ...editingService, imagenUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Google Drive Tip Banner */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Plan Básico 100% Gratuito:</strong> Puedes pegar enlaces de Google Drive directamente. Asegúrate de poner el archivo como "Cualquier persona con el enlace (Lector)".
              </span>
            </div>

            {/* Checkboxes: Destacado & Publicado */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#33182B]">
                <input
                  type="checkbox"
                  checked={editingService.destacado}
                  onChange={e => setEditingService({ ...editingService, destacado: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Destacar como "Más Popular" (Borde brillante)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#33182B]">
                <input
                  type="checkbox"
                  checked={editingService.publicado}
                  onChange={e => setEditingService({ ...editingService, publicado: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Publicado inmediatamente en el sitio web</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-rose-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Servicio'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`rounded-3xl border bg-white p-6 flex flex-col justify-between transition-all shadow-sm ${
              srv.destacado ? 'border-rose-300 ring-2 ring-rose-200' : 'border-rose-100 hover:border-rose-200'
            }`}
          >
            <div className="space-y-4">
              {/* Badges row */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {srv.categoria === 'redes' ? 'Redes Sociales' : srv.categoria === 'eventos' ? 'Eventos & Bodas' : 'Full Day Shoot'}
                </span>

                <div className="flex items-center gap-1.5">
                  {srv.destacado && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Destacado</span>
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    srv.publicado ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}>
                    {srv.publicado ? 'Público' : 'Oculto'}
                  </span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h4 className="text-lg font-bold font-serif text-[#33182B]">
                  {srv.nombre}
                </h4>
                <p className="text-xl font-extrabold text-rose-600 font-serif mt-1">
                  {srv.precio}
                </p>
                {srv.descripcion && (
                  <p className="text-xs text-[#5E4758] mt-2 line-clamp-2">
                    {srv.descripcion}
                  </p>
                )}
              </div>

              {/* Details list */}
              {srv.detallesIncluidos && srv.detallesIncluidos.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-rose-100">
                  <span className="text-[11px] font-bold text-[#33182B] block">Incluye:</span>
                  <ul className="space-y-1 text-xs text-[#5E4758]">
                    {srv.detallesIncluidos.slice(0, 4).map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{d}</span>
                      </li>
                    ))}
                    {srv.detallesIncluidos.length > 4 && (
                      <li className="text-[11px] text-rose-600 italic">
                        +{srv.detallesIncluidos.length - 4} detalles adicionales
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-rose-100">
              <span className="text-[11px] text-neutral-400 font-mono">
                Orden: #{srv.orden || 1}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleToggleFeatured(srv)}
                  title={srv.destacado ? 'Quitar destacado' : 'Marcar como más popular'}
                  className={`p-2 rounded-xl transition-colors ${
                    srv.destacado ? 'bg-amber-100 text-amber-700' : 'text-[#5E4758] hover:bg-rose-50'
                  }`}
                >
                  <Star className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleTogglePublish(srv)}
                  title={srv.publicado ? 'Ocultar servicio' : 'Publicar servicio'}
                  className="p-2 rounded-xl text-[#5E4758] hover:bg-rose-50 hover:text-[#33182B] transition-colors"
                >
                  {srv.publicado ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-neutral-400" />}
                </button>

                <button
                  onClick={() => handleStartEdit(srv)}
                  title="Editar este servicio"
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setServiceToDelete(srv)}
                  title="Eliminar servicio"
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Modal */}
      <SectionGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        sectionTitle="Servicios & Packs • Guía de Uso"
        subtitle="Administra los precios, paquetes y beneficios que ven tus clientes"
        whatIsIt="Aquí configuras todos los paquetes de contenido y servicios audiovisuales que Studio Foráneas ofrece al público."
        whatIsItFor="Sirve para que los clientes conozcan tus opciones, tarifas y qué incluye cada pack, permitiéndoles solicitar cotizaciones directamente desde la web."
        fields={guideFields}
        steps={guideSteps}
        basicPlanTips={basicPlanTips}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(serviceToDelete)}
        title="¿Eliminar Servicio o Pack?"
        message="¿Estás segura de que deseas eliminar permanentemente este servicio? Desaparecerá inmediatamente del catálogo público."
        confirmLabel="Sí, Eliminar Servicio"
        isDeleting={isDeleting}
        itemDetails={
          serviceToDelete
            ? [
                { label: 'Servicio', value: serviceToDelete.nombre },
                { label: 'Categoría', value: serviceToDelete.categoria },
                { label: 'Precio', value: serviceToDelete.precio || 'A convenir' }
              ]
            : undefined
        }
        onConfirm={async () => {
          if (!serviceToDelete) return;
          setIsDeleting(true);
          try {
            await onDeleteService(serviceToDelete.id);
            if (editingService && editingService.id === serviceToDelete.id) {
              setEditingService(null);
            }
            setServiceToDelete(null);
          } finally {
            setIsDeleting(false);
          }
        }}
        onClose={() => setServiceToDelete(null)}
      />
    </div>
  );
};
