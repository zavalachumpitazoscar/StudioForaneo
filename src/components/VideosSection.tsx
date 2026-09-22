import React, { useState } from 'react';
import { VideoItem } from '../types';
import { Play, ExternalLink, Film, X } from 'lucide-react';
import { parseVideoUrl, getDirectImageUrl } from '../firebase/driveUtils';

interface VideosSectionProps {
  videos: VideoItem[];
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const publishedVideos = videos
    .filter(v => v.publicado)
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  if (publishedVideos.length === 0) return null;

  const parsedSelected = selectedVideo ? parseVideoUrl(selectedVideo.videoUrl) : null;

  return (
    <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
          Producción en Movimiento
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#33182B]">
          Videos, Reels & Coberturas
        </h2>
        <p className="text-[#5E4758] text-sm sm:text-base">
          Showreels cinematográficos, resúmenes dinámicos para redes sociales y filmación documental con edición profesional y etalonaje de color.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {publishedVideos.map((item) => {
          const parsed = parseVideoUrl(item.videoUrl);
          const thumb = item.thumbnailUrl
            ? getDirectImageUrl(item.thumbnailUrl)
            : 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop';

          return (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border border-rose-100 overflow-hidden hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/70 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              {/* Media Player or Thumbnail with Play Trigger */}
              <div className="relative aspect-video w-full bg-stone-900 overflow-hidden">
                {parsed.type === 'youtube' && parsed.embedUrl ? (
                  <iframe
                    src={parsed.embedUrl}
                    title={item.titulo}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : parsed.type === 'drive' && parsed.embedUrl ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={parsed.embedUrl}
                      title={item.titulo}
                      className="w-full h-full border-0"
                      allow="autoplay"
                    />
                    <div className="absolute top-2 right-2">
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-stone-800 text-[11px] font-semibold backdrop-blur-sm shadow-sm transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Abrir en Drive</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setSelectedVideo(item)}
                    className="relative w-full h-full cursor-pointer group"
                  >
                    <img
                      src={thumb}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-rose-600/90 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-200 transform group-hover:scale-110 transition-all duration-200">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6 sm:p-7 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                    {item.categoria}
                  </span>
                  <span className="text-[11px] text-[#8A6D81] uppercase tracking-widest font-semibold">
                    {parsed.type === 'youtube' ? 'YouTube' : parsed.type === 'drive' ? 'Google Drive' : 'Video'}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#33182B] group-hover:text-rose-600 transition-colors">
                  {item.titulo}
                </h3>

                {item.descripcion && (
                  <p className="text-xs sm:text-sm text-[#665060] leading-relaxed line-clamp-2">
                    {item.descripcion}
                  </p>
                )}

                <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedVideo(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-500 cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Ver en pantalla completa</span>
                  </button>

                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8A6D81] hover:text-rose-600 text-xs inline-flex items-center gap-1 font-medium transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Enlace original</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Video Modal */}
      {selectedVideo && parsedSelected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-rose-200 overflow-hidden shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-rose-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#33182B]">
                  {selectedVideo.titulo}
                </h3>
                <span className="text-xs text-rose-600 font-semibold">
                  {selectedVideo.categoria} • Studio Foráneas
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Cerrar reproductor"
                className="p-2 rounded-full bg-rose-50 text-[#5C4054] hover:text-[#33182B] hover:bg-rose-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video w-full bg-stone-900">
              {parsedSelected.type === 'youtube' && parsedSelected.embedUrl ? (
                <iframe
                  src={`${parsedSelected.embedUrl}&autoplay=1`}
                  title={selectedVideo.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : parsedSelected.type === 'drive' && parsedSelected.embedUrl ? (
                <iframe
                  src={parsedSelected.embedUrl}
                  title={selectedVideo.titulo}
                  className="w-full h-full border-0"
                  allow="autoplay"
                />
              ) : parsedSelected.type === 'vimeo' && parsedSelected.embedUrl ? (
                <iframe
                  src={parsedSelected.embedUrl}
                  title={selectedVideo.titulo}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : parsedSelected.type === 'direct' ? (
                <video src={parsedSelected.originalUrl} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <Film className="w-12 h-12 text-rose-500" />
                  <p className="text-sm text-stone-300">
                    Este recurso está alojado externamente.
                  </p>
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir video en nueva pestaña</span>
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            {selectedVideo.descripcion && (
              <div className="p-4 sm:p-5 border-t border-rose-100 text-xs sm:text-sm text-[#5E4758]">
                {selectedVideo.descripcion}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
