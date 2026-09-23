import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import {
  Save,
  CheckCircle2,
  Sliders,
  Globe,
  Phone,
  Mail,
  Instagram,
  Video,
  Facebook,
  Youtube,
  Users,
  CheckSquare,
  Sparkles,
  Layout,
  FileText,
  Clock,
  MapPin,
  Camera,
  TrendingUp
} from 'lucide-react';
import { getDirectImageUrl } from '../../firebase/driveUtils';

interface AdminConfigProps {
  config: SiteConfig;
  onSaveConfig: (config: SiteConfig) => Promise<void>;
}

type TabType = 'identidad' | 'hero' | 'nosotras' | 'beneficios' | 'secciones' | 'contacto' | 'footer';

export const AdminConfig: React.FC<AdminConfigProps> = ({ config, onSaveConfig }) => {
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('identidad');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    await onSaveConfig(formData);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'identidad', label: 'Identidad & Marca', icon: <Globe className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero (Portada)', icon: <Sliders className="w-4 h-4" /> },
    { id: 'nosotras', label: '¿Quiénes Somos?', icon: <Users className="w-4 h-4" /> },
    { id: 'beneficios', label: 'Planes & Inclusiones', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'secciones', label: 'Encabezados Secciones', icon: <Layout className="w-4 h-4" /> },
    { id: 'contacto', label: 'Contacto & Redes', icon: <Phone className="w-4 h-4" /> },
    { id: 'footer', label: 'Banner & Footer', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-purple-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-purple-600" />
            <span>Gestor Integral de Contenido (CMS)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#241235]">
            Edición Completa del Sitio Web
          </h2>
          <p className="text-xs text-[#554064]">
            Modifica en tiempo real cada texto, biografía, título PUCP, imagen, métrica, checklist o enlace mostrado a los visitantes.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cambios guardados con éxito</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-purple-100 shadow-xs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white shadow-sm shadow-purple-500/20'
                : 'text-[#554064] hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: IDENTIDAD & MARCA */}
        {activeTab === 'identidad' && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <Globe className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-bold font-serif text-[#241235]">
                Identidad Comercial y Marca
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Nombre Comercial del Estudio
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombreComercial}
                  onChange={e => setFormData({ ...formData, nombreComercial: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Lema / Eslogan
                </label>
                <input
                  type="text"
                  value={formData.lema || ''}
                  onChange={e => setFormData({ ...formData, lema: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#241235]">
                Descripción Institucional (SEO, meta tags y pie de página)
              </label>
              <textarea
                rows={3}
                value={formData.descripcion}
                onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: HERO PRINCIPAL */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
                <Sliders className="w-5 h-5 text-purple-700" />
                <h3 className="text-base font-bold font-serif text-[#241235]">
                  Textos y Medios de Portada (Hero)
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Píldora / Insignia Superior del Hero
                </label>
                <input
                  type="text"
                  value={formData.heroBadge || ''}
                  onChange={e => setFormData({ ...formData, heroBadge: e.target.value })}
                  placeholder="PUCP • Producción Audiovisual, Redes Sociales & Bodas"
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Título Principal del Hero
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroTitulo}
                  onChange={e => setFormData({ ...formData, heroTitulo: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Subtítulo del Hero
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubtitulo}
                  onChange={e => setFormData({ ...formData, heroSubtitulo: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Texto Botón Principal (CTA)
                  </label>
                  <input
                    type="text"
                    value={formData.heroBotonPrincipalTexto || ''}
                    onChange={e => setFormData({ ...formData, heroBotonPrincipalTexto: e.target.value })}
                    placeholder="Solicitar Cotización"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Texto Botón Secundario
                  </label>
                  <input
                    type="text"
                    value={formData.heroBotonSecundarioTexto || ''}
                    onChange={e => setFormData({ ...formData, heroBotonSecundarioTexto: e.target.value })}
                    placeholder="Ver Trabajos & Portafolio"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Imagen de Fondo (URL Google Drive o directa)
                  </label>
                  <input
                    type="url"
                    value={formData.heroImagen || ''}
                    onChange={e => setFormData({ ...formData, heroImagen: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                  {formData.heroImagen && (
                    <div className="pt-2">
                      <img
                        src={getDirectImageUrl(formData.heroImagen)}
                        alt="Hero preview"
                        className="h-20 w-36 object-cover rounded-xl border border-purple-200 shadow-2xs"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Video de Fondo Opcional (URL YouTube o Drive)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.heroVideoUrl || ''}
                    onChange={e => setFormData({ ...formData, heroVideoUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Métricas del Hero */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#241235]">
                Las 4 Tarjetas de Métricas / Puntos Fuertes del Hero
              </h4>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-purple-100 space-y-2">
                  <span className="text-[10px] font-bold text-purple-700 uppercase">Tarjeta 1</span>
                  <input
                    type="text"
                    placeholder="S/. 500"
                    value={formData.heroMetrica1Valor || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica1Valor: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Packs mensuales desde"
                    value={formData.heroMetrica1Label || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica1Label: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-purple-100 space-y-2">
                  <span className="text-[10px] font-bold text-lime-700 uppercase">Tarjeta 2</span>
                  <input
                    type="text"
                    placeholder="En Vivo"
                    value={formData.heroMetrica2Valor || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica2Valor: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Stories y Reels en eventos"
                    value={formData.heroMetrica2Label || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica2Label: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-purple-100 space-y-2">
                  <span className="text-[10px] font-bold text-purple-700 uppercase">Tarjeta 3</span>
                  <input
                    type="text"
                    placeholder="100% Pro"
                    value={formData.heroMetrica3Valor || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica3Valor: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Luces, micros y trípodes"
                    value={formData.heroMetrica3Label || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica3Label: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-purple-100 space-y-2">
                  <span className="text-[10px] font-bold text-lime-700 uppercase">Tarjeta 4</span>
                  <input
                    type="text"
                    placeholder="PUCP"
                    value={formData.heroMetrica4Valor || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica4Valor: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Estrategia + Producción"
                    value={formData.heroMetrica4Label || ''}
                    onChange={e => setFormData({ ...formData, heroMetrica4Label: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-purple-200 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: QUIÉNES SOMOS & FUNDADORAS PUCP */}
        {activeTab === 'nosotras' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header de la sección */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
                <Users className="w-5 h-5 text-purple-700" />
                <h3 className="text-base font-bold font-serif text-[#241235]">
                  Encabezado de la Sección "¿Quiénes Somos?"
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Insignia / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.quienesSomosBadge || ''}
                    onChange={e => setFormData({ ...formData, quienesSomosBadge: e.target.value })}
                    placeholder="¿Quiénes Somos?"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Título Principal de la Sección
                  </label>
                  <input
                    type="text"
                    value={formData.quienesSomosTitulo || ''}
                    onChange={e => setFormData({ ...formData, quienesSomosTitulo: e.target.value })}
                    placeholder="Unimos visión audiovisual & estrategia de ventas"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Descripción General / Manifiesto
                </label>
                <textarea
                  rows={3}
                  value={formData.quienesSomosDescripcion || ''}
                  onChange={e => setFormData({ ...formData, quienesSomosDescripcion: e.target.value })}
                  placeholder="Combinamos nuestras fortalezas y perspectivas para crear contenido auténtico..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Fundadora 1: Comunicadora Audiovisual */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-100">
                <Camera className="w-5 h-5 text-purple-700" />
                <h3 className="text-base font-bold font-serif text-[#241235]">
                  Perfil 1: Comunicadora Audiovisual (Nathaly Vergara)
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora1Nombre || ''}
                    onChange={e => setFormData({ ...formData, fundadora1Nombre: e.target.value })}
                    placeholder="Nathaly Vergara"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Cargo / Carrera y Universidad
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora1Cargo || ''}
                    onChange={e => setFormData({ ...formData, fundadora1Cargo: e.target.value })}
                    placeholder="Comunicadora Audiovisual • PUCP"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Biografía / Reseña Profesional
                </label>
                <textarea
                  rows={3}
                  value={formData.fundadora1Bio || ''}
                  onChange={e => setFormData({ ...formData, fundadora1Bio: e.target.value })}
                  placeholder="Comunicadora Audiovisual por la Pontificia Universidad Católica del Perú (PUCP)..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Etiquetas / Especialidades (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora1Tags || ''}
                    onChange={e => setFormData({ ...formData, fundadora1Tags: e.target.value })}
                    placeholder="Dirección Audiovisual, Edición & Guiones, Reels Dinámicos"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    URL Fotografía / Avatar (Opcional - Drive o Web)
                  </label>
                  <input
                    type="url"
                    value={formData.fundadora1Foto || ''}
                    onChange={e => setFormData({ ...formData, fundadora1Foto: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                  {formData.fundadora1Foto && (
                    <div className="pt-2">
                      <img
                        src={getDirectImageUrl(formData.fundadora1Foto)}
                        alt="Preview Fundadora 1"
                        className="w-14 h-14 rounded-xl object-cover border border-purple-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fundadora 2: Gestora Empresarial */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-lime-300 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-lime-100">
                <TrendingUp className="w-5 h-5 text-lime-700" />
                <h3 className="text-base font-bold font-serif text-[#241235]">
                  Perfil 2: Gestora Empresarial y Social (Rosa Velásquez)
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora2Nombre || ''}
                    onChange={e => setFormData({ ...formData, fundadora2Nombre: e.target.value })}
                    placeholder="Rosa Velásquez"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Cargo / Carrera y Universidad
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora2Cargo || ''}
                    onChange={e => setFormData({ ...formData, fundadora2Cargo: e.target.value })}
                    placeholder="Gestora Empresarial y Social • PUCP"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">
                  Biografía / Reseña Profesional
                </label>
                <textarea
                  rows={3}
                  value={formData.fundadora2Bio || ''}
                  onChange={e => setFormData({ ...formData, fundadora2Bio: e.target.value })}
                  placeholder="Gestora empresarial y social por la Pontificia Universidad Católica del Perú (PUCP)..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Etiquetas / Especialidades (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={formData.fundadora2Tags || ''}
                    onChange={e => setFormData({ ...formData, fundadora2Tags: e.target.value })}
                    placeholder="Estrategia Comercial, Crecimiento Digital, Planificación de Ventas"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    URL Fotografía / Avatar (Opcional - Drive o Web)
                  </label>
                  <input
                    type="url"
                    value={formData.fundadora2Foto || ''}
                    onChange={e => setFormData({ ...formData, fundadora2Foto: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                  {formData.fundadora2Foto && (
                    <div className="pt-2">
                      <img
                        src={getDirectImageUrl(formData.fundadora2Foto)}
                        alt="Preview Fundadora 2"
                        className="w-14 h-14 rounded-xl object-cover border border-purple-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PLANES & BENEFICIOS INCLUIDOS */}
        {activeTab === 'beneficios' && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <CheckSquare className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-bold font-serif text-[#241235]">
                Inclusiones de los Planes & Consideraciones
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#241235]">
                Título del Cuadro de Inclusiones
              </label>
              <input
                type="text"
                value={formData.beneficiosTitulo || ''}
                onChange={e => setFormData({ ...formData, beneficiosTitulo: e.target.value })}
                placeholder="Todos nuestros planes de contenido para redes sociales incluyen:"
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#241235]">
                Lista de Beneficios Incluidos (Escribe un beneficio por cada línea)
              </label>
              <textarea
                rows={6}
                value={formData.beneficiosLista || ''}
                onChange={e => setFormData({ ...formData, beneficiosLista: e.target.value })}
                placeholder="Planificación mensual de contenidos estratégicos&#10;Desarrollo de ideas y conceptos creativos&#10;Creación de las piezas contempladas en tu plan..."
                className="w-full p-3 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none font-sans leading-relaxed"
              />
              <span className="text-[11px] text-[#725C80] block">
                * Cada salto de línea se convertirá automáticamente en un ítem con check verde (✓).
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold text-[#241235]">
                Texto de Consideraciones Importantes
              </label>
              <textarea
                rows={2}
                value={formData.consideracionesTexto || ''}
                onChange={e => setFormData({ ...formData, consideracionesTexto: e.target.value })}
                placeholder="Las locaciones, desplazamientos o modelos especiales se coordinan previamente..."
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 5: ENCABEZADOS DE SECCIONES */}
        {activeTab === 'secciones' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Servicios */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Encabezado de Servicios</span>
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Badge</label>
                  <input
                    type="text"
                    value={formData.serviciosBadge || ''}
                    onChange={e => setFormData({ ...formData, serviciosBadge: e.target.value })}
                    placeholder="Nuestros Servicios"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Título</label>
                  <input
                    type="text"
                    value={formData.serviciosTitulo || ''}
                    onChange={e => setFormData({ ...formData, serviciosTitulo: e.target.value })}
                    placeholder="Hacemos realidad lo que necesites"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">Subtítulo</label>
                <input
                  type="text"
                  value={formData.serviciosSubtitulo || ''}
                  onChange={e => setFormData({ ...formData, serviciosSubtitulo: e.target.value })}
                  placeholder="Planes flexibles pensados para negocios, marcas personales y eventos especiales..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                />
              </div>
            </div>

            {/* Portafolio */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-700" />
                <span>Encabezado de Portafolio</span>
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Badge</label>
                  <input
                    type="text"
                    value={formData.portafolioBadge || ''}
                    onChange={e => setFormData({ ...formData, portafolioBadge: e.target.value })}
                    placeholder="Portafolio Visual"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Título</label>
                  <input
                    type="text"
                    value={formData.portafolioTitulo || ''}
                    onChange={e => setFormData({ ...formData, portafolioTitulo: e.target.value })}
                    placeholder="Cada toma cuenta una historia única"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">Subtítulo</label>
                <input
                  type="text"
                  value={formData.portafolioSubtitulo || ''}
                  onChange={e => setFormData({ ...formData, portafolioSubtitulo: e.target.value })}
                  placeholder="Fotografía editorial, cobertura de bodas y campañas comerciales..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                />
              </div>
            </div>

            {/* Videos */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h4 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-700" />
                <span>Encabezado de Videos & Reels</span>
              </h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Badge</label>
                  <input
                    type="text"
                    value={formData.videosBadge || ''}
                    onChange={e => setFormData({ ...formData, videosBadge: e.target.value })}
                    placeholder="Producción en Movimiento"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">Título</label>
                  <input
                    type="text"
                    value={formData.videosTitulo || ''}
                    onChange={e => setFormData({ ...formData, videosTitulo: e.target.value })}
                    placeholder="Videos, Reels & Coberturas"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#241235]">Subtítulo</label>
                <input
                  type="text"
                  value={formData.videosSubtitulo || ''}
                  onChange={e => setFormData({ ...formData, videosSubtitulo: e.target.value })}
                  placeholder="Showreels cinematográficos, resúmenes dinámicos para redes sociales..."
                  className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CONTACTO & REDES SOCIALES */}
        {activeTab === 'contacto' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Canales de Contacto */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-serif text-[#241235] flex items-center gap-2 pb-3 border-b border-purple-50">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Teléfonos de WhatsApp & Canales Oficiales</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    WhatsApp Principal (Nathaly Vergara)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsappPrincipal}
                    onChange={e => setFormData({ ...formData, whatsappPrincipal: e.target.value })}
                    placeholder="+51997534727"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    WhatsApp Secundario (Rosa Velásquez)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappSecundario || ''}
                    onChange={e => setFormData({ ...formData, whatsappSecundario: e.target.value })}
                    placeholder="+51947718479"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.correo}
                    onChange={e => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Dirección / Ubicación
                  </label>
                  <input
                    type="text"
                    value={formData.direccion || ''}
                    onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Lima, Perú - Cobertura nacional"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Horarios de Atención
                  </label>
                  <input
                    type="text"
                    value={formData.horarios || ''}
                    onChange={e => setFormData({ ...formData, horarios: e.target.value })}
                    placeholder="Lunes a Sábado: 9:00 AM - 7:00 PM"
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-serif text-[#241235] flex items-center gap-2 pb-3 border-b border-purple-50">
                <Instagram className="w-5 h-5 text-purple-700" />
                <span>Enlaces de Redes Sociales</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.instagramUrl || ''}
                    onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    value={formData.tiktokUrl || ''}
                    onChange={e => setFormData({ ...formData, tiktokUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={formData.facebookUrl || ''}
                    onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#241235]">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl || ''}
                    onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: BANNER & FOOTER */}
        {activeTab === 'footer' && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-purple-50">
              <FileText className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-bold font-serif text-[#241235]">
                Banner de Llamado a la Acción y Pie de Página
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#241235]">
                Título del Banner de Acción Inferior
              </label>
              <input
                type="text"
                value={formData.footerCtaTitulo || ''}
                onChange={e => setFormData({ ...formData, footerCtaTitulo: e.target.value })}
                placeholder="¿Lista para impulsar tu marca o inmortalizar tu evento?"
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#241235]">
                Subtítulo del Banner de Acción Inferior
              </label>
              <textarea
                rows={2}
                value={formData.footerCtaSubtitulo || ''}
                onChange={e => setFormData({ ...formData, footerCtaSubtitulo: e.target.value })}
                placeholder="Conversemos hoy mismo para diseñar un plan audiovisual y estratégico hecho a tu medida."
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-purple-50">
              <label className="block text-xs font-bold text-[#241235]">
                Texto de Derechos Reservados / Copyright (Footer)
              </label>
              <input
                type="text"
                value={formData.footerTexto || ''}
                onChange={e => setFormData({ ...formData, footerTexto: e.target.value })}
                placeholder="© 2026 Studio Foráneas. Todos los derechos reservados."
                className="w-full p-2.5 rounded-xl bg-[#FAF8FD] border border-purple-200 text-[#241235] text-xs focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Global Submit Bar */}
        <div className="flex items-center justify-between p-5 rounded-3xl bg-white border border-purple-100 shadow-sm">
          <div className="text-xs text-[#554064]">
            {savedSuccess ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Todos los cambios se guardaron y están visibles en el sitio.
              </span>
            ) : (
              <span>Los cambios se guardan permanentemente en Firestore y se reflejan al instante.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-500 hover:to-violet-600 text-white font-bold text-xs tracking-wider transition-all shadow-md shadow-purple-500/25 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4 text-lime-300" />
            <span>{saving ? 'Guardando en Firestore...' : 'Guardar Toda la Configuración'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
