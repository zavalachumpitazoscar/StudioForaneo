import React from 'react';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Video, Youtube, Lock, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { SiteConfig, ServiceItem } from '../types';

interface FooterProps {
  config: SiteConfig;
  services?: ServiceItem[];
  onOpenAdmin: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, services = [], onOpenAdmin, onRequestQuote }) => {
  const phone1 = config.whatsappPrincipal || '+51997534727';
  const phone2 = config.whatsappSecundario || '+51947718479';
  const cleanPhone1 = phone1.replace(/\D/g, '');

  // Calculate footer services list: either custom text from config or published services
  const customList = config.footerServiciosLista
    ? config.footerServiciosLista.split('\n').map(s => s.trim()).filter(Boolean)
    : [];

  const footerServices = customList.length > 0
    ? customList
    : services.length > 0
    ? services.filter(s => s.publicado).map(s => s.nombre)
    : [
        'Creación de Contenido para Redes Sociales',
        'Cobertura en Vivo para Bodas & Eventos',
        'Full Day Shoot & Campañas Comerciales',
        'Reels Dinámicos & Producción Audiovisual'
      ];

  return (
    <footer id="contacto" className="bg-[#F8F5FD] border-t border-purple-100 text-[#554064]">
      {/* Top CTA Bar */}
      <div className="border-b border-purple-300/40 bg-gradient-to-r from-purple-800 via-violet-800 to-purple-900 text-white shadow-inner relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {config.footerCtaTitulo || '¿Lista para impulsar tu marca o inmortalizar tu evento?'}
            </h3>
            <p className="text-purple-200 text-sm max-w-xl">
              {config.footerCtaSubtitulo || 'Conversemos hoy mismo para diseñar un plan audiovisual y estratégico hecho a tu medida.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-purple-950 text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-purple-950" />
              <span>Solicitar Cotización</span>
            </button>

            <a
              href={`https://wa.me/${cleanPhone1}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-lime-300" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-600 p-0.5 shadow-md shadow-purple-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-700" />
              </div>
            </div>
            <span className="text-xl font-bold font-serif text-[#241235] tracking-tight">
              {config.nombreComercial || 'Studio Foráneas'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#634E72] max-w-sm leading-relaxed">
            {config.descripcion || 'Producción audiovisual, estrategia comercial y creación de contenido para redes sociales y cobertura de eventos por comunicadoras de la PUCP.'}
          </p>

          {config.lema && (
            <div className="inline-block text-xs font-semibold italic text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              "{config.lema}"
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {config.instagramUrl && (
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {config.tiktokUrl && (
              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
              >
                <Video className="w-4 h-4" />
              </a>
            )}

            {config.facebookUrl && (
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            {config.youtubeUrl && (
              <a
                href={config.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Col 2: Servicios Rápidos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#241235]">
            {config.footerServiciosTitulo || 'Servicios'}
          </h4>
          <ul className="space-y-2 text-xs">
            {footerServices.map((serviceName, idx) => (
              <li key={idx}>
                <a href="#servicios" className="hover:text-purple-700 transition-colors block">
                  {serviceName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contacto */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#241235]">
            Contacto Directo
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <a href={`https://wa.me/${phone1.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-purple-700 font-mono">
                {phone1}
              </a>
            </li>

            {phone2 && (
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lime-700 shrink-0" />
                <a href={`https://wa.me/${phone2.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-purple-700 font-mono">
                  {phone2}
                </a>
              </li>
            )}

            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <a href={`mailto:${config.correo || 'studioforaneas@gmail.com'}`} className="hover:text-purple-700 truncate">
                {config.correo || 'studioforaneas@gmail.com'}
              </a>
            </li>

            {config.direccion && (
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{config.direccion}</span>
              </li>
            )}

            {config.horarios && (
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{config.horarios}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Admin Access */}
      <div className="border-t border-purple-100 bg-white/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#725C80]">
          <p>
            {config.footerTexto || `© ${new Date().getFullYear()} Studio Foráneas. Todos los derechos reservados.`}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors p-1.5 rounded-lg hover:bg-purple-50 cursor-pointer"
              title="Panel de Administración"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Panel de Administración</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
