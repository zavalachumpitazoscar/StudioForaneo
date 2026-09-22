import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Inbox,
  Layers,
  Camera,
  Film,
  Sparkles,
  Sliders,
  Users,
  BookOpen,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  DollarSign,
  HelpCircle,
  Flame
} from 'lucide-react';
import { firebaseConfig } from '../../firebase/config';
import {
  ServiceItem,
  PortfolioItem,
  VideoItem,
  OfferItem,
  ServiceRequest,
  SiteConfig,
  RequestStatus
} from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminServices } from './AdminServices';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminVideos } from './AdminVideos';
import { AdminOffers } from './AdminOffers';
import { AdminRequests } from './AdminRequests';
import { AdminConfig } from './AdminConfig';
import { AdminUsers } from './AdminUsers';
import { AdminFirebaseGuide } from './AdminFirebaseGuide';
import { AdminManual } from './AdminManual';

interface AdminLayoutProps {
  config: SiteConfig;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  videos: VideoItem[];
  offers: OfferItem[];
  requests: ServiceRequest[];
  onBackToPublicSite: () => void;
  onSaveService: (s: ServiceItem) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
  onSavePortfolio: (p: PortfolioItem) => Promise<void>;
  onDeletePortfolio: (id: string) => Promise<void>;
  onSaveVideo: (v: VideoItem) => Promise<void>;
  onDeleteVideo: (id: string) => Promise<void>;
  onSaveOffer: (o: OfferItem) => Promise<void>;
  onDeleteOffer: (id: string) => Promise<void>;
  onUpdateRequestStatus: (id: string, status: RequestStatus, notes?: string) => Promise<void>;
  onDeleteRequest: (id: string) => Promise<void>;
  onSaveConfig: (c: SiteConfig) => Promise<void>;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  config,
  services,
  portfolio,
  videos,
  offers,
  requests,
  onBackToPublicSite,
  onSaveService,
  onDeleteService,
  onSavePortfolio,
  onDeletePortfolio,
  onSaveVideo,
  onDeleteVideo,
  onSaveOffer,
  onDeleteOffer,
  onUpdateRequestStatus,
  onDeleteRequest,
  onSaveConfig
}) => {
  const { userProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const pendingRequestsCount = requests.filter(r => r.estado === 'PENDIENTE').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'solicitudes', label: 'Solicitudes', icon: Inbox, badge: pendingRequestsCount },
    { id: 'servicios', label: 'Servicios & Packs', icon: Layers },
    { id: 'portafolio', label: 'Portafolio Fotos', icon: Camera },
    { id: 'videos', label: 'Videos & Reels', icon: Film },
    { id: 'promociones', label: 'Promociones', icon: Sparkles },
    { id: 'configuracion', label: 'Configuración Sitio', icon: Sliders },
    { id: 'usuarios', label: 'Equipo & Usuarios', icon: Users },
    { id: 'manual', label: 'Manual & Guía', icon: BookOpen },
    { id: 'firebase', label: 'Guía Cloud / GitHub', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-[#33182B] flex flex-col selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FFF9FA]/90 backdrop-blur-md border-b border-rose-100 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs shadow-rose-950/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-rose-200 text-[#5E4758] hover:text-[#33182B]"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-md shadow-rose-200">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-bold text-xs text-rose-600 font-serif">
                SF
              </div>
            </div>
            <div>
              <span className="block font-bold text-sm font-serif text-[#3B1E32] tracking-wide">
                Studio Foráneas
              </span>
              <span className="block text-[10px] text-rose-600 font-semibold tracking-wider uppercase">
                Panel de Administración
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Manual Button */}
          <button
            onClick={() => setActiveTab('manual')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-rose-50/70 hover:bg-rose-100 text-rose-700 border-rose-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manual de Uso</span>
          </button>

          <button
            onClick={onBackToPublicSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-[#5E4758] hover:text-[#33182B] text-xs font-semibold border border-rose-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Sitio Web</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-rose-100">
            <div className="hidden lg:block text-right">
              <span className="block text-xs font-bold text-[#33182B] leading-tight">
                {userProfile?.nombre || 'Administradora'}
              </span>
              <span className="block text-[10px] text-emerald-700 font-medium">
                {userProfile?.rol} • Activo
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-[#5E4758] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex flex-col w-64 border-r border-rose-100 p-4 space-y-1.5 shrink-0 bg-[#FFF9FA]">
          {/* Plan Básico Pill */}
          <div className="p-3 mb-2 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 text-amber-900 text-xs flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <DollarSign className="w-3.5 h-3.5 font-bold" />
            </div>
            <div>
              <span className="block font-bold text-[11px] text-amber-950 uppercase tracking-wide">
                Plan Básico Activo
              </span>
              <span className="text-[10px] text-amber-800">
                100% Gratuito • Sin pagos
              </span>
            </div>
          </div>

          {/* Firebase Project Badge */}
          <div className="p-3 mb-2 rounded-2xl bg-white border border-rose-100/90 text-xs space-y-1 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Firebase Conectado</span>
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Sincronización activa"></span>
            </div>
            <div className="text-[11px] font-mono font-bold text-[#33182B] truncate" title={firebaseConfig.projectId}>
              {firebaseConfig.projectId}
            </div>
            <div className="text-[10px] text-[#5E4758]">
              Proyecto: StudioForaneo
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-200'
                    : 'text-[#5E4758] hover:text-[#33182B] hover:bg-white hover:border-rose-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 mt-auto border-t border-rose-100">
            <button
              onClick={onBackToPublicSite}
              className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5E4758] hover:text-rose-600 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la web</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm pt-16 p-4">
            <div className="bg-white rounded-3xl border border-rose-200 p-4 space-y-1.5 shadow-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                        : 'text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-rose-100">
                <button
                  onClick={() => {
                    setMobileNavOpen(false);
                    onBackToPublicSite();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  Volver a la Página Web
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              requests={requests}
              services={services}
              portfolio={portfolio}
              videos={videos}
              offers={offers}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onUpdateStatus={(id, status) => onUpdateRequestStatus(id, status)}
              whatsappNumber={config.whatsappPrincipal}
            />
          )}

          {activeTab === 'solicitudes' && (
            <AdminRequests
              requests={requests}
              onUpdateStatus={onUpdateRequestStatus}
              onDeleteRequest={onDeleteRequest}
            />
          )}

          {activeTab === 'servicios' && (
            <AdminServices
              services={services}
              onSaveService={onSaveService}
              onDeleteService={onDeleteService}
            />
          )}

          {activeTab === 'portafolio' && (
            <AdminPortfolio
              portfolio={portfolio}
              onSaveItem={onSavePortfolio}
              onDeleteItem={onDeletePortfolio}
            />
          )}

          {activeTab === 'videos' && (
            <AdminVideos
              videos={videos}
              onSaveVideo={onSaveVideo}
              onDeleteVideo={onDeleteVideo}
            />
          )}

          {activeTab === 'promociones' && (
            <AdminOffers
              offers={offers}
              onSaveOffer={onSaveOffer}
              onDeleteOffer={onDeleteOffer}
            />
          )}

          {activeTab === 'configuracion' && (
            <AdminConfig
              config={config}
              onSaveConfig={onSaveConfig}
            />
          )}

          {activeTab === 'usuarios' && (
            <AdminUsers />
          )}

          {activeTab === 'manual' && (
            <AdminManual
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'firebase' && (
            <AdminFirebaseGuide />
          )}
        </main>
      </div>
    </div>
  );
};

