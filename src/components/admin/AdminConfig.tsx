import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { Save, CheckCircle2, Sliders, Globe, Phone, Mail, Instagram, Video, Facebook, Youtube } from 'lucide-react';
import { getDirectImageUrl } from '../../firebase/driveUtils';

interface AdminConfigProps {
  config: SiteConfig;
  onSaveConfig: (config: SiteConfig) => Promise<void>;
}

export const AdminConfig: React.FC<AdminConfigProps> = ({ config, onSaveConfig }) => {
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    await onSaveConfig(formData);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-rose-600" />
            <span>Ajustes Globales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#3B1E32]">
            Configuración General del Sitio Web
          </h2>
          <p className="text-xs text-[#5C4054]">
            Modifica textos principales, números de WhatsApp, enlaces de redes sociales y medios del Hero.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Configuración guardada</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identidad de Marca & Textos */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#3B1E32] uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-600" />
            <span>Identidad & Textos Principales</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Nombre Comercial del Estudio
              </label>
              <input
                type="text"
                required
                value={formData.nombreComercial}
                onChange={e => setFormData({ ...formData, nombreComercial: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Lema / Slogan
              </label>
              <input
                type="text"
                value={formData.lema || ''}
                onChange={e => setFormData({ ...formData, lema: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3B1E32]">
              Descripción Institucional (SEO y Footer)
            </label>
            <textarea
              rows={2}
              value={formData.descripcion}
              onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#3B1E32] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-600" />
            <span>Encabezado Hero Principal</span>
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3B1E32]">
              Título Principal del Hero
            </label>
            <input
              type="text"
              required
              value={formData.heroTitulo}
              onChange={e => setFormData({ ...formData, heroTitulo: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3B1E32]">
              Subtítulo del Hero
            </label>
            <textarea
              rows={2}
              value={formData.heroSubtitulo}
              onChange={e => setFormData({ ...formData, heroSubtitulo: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Imagen de Fondo (URL Google Drive o directa)
              </label>
              <input
                type="url"
                value={formData.heroImagen || ''}
                onChange={e => setFormData({ ...formData, heroImagen: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
              {formData.heroImagen && (
                <div className="pt-2">
                  <img
                    src={getDirectImageUrl(formData.heroImagen)}
                    alt="Hero preview"
                    className="h-20 w-36 object-cover rounded-xl border border-rose-200 shadow-2xs"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Video de Fondo Opcional (URL YouTube o Drive)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.heroVideoUrl || ''}
                onChange={e => setFormData({ ...formData, heroVideoUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Canales de Contacto */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#3B1E32] uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Contacto & Números de WhatsApp</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                WhatsApp Principal (Nathaly Vergara)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappPrincipal}
                onChange={e => setFormData({ ...formData, whatsappPrincipal: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                WhatsApp Secundario (Rosa Velásquez)
              </label>
              <input
                type="text"
                value={formData.whatsappSecundario || ''}
                onChange={e => setFormData({ ...formData, whatsappSecundario: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Correo Electrónico de Contacto
              </label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={e => setFormData({ ...formData, correo: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Dirección / Ubicación
              </label>
              <input
                type="text"
                value={formData.direccion || ''}
                onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#3B1E32] uppercase tracking-wider flex items-center gap-2">
            <Instagram className="w-4 h-4 text-purple-600" />
            <span>Enlaces de Redes Sociales</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl || ''}
                onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                TikTok URL
              </label>
              <input
                type="url"
                value={formData.tiktokUrl || ''}
                onChange={e => setFormData({ ...formData, tiktokUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebookUrl || ''}
                onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl || ''}
                onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#3B1E32]">
              Texto de Derechos Reservados (Footer)
            </label>
            <input
              type="text"
              value={formData.footerTexto || ''}
              onChange={e => setFormData({ ...formData, footerTexto: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider transition-all shadow-md shadow-rose-200 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Guardando...' : 'Guardar Toda la Configuración'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
