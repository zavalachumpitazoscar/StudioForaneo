import React from 'react';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Video, Youtube, Lock, Sparkles, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin, onRequestQuote }) => {
  const phone1 = config.whatsappPrincipal || '+51997534727';
  const phone2 = config.whatsappSecundario || '+51947718479';
  const cleanPhone1 = phone1.replace(/\D/g, '');

  return (
    <footer id="contacto" className="bg-[#FFF5F7] border-t border-rose-200/80 text-[#5E4758]">
      {/* Top CTA Bar */}
      <div className="border-b border-rose-300/40 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              ¿Lista para impulsar tu marca o inmortalizar tu evento?
            </h3>
            <p className="text-rose-100 text-sm max-w-xl">
              Conversemos hoy mismo para diseñar un plan audiovisual y estratégico hecho a tu medida.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Solicitar Cotización</span>
            </button>

            <a
              href={`https://wa.me/${cleanPhone1}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/40 bg-white/15 hover:bg-white/25 text-white text-xs font-bold tracking-wider transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-md shadow-rose-200">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Camera className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <span className="text-xl font-bold font-serif text-[#33182B] tracking-tight">
              {config.nombreComercial || 'Studio Foráneas'}
            </span>
          </div>

          <p className="text-[#665060] text-xs sm:text-sm leading-relaxed max-w-md">
            {config.descripcion || 'Producción audiovisual, estrategia comercial y creación de contenido para redes sociales y cobertura de eventos por comunicadoras de la PUCP.'}
          </p>

          <div className="pt-2 flex items-center gap-2.5">
            {config.instagramUrl && (
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Studio Foráneas"
                className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center transition-colors border border-rose-200 shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {config.tiktokUrl && (
              <a
                href={config.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok de Studio Foráneas"
                className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center transition-colors border border-rose-200 shadow-xs"
              >
                <Video className="w-4 h-4" />
              </a>
            )}
            {config.facebookUrl && (
              <a
                href={config.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Studio Foráneas"
                className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center transition-colors border border-rose-200 shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {config.youtubeUrl && (
              <a
                href={config.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube de Studio Foráneas"
                className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center transition-colors border border-rose-200 shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Col 2: Servicios directos */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#33182B]">
            Servicios Principales
          </h4>
          <ul className="space-y-2 text-xs text-[#665060]">
            <li><a href="#servicios" className="hover:text-rose-600 transition-colors">Contenido para Redes Sociales</a></li>
            <li><a href="#servicios" className="hover:text-rose-600 transition-colors">Pack Básico, Crecimiento & Pro</a></li>
            <li><a href="#servicios" className="hover:text-rose-600 transition-colors">Cobertura de Bodas & Eventos</a></li>
            <li><a href="#servicios" className="hover:text-rose-600 transition-colors">Stories y Reels en Tiempo Real</a></li>
            <li><a href="#servicios" className="hover:text-rose-600 transition-colors">Full Day Shoot Comercial</a></li>
          </ul>
        </div>

        {/* Col 3: Contacto */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#33182B]">
            Contacto Directo
          </h4>
          <div className="space-y-2.5 text-xs text-[#665060]">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-rose-600 shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${phone1}`} className="hover:text-rose-600 font-medium">{phone1} (Nathaly)</a>
                <a href={`tel:${phone2}`} className="hover:text-rose-600 font-medium">{phone2} (Rosa)</a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-rose-600 shrink-0" />
              <a href={`mailto:${config.correo || 'studioforaneas@gmail.com'}`} className="hover:text-rose-600 font-medium">
                {config.correo || 'studioforaneas@gmail.com'}
              </a>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{config.direccion || 'Lima, Perú • Cobertura nacional'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Admin Row */}
      <div className="border-t border-rose-200/80 bg-[#FFF0F3] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A6D81]">
          <p>
            {config.footerTexto || '© 2026 Studio Foráneas. Todos los derechos reservados.'}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[#6B5365] hover:text-rose-600 transition-colors cursor-pointer font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>Panel de Administración</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
