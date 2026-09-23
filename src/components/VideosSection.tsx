import React, { useState } from 'react';
import { VideoItem, SiteConfig } from '../types';
import { Play, ExternalLink, Film, X, Sparkles } from 'lucide-react';
import { parseVideoUrl, getDirectImageUrl } from '../firebase/driveUtils';

interface VideosSectionProps {
  videos: VideoItem[];
  config?: SiteConfig;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos, config }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const publishedVideos = videos
    .filter(v => v.publicado)
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  if (publishedVideos.length === 0) return null;

  const parsedSelected = selectedVideo ? parseVideoUrl(selectedVideo.videoUrl) : null;

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>{config?.videosBadge || 'Producción en Movimiento'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#241235] tracking-tight">
          {config?.videosTitulo || 'Videos, Reels & Coberturas'}
        </h2>
        <p className="text-[#554064] text-sm sm:text-base">
          {config?.videosSubtitulo || 'Showreels cinematográficos, resúmenes dinámicos para redes sociales y filmación documental con edición profesional y etalonaje de color.'}
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
              className="group rounded-3xl bg-white border border-purple-100 overflow-hidden hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              {/* Media Player or Thumbnail with Play Trigger */}
              <div className="relative aspect-video w-full bg-stone-900 overflow-hidden">
                <img
                  src={thumb}
                  alt={item.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/25 transition-colors" />

                {/* Play Button Trigger */}
                <button
                  onClick={() => setSelectedVideo(item)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-lime-400 text-purple-950 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:shadow-lime-400/50"
                  aria-label="Reproducir video"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>

                {/* Duration / Source Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-mono flex items-center gap-1.5">
                  <Film className="w-3 h-3 text-purple-400" />
                  <span>{parsed.type.toUpperCase()}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      {item.categoria || 'Producción Audiovisual'}
                    </span>
                    {item.fecha && (
                      <span className="text-[11px] text-[#725C80] font-mono">
                        {item.fecha}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#241235] group-hover:text-purple-700 transition-colors">
                    {item.titulo}
                  </h3>

                  {item.descripcion && (
                    <p className="text-[#554064] text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {item.descripcion}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-purple-50 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedVideo(item)}
                    className="font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-lime-600" />
                    <span>Reproducir en modal</span>
                  </button>

                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#725C80] hover:text-purple-700 flex items-center gap-1 transition-colors"
                  >
                    <span>Abrir origen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Video Modal */}
      {selectedVideo && parsedSelected && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 bg-stone-800/80 border-b border-white/10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-lime-400">
                  {selectedVideo.categoria || 'Video'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white font-serif truncate max-w-lg">
                  {selectedVideo.titulo}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              {parsedSelected.embedUrl ? (
                <iframe
                  src={`${parsedSelected.embedUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.titulo}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-300">
                  <p>Este video no se puede incrustar directamente.</p>
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 text-purple-950 font-bold text-xs hover:bg-lime-300 transition-colors"
                  >
                    <span>Abrir en enlace externo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {selectedVideo.descripcion && (
              <div className="p-4 sm:p-6 pt-0 text-xs text-stone-300">
                <p>{selectedVideo.descripcion}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
