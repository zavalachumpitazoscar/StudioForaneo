import React, { useState } from 'react';
import { VideoItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Film,
  ExternalLink,
  BookOpen,
  DollarSign,
  Play,
  Sparkles
} from 'lucide-react';
import { parseVideoUrl } from '../../firebase/driveUtils';
import { SectionGuideModal, GuideField, GuideStep } from './SectionGuideModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminVideosProps {
  videos: VideoItem[];
  onSaveVideo: (video: VideoItem) => Promise<void>;
  onDeleteVideo: (videoId: string) => Promise<void>;
}

export const AdminVideos: React.FC<AdminVideosProps> = ({
  videos,
  onSaveVideo,
  onDeleteVideo
}) => {
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<VideoItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emptyVideo: VideoItem = {
    id: `vid-${Date.now()}`,
    titulo: '',
    descripcion: '',
    categoria: 'reels',
    videoUrl: '',
    thumbnailUrl: '',
    publicado: true,
    orden: videos.length + 1
  };

  const handleStartEdit = (item: VideoItem) => {
    setEditingVideo({ ...item });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingVideo({ ...emptyVideo, id: `vid-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    setLoading(true);
    await onSaveVideo(editingVideo);
    setLoading(false);
    setEditingVideo(null);
    setIsCreating(false);
  };

  const handleTogglePublish = async (v: VideoItem) => {
    await onSaveVideo({ ...v, publicado: !v.publicado });
  };

  const previewParsed = editingVideo?.videoUrl ? parseVideoUrl(editingVideo.videoUrl) : null;

  const guideFields: GuideField[] = [
    {
      name: 'Título del Video',
      meaning: 'Nombre o título descriptivo del clip o proyecto.',
      example: 'Reel de Campaña Joyería, Recap Boda Cieneguilla, Spot Comercial',
      required: true
    },
    {
      name: 'Categoría',
      meaning: 'Clasifica el formato del video (Reel vertical para redes, o Video horizontal para eventos/bodas).',
      example: 'Reels / TikTok (Vertical) o Eventos & Bodas (Horizontal)',
      required: true
    },
    {
      name: 'URL del Video (100% Gratuito)',
      meaning: 'Enlace público del video en YouTube, YouTube Shorts, Vimeo o Google Drive.',
      example: 'https://youtube.com/shorts/... o https://vimeo.com/...',
      required: true
    },
    {
      name: 'Portada / Thumbnail (Opcional)',
      meaning: 'Imagen fija que se muestra antes de dar play. Si lo dejas vacío, el reproductor genera su propia portada.',
      example: 'https://drive.google.com/file/d/...'
    },
    {
      name: 'Posición / Orden',
      meaning: 'Número que define cuál video aparece primero en la página web.'
    }
  ];

  const guideSteps: GuideStep[] = [
    {
      step: 1,
      title: 'Subir tu video a YouTube o Google Drive sin costo',
      instruction: 'Sube tu video o Reel a tu canal de YouTube (puede ser Público o No listado / Oculto si no quieres que aparezca en búsquedas) o súbelo a Google Drive.'
    },
    {
      step: 2,
      title: 'Copiar el enlace del video',
      instruction: 'Copia el link del navegador o el botón Compartir de YouTube.'
    },
    {
      step: 3,
      title: 'Crear el nuevo registro en el panel',
      instruction: 'Haz clic en "+ Nuevo Video", pega el enlace y escribe el título correspondiente.'
    },
    {
      step: 4,
      title: 'Comprobar la vista previa inmediata',
      instruction: 'Verás el reproductor interactivo en pantalla confirmando que el video funciona a la perfección.'
    }
  ];

  const basicPlanTips = [
    'Alojar videos en servidores propios es muy costoso. YouTube y Vimeo ofrecen streaming en HD gratis y sin límites de ancho de banda.',
    'Si subes tus Reels como YouTube Shorts o videos en formato vertical (9:16), se reproducirán adaptados perfectamente en teléfonos móviles.',
    'Puedes activar o pausar cualquier video con el icono del ojo sin eliminar tu configuración.'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Producción Audiovisual</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#33182B]">
            Gestión de Videos & Reels
          </h2>
          <p className="text-xs sm:text-sm text-[#5E4758]">
            Conecta enlaces de YouTube, Vimeo o Google Drive para mostrar showreels y reels dinámicos sin pagar hosting.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF9FA] hover:bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Guía de Videos</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md shadow-rose-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Video</span>
          </button>
        </div>
      </div>

      {/* Editor Form Modal */}
      {editingVideo && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                {isCreating ? 'Nuevo Video' : 'Modificación'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#33182B]">
                {isCreating ? 'Agregar Video o Reel' : `Editar: ${editingVideo.titulo}`}
              </h3>
            </div>
            <button
              onClick={() => setEditingVideo(null)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 border border-rose-200"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Título del Video o Proyecto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Showreel 2025 • Producción Studio Foráneas"
                  value={editingVideo.titulo}
                  onChange={e => setEditingVideo({ ...editingVideo, titulo: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Categoría
                </label>
                <select
                  value={editingVideo.categoria}
                  onChange={e => setEditingVideo({ ...editingVideo, categoria: e.target.value as any })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                >
                  <option value="reels">Reel / Video Vertical (Instagram & TikTok)</option>
                  <option value="bodas">Bodas & Matrimonios (Cinematográfico)</option>
                  <option value="corporativo">Spot Comercial / Corporativo</option>
                  <option value="otro">Otro formato</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#33182B]">
                URL del Video (YouTube, YouTube Shorts, Vimeo o Google Drive) *
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=... o https://youtu.be/... o Google Drive"
                value={editingVideo.videoUrl}
                onChange={e => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
              />
              <span className="text-[11px] text-[#5E4758]">
                Admite enlaces regulares de YouTube, enlaces cortos de Shorts, videos de Vimeo o enlaces compartidos de Google Drive.
              </span>
            </div>

            {/* Video Interactive Preview */}
            {previewParsed && previewParsed.embedUrl && (
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 text-white">
                <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">
                  Vista Previa del Reproductor ({previewParsed.type.toUpperCase()})
                </span>
                <div className="aspect-video max-w-md mx-auto rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={previewParsed.embedUrl}
                    title="Vista previa"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#33182B]">
                  Portada / Thumbnail Personalizada (Opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... o enlace de imagen"
                  value={editingVideo.thumbnailUrl || ''}
                  onChange={e => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
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
                  value={editingVideo.orden || 1}
                  onChange={e => setEditingVideo({ ...editingVideo, orden: parseInt(e.target.value) || 1 })}
                  className="w-full p-3 rounded-xl bg-white border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#33182B]">
                <input
                  type="checkbox"
                  checked={editingVideo.publicado}
                  onChange={e => setEditingVideo({ ...editingVideo, publicado: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Publicar video en la sección audiovisual de la web</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                type="button"
                onClick={() => setEditingVideo(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-rose-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Video'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((vid) => {
          const parsed = parseVideoUrl(vid.videoUrl);
          return (
            <div
              key={vid.id}
              className="rounded-3xl border border-rose-100 bg-white overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                {parsed && parsed.embedUrl ? (
                  <iframe
                    src={parsed.embedUrl}
                    title={vid.titulo}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 gap-2">
                    <Film className="w-8 h-8 opacity-40" />
                    <span className="text-xs">Sin vista previa</span>
                  </div>
                )}

                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                    {vid.categoria}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm font-serif text-[#33182B] line-clamp-1">
                    {vid.titulo}
                  </h4>
                  {vid.descripcion && (
                    <p className="text-xs text-[#5E4758] line-clamp-2 mt-1">
                      {vid.descripcion}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-rose-100 text-xs">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    #{vid.orden || 1} • {vid.publicado ? '🟢 Visible' : '⚪ Oculto'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublish(vid)}
                      title={vid.publicado ? 'Ocultar' : 'Publicar'}
                      className="p-1.5 rounded-lg text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors"
                    >
                      {vid.publicado ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-neutral-400" />}
                    </button>

                    <button
                      onClick={() => handleStartEdit(vid)}
                      title="Editar video"
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setVideoToDelete(vid)}
                      title="Eliminar video"
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
        sectionTitle="Videos & Reels • Guía de Uso"
        subtitle="Muestra reels y spots comerciales con reproducción fluida sin gastar dinero"
        whatIsIt="Es la vitrina audiovisual donde tus clientes pueden reproducir videos de bodas, spots publicitarios y reels de redes sociales."
        whatIsItFor="Sirve para demostrar tu estilo de edición, manejo de cámaras, ritmo y dinamismo, siendo el formato más atractivo para marcas y novios."
        fields={guideFields}
        steps={guideSteps}
        basicPlanTips={basicPlanTips}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(videoToDelete)}
        title="¿Eliminar Video o Reel?"
        message="¿Estás segura de que deseas eliminar permanentemente este video? Ya no aparecerá en el catálogo ni en la web pública."
        confirmLabel="Sí, Eliminar Video"
        isDeleting={isDeleting}
        itemDetails={
          videoToDelete
            ? [
                { label: 'Título', value: videoToDelete.titulo },
                { label: 'Categoría', value: videoToDelete.categoria },
                { label: 'Orden', value: `#${videoToDelete.orden || 1}` }
              ]
            : undefined
        }
        onConfirm={async () => {
          if (!videoToDelete) return;
          setIsDeleting(true);
          try {
            await onDeleteVideo(videoToDelete.id);
            if (editingVideo && editingVideo.id === videoToDelete.id) {
              setEditingVideo(null);
            }
            setVideoToDelete(null);
          } finally {
            setIsDeleting(false);
          }
        }}
        onClose={() => setVideoToDelete(null)}
      />
    </div>
  );
};
