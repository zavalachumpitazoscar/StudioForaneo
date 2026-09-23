import React, { useState } from 'react';
import {
  ServiceItem,
  PortfolioItem,
  VideoItem,
  OfferItem,
  ServiceRequest,
  RequestStatus
} from '../../types';
import {
  Inbox,
  Clock,
  CheckCircle,
  Film,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Phone,
  BookOpen,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import { SectionGuideModal, GuideField, GuideStep } from './SectionGuideModal';

interface AdminDashboardProps {
  requests: ServiceRequest[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  videos: VideoItem[];
  offers: OfferItem[];
  onNavigateTab: (tab: string) => void;
  onUpdateStatus: (id: string, status: RequestStatus) => void;
  whatsappNumber: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  requests,
  services,
  portfolio,
  videos,
  offers,
  onNavigateTab,
  onUpdateStatus,
  whatsappNumber
}) => {
  const [guideOpen, setGuideOpen] = useState(false);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.estado === 'PENDIENTE').length;
  const contactedRequests = requests.filter(r => r.estado === 'CONTACTADO').length;
  const activeServices = services.filter(s => s.publicado).length;
  const totalPhotos = portfolio.filter(p => p.publicado).length;
  const totalVideos = videos.filter(v => v.publicado).length;
  const activeOffers = offers.filter(o => o.activo).length;

  const recentRequests = [...requests].slice(0, 5);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'PENDIENTE':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'CONTACTADO':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'COTIZADO':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'CONFIRMADO':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'CANCELADO':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'FINALIZADO':
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const handleWhatsAppContact = (req: ServiceRequest) => {
    const cleanClientPhone = req.telefono.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola ${req.clienteNombre}, te saludamos de Studio Foráneas. Vemos tu solicitud para "${req.servicioSolicitado}". ¡Queremos ayudarte a coordinar los detalles!`
    );
    window.open(`https://wa.me/${cleanClientPhone}?text=${message}`, '_blank');
  };

  const dashboardFields: GuideField[] = [
    {
      name: 'Solicitudes Pendientes',
      meaning: 'Clientes que han llenado el formulario web y esperan contacto.',
      example: '3 clientes esperando respuesta',
      required: false
    },
    {
      name: 'Contactadas',
      meaning: 'Clientes con los que ya se inició conversación vía WhatsApp o email.',
      example: 'En negociación',
      required: false
    },
    {
      name: 'Servicios Activos',
      meaning: 'Cantidad de paquetes de fotografía/video visibles en la web.',
      example: 'Packs de redes, eventos, bodas'
    },
    {
      name: 'Galería & Reels',
      meaning: 'Número total de fotos y videos publicados en el portafolio público.',
      example: '12 fotos y 4 videos'
    }
  ];

  const dashboardSteps: GuideStep[] = [
    {
      step: 1,
      title: 'Revisar solicitudes pendientes',
      instruction: 'Mira el contador de solicitudes arriba. Si hay pendientes, revisa la lista abajo para responderles con rapidez.'
    },
    {
      step: 2,
      title: 'Escribirle al cliente por WhatsApp con 1 clic',
      instruction: 'Haz clic en el botón verde "Contactar WhatsApp" junto a cualquier solicitud para abrir una charla directa con su número.'
    },
    {
      step: 3,
      title: 'Cambiar el estado de la solicitud',
      instruction: 'Una vez que le hables, cámbialo a "CONTACTADO" o "COTIZADO" para que el equipo sepa que ya está en atención.'
    },
    {
      step: 4,
      title: 'Acceder a las secciones de edición',
      instruction: 'Usa los botones de "Accesos Rápidos" para editar servicios, subir fotos al portafolio o configurar teléfonos.'
    }
  ];

  const dashboardTips = [
    'Todo lo que ves funciona 100% en el Plan Básico sin costo mensual.',
    'Los datos se respaldan en tu navegador automáticamente y se sincronizan en la nube.',
    'Puedes contactar a los clientes desde tu WhatsApp personal o el de la empresa sin pagar ninguna API externa.'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FAF8FD] via-[#FAF8FD] to-[#FAF8FD] border border-purple-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Panel de Control General</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#241235]">
            ¡Hola! Bienvenidas al Panel de Studio Foráneas
          </h2>
          <p className="text-xs sm:text-sm text-[#554064]">
            Resumen en tiempo real de solicitudes, servicios publicados y estado del sitio web.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Section Guide Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-800 font-semibold text-xs border border-purple-200 shadow-2xs transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>¿Cómo funciona este Dashboard?</span>
          </button>

          {pendingRequests > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold animate-pulse shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>{pendingRequests} Solicitudes Pendientes</span>
            </span>
          )}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Total Solicitudes */}
        <div
          onClick={() => onNavigateTab('solicitudes')}
          className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all space-y-2 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#554064]">
            <span className="text-xs font-bold uppercase tracking-wider">Solicitudes</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#241235] font-serif">
            {totalRequests}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingRequests} pendientes</span>
          </div>
        </div>

        {/* Contactadas */}
        <div
          onClick={() => onNavigateTab('solicitudes')}
          className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all space-y-2 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#554064]">
            <span className="text-xs font-bold uppercase tracking-wider">Contactadas</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#241235] font-serif">
            {contactedRequests}
          </div>
          <span className="text-xs text-[#554064] block">En seguimiento</span>
        </div>

        {/* Servicios Activos */}
        <div
          onClick={() => onNavigateTab('servicios')}
          className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all space-y-2 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#554064]">
            <span className="text-xs font-bold uppercase tracking-wider">Servicios</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#241235] font-serif">
            {activeServices}
          </div>
          <span className="text-xs text-emerald-700 font-medium block">Publicados en web</span>
        </div>

        {/* Portafolio & Videos */}
        <div
          onClick={() => onNavigateTab('portafolio')}
          className="p-5 rounded-3xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all space-y-2 shadow-sm"
        >
          <div className="flex items-center justify-between text-[#554064]">
            <span className="text-xs font-bold uppercase tracking-wider">Galería & Reels</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#241235] font-serif">
            {totalPhotos + totalVideos}
          </div>
          <span className="text-xs text-[#554064] block">{totalPhotos} fotos • {totalVideos} videos</span>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#554064] uppercase tracking-wider">
          Accesos Rápidos de Edición
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigateTab('servicios')}
            className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all shadow-xs cursor-pointer"
          >
            <span className="block font-bold text-xs text-[#241235]">Editar Servicios</span>
            <span className="text-[11px] text-[#554064]">Modificar precios y paquetes</span>
          </button>

          <button
            onClick={() => onNavigateTab('portafolio')}
            className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all shadow-xs cursor-pointer"
          >
            <span className="block font-bold text-xs text-[#241235]">Subir Fotos</span>
            <span className="text-[11px] text-[#554064]">Enlazar desde Google Drive</span>
          </button>

          <button
            onClick={() => onNavigateTab('promociones')}
            className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all shadow-xs cursor-pointer"
          >
            <span className="block font-bold text-xs text-[#241235]">Promociones</span>
            <span className="text-[11px] text-[#554064]">{activeOffers} ofertas activas</span>
          </button>

          <button
            onClick={() => onNavigateTab('usuarios')}
            className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all shadow-xs cursor-pointer"
          >
            <span className="block font-bold text-xs text-[#241235]">Equipo & Admins</span>
            <span className="text-[11px] text-[#554064]">Aprobar y activar accesos</span>
          </button>

          <button
            onClick={() => onNavigateTab('configuracion')}
            className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all shadow-xs cursor-pointer"
          >
            <span className="block font-bold text-xs text-[#241235]">WhatsApp & Info</span>
            <span className="text-[11px] text-[#554064]">Ajustar datos de contacto</span>
          </button>
        </div>
      </div>

      {/* Recent Requests Section with fast status change */}
      <div className="rounded-3xl bg-white border border-purple-100 p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-serif text-[#241235]">
              Solicitudes Recientes de Clientes
            </h3>
            <p className="text-xs text-[#554064]">
              Registradas directamente desde el formulario del sitio web
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('solicitudes')}
            className="text-xs font-bold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas ({requests.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentRequests.length === 0 ? (
          <div className="text-center py-10 text-[#554064] text-xs">
            Aún no hay solicitudes registradas. Cuando un cliente cotice en la web, aparecerá aquí.
          </div>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-[#FAF8FD] border border-purple-100/90 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#241235]">
                      {req.clienteNombre}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider ${getStatusBadge(req.estado)}`}>
                      {req.estado}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {new Date(req.creadoEn).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-[#554064]">
                    <strong className="text-purple-800">{req.servicioSolicitado}</strong>
                    {req.lugar ? ` • ${req.lugar}` : ''}
                  </p>

                  {req.detalles && (
                    <p className="text-xs text-neutral-600 italic line-clamp-1">
                      "{req.detalles}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWhatsAppContact(req)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Contactar WhatsApp</span>
                  </button>

                  <select
                    value={req.estado}
                    onChange={(e) => onUpdateStatus(req.id, e.target.value as RequestStatus)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-white border border-purple-200 text-[#241235] focus:outline-none focus:border-purple-500"
                  >
                    <option value="PENDIENTE">🟡 Pendiente</option>
                    <option value="CONTACTADO">🔵 Contactado</option>
                    <option value="COTIZADO">🟣 Cotizado</option>
                    <option value="CONFIRMADO">🟢 Confirmado</option>
                    <option value="FINALIZADO">⚪ Finalizado</option>
                    <option value="CANCELADO">🔴 Cancelado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Guide Modal */}
      <SectionGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        sectionTitle="Dashboard Principal • Guía de Uso"
        subtitle="Monitoreo de métricas, pedidos entrantes y atajos de gestión"
        whatIsIt="Es la pantalla de inicio del panel de administración donde puedes ver en un solo vistazo cómo va la interacción con tus clientes y acceder a cualquier herramienta."
        whatIsItFor="Sirve para saber rápidamente cuántos clientes nuevos han escrito, cuáles ya atendiste y acceder a modificar servicios, fotos o configuración con un solo clic."
        fields={dashboardFields}
        steps={dashboardSteps}
        basicPlanTips={dashboardTips}
      />
    </div>
  );
};
