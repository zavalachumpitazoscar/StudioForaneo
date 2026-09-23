import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  fetchServices,
  saveService,
  removeService,
  fetchPortfolio,
  savePortfolioItem,
  removePortfolioItem,
  fetchVideos,
  saveVideo,
  removeVideo,
  fetchOffers,
  saveOffer,
  removeOffer,
  fetchServiceRequests,
  updateServiceRequest,
  removeServiceRequest,
  fetchSiteConfig,
  saveSiteConfig
} from './firebase/dataService';
import {
  ServiceItem,
  PortfolioItem,
  VideoItem,
  OfferItem,
  ServiceRequest,
  SiteConfig,
  RequestStatus
} from './types';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_VIDEOS,
  INITIAL_OFFERS,
  INITIAL_REQUESTS
} from './data/initialData';

// Public components
import { OffersBanner } from './components/OffersBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { VideosSection } from './components/VideosSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { RequestModal } from './components/RequestModal';
import { LightboxModal } from './components/LightboxModal';

// Admin components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminPendingApproval } from './components/admin/AdminPendingApproval';
import { UserRequestsModal } from './components/UserRequestsModal';
import { UserAccountModal } from './components/UserAccountModal';

import { MessageCircle, ShieldAlert } from 'lucide-react';

function AppContent() {
  const { userProfile, isAdmin, isActive, loading: authLoading } = useAuth();

  // Data states
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [offers, setOffers] = useState<OfferItem[]>(INITIAL_OFFERS);
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [loadingData, setLoadingData] = useState(true);

  // View & Modals state
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [authReason, setAuthReason] = useState<'quote' | 'admin' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  // Load initial public catalog data
  useEffect(() => {
    async function loadAll() {
      setLoadingData(true);
      try {
        const [c, s, p, v, o] = await Promise.all([
          fetchSiteConfig().catch(() => INITIAL_SITE_CONFIG),
          fetchServices().catch(() => INITIAL_SERVICES),
          fetchPortfolio().catch(() => INITIAL_PORTFOLIO),
          fetchVideos().catch(() => INITIAL_VIDEOS),
          fetchOffers().catch(() => INITIAL_OFFERS),
        ]);
        setConfig(c);
        setServices(s);
        setPortfolio(p);
        setVideos(v);
        setOffers(o);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoadingData(false);
      }
    }
    loadAll();
  }, []);

  // Load service requests only when authenticated as active Admin
  useEffect(() => {
    if (isAdmin && isActive) {
      fetchServiceRequests()
        .then(r => setRequests(r))
        .catch(() => {});
    }
  }, [isAdmin, isActive]);

  // Handlers for Services
  const handleSaveService = async (service: ServiceItem) => {
    await saveService(service);
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === service.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = service;
        return copy;
      }
      return [...prev, service];
    });
  };

  const handleDeleteService = async (serviceId: string) => {
    await removeService(serviceId);
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  // Handlers for Portfolio
  const handleSavePortfolio = async (item: PortfolioItem) => {
    await savePortfolioItem(item);
    setPortfolio(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [...prev, item];
    });
  };

  const handleDeletePortfolio = async (itemId: string) => {
    await removePortfolioItem(itemId);
    setPortfolio(prev => prev.filter(p => p.id !== itemId));
  };

  // Handlers for Videos
  const handleSaveVideo = async (video: VideoItem) => {
    await saveVideo(video);
    setVideos(prev => {
      const idx = prev.findIndex(v => v.id === video.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = video;
        return copy;
      }
      return [...prev, video];
    });
  };

  const handleDeleteVideo = async (videoId: string) => {
    await removeVideo(videoId);
    setVideos(prev => prev.filter(v => v.id !== videoId));
  };

  // Handlers for Offers
  const handleSaveOffer = async (offer: OfferItem) => {
    await saveOffer(offer);
    setOffers(prev => {
      const idx = prev.findIndex(o => o.id === offer.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = offer;
        return copy;
      }
      return [...prev, offer];
    });
  };

  const handleDeleteOffer = async (offerId: string) => {
    await removeOffer(offerId);
    setOffers(prev => prev.filter(o => o.id !== offerId));
  };

  // Handlers for Requests
  const handleUpdateRequestStatus = async (
    id: string,
    status: RequestStatus,
    observacionesInternas?: string
  ) => {
    await updateServiceRequest(id, { estado: status, observacionesInternas });
    setRequests(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              estado: status,
              ...(observacionesInternas !== undefined ? { observacionesInternas } : {})
            }
          : r
      )
    );
  };

  const handleDeleteRequest = async (id: string) => {
    await removeServiceRequest(id);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  // Handlers for Site Config
  const handleSaveConfig = async (newConfig: SiteConfig) => {
    await saveSiteConfig(newConfig);
    setConfig(newConfig);
  };

  // Navigation & Access Control
  const handleOpenAdmin = () => {
    if (!userProfile) {
      setAuthReason('admin');
      setIsAuthModalOpen(true);
      return;
    }
    if (!isAdmin) {
      setIsAccountModalOpen(true);
      return;
    }
    setView('admin');
  };

  const handleOpenRequestQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceName(serviceName);
    }
    if (!userProfile) {
      setAuthReason('quote');
      setIsAuthModalOpen(true);
      return;
    }
    setIsRequestModalOpen(true);
  };

  const cleanWhatsappPhone = (config.whatsappPrincipal || '+51997534727').replace(/\D/g, '');

  // If user requested Admin view:
  if (view === 'admin') {
    if (!userProfile) {
      return (
        <div className="min-h-screen bg-[#FFF8F9] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white border border-rose-200 shadow-xl">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-xl font-bold font-serif text-[#33182B]">Acceso Restringido</h2>
            <p className="text-xs text-[#665060]">
              Debes iniciar sesión para acceder al panel de administración.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setView('public')}
                className="px-4 py-2 rounded-xl bg-rose-50 text-[#523E4D] border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors"
              >
                Volver a la Web
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-md shadow-rose-200"
              >
                Iniciar Sesión
              </button>
            </div>
            <AdminAuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              onSuccess={() => setIsAuthModalOpen(false)}
            />
          </div>
        </div>
      );
    }

    // Check if account is active
    if (!isActive) {
      return (
        <AdminPendingApproval
          config={config}
          onBackToHome={() => setView('public')}
        />
      );
    }

    // Check if user has ADMIN role
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-[#FFF8F9] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white border border-rose-200 shadow-xl">
            <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold font-serif text-[#33182B]">Acceso Limitado a Clientes</h2>
            <p className="text-xs text-[#665060]">
              Tu cuenta está registrada con rol <code className="text-amber-600 font-bold">CLIENTE</code>. Para acceder al panel de gestión, la dirección de Studio Foráneas debe asignarte el rol <code className="text-rose-600 font-bold">ADMIN</code> en Firestore.
            </p>
            <button
              onClick={() => setView('public')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-rose-200"
            >
              Volver a la Página Principal
            </button>
          </div>
        </div>
      );
    }

    // Render Admin Layout
    return (
      <AdminLayout
        config={config}
        services={services}
        portfolio={portfolio}
        videos={videos}
        offers={offers}
        requests={requests}
        onBackToPublicSite={() => setView('public')}
        onSaveService={handleSaveService}
        onDeleteService={handleDeleteService}
        onSavePortfolio={handleSavePortfolio}
        onDeletePortfolio={handleDeletePortfolio}
        onSaveVideo={handleSaveVideo}
        onDeleteVideo={handleDeleteVideo}
        onSaveOffer={handleSaveOffer}
        onDeleteOffer={handleDeleteOffer}
        onUpdateRequestStatus={handleUpdateRequestStatus}
        onDeleteRequest={handleDeleteRequest}
        onSaveConfig={handleSaveConfig}
      />
    );
  }

  // PUBLIC SITE VIEW
  return (
    <div className="min-h-screen bg-[#FFF8F9] text-[#3D2536] flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* 1. Offers / Promotions Banner */}
      <OffersBanner
        offers={offers}
        onRequestService={handleOpenRequestQuote}
        whatsappNumber={config.whatsappPrincipal}
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        config={config}
        onRequestQuote={() => handleOpenRequestQuote()}
        onOpenAdmin={handleOpenAdmin}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenRequests={() => setIsRequestsModalOpen(true)}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        isAdminLoggedIn={Boolean(userProfile && isAdmin && isActive)}
      />

      {/* 3. Hero Section */}
      <Hero
        config={config}
        onRequestQuote={() => handleOpenRequestQuote()}
        onExploreWork={() => {
          const el = document.getElementById('portafolio');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Services & Pricing Packs Section */}
      <ServicesSection
        services={services}
        onRequestService={handleOpenRequestQuote}
        config={config}
      />

      {/* 5. Visual Portfolio (Gallery & Carousel) */}
      <PortfolioSection
        items={portfolio}
        onSelectPhoto={setSelectedPhoto}
        config={config}
      />

      {/* 6. Videos & Reels Showcase */}
      <VideosSection videos={videos} config={config} />

      {/* 7. About Us Section (Nathaly & Rosa PUCP) */}
      <AboutSection config={config} />

      {/* 8. Footer */}
      <Footer
        config={config}
        services={services}
        onOpenAdmin={handleOpenAdmin}
        onRequestQuote={() => handleOpenRequestQuote()}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${cleanWhatsappPhone}?text=${encodeURIComponent('Hola Studio Foráneas, quisiera consultar sobre sus servicios.')}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir WhatsApp directo"
          className="group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300 transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline font-bold text-xs tracking-wider">
            Escríbenos por WhatsApp
          </span>
        </a>
      </div>

      {/* Modals */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedServiceName={selectedServiceName}
        services={services}
        config={config}
        onRequireLogin={() => {
          setIsRequestModalOpen(false);
          setAuthReason('quote');
          setIsAuthModalOpen(true);
        }}
      />

      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthReason(null);
        }}
        customTitle={authReason === 'quote' ? 'Inicia Sesión para Cotizar' : undefined}
        customSubtitle={
          authReason === 'quote'
            ? 'Para solicitar tu cotización y dar seguimiento a tu proyecto, inicia sesión o crea tu cuenta.'
            : undefined
        }
        onSuccess={() => {
          setIsAuthModalOpen(false);
          if (authReason === 'quote') {
            setAuthReason(null);
            setIsRequestModalOpen(true);
          } else if (authReason === 'admin') {
            setAuthReason(null);
            setView('admin');
          }
        }}
      />

      <UserRequestsModal
        isOpen={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
        onRequestNewQuote={() => handleOpenRequestQuote()}
        whatsappNumber={config.whatsappPrincipal}
      />

      <UserAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onOpenRequests={() => setIsRequestsModalOpen(true)}
        onEnterAdmin={handleOpenAdmin}
        onRequestNewQuote={() => handleOpenRequestQuote()}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
