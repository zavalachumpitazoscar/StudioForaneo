import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Menu,
  X,
  MessageCircle,
  Lock,
  Sparkles,
  User,
  LogOut,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { SiteConfig } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  config: SiteConfig;
  onRequestQuote: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenRequests: () => void;
  onOpenAccount: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onRequestQuote,
  onOpenAdmin,
  onOpenAuth,
  onOpenRequests,
  onOpenAccount,
}) => {
  const { userProfile, isAdmin, isActive, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Videos & Reels', href: '#videos' },
    { label: 'Sobre Nosotras', href: '#nosotras' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleWhatsAppClick = () => {
    const cleanPhone = (config.whatsappPrincipal || '+51997534727').replace(/\D/g, '');
    const text = encodeURIComponent('Hola Nathaly y Rosa, quisiera consultar sobre sus servicios de producción audiovisual y redes sociales.');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleLogoutClick = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
  };

  const isFullAdmin = isAdmin && isActive;

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF9FA]/95 backdrop-blur-md border-b border-rose-100 shadow-sm shadow-rose-950/5 py-3'
          : 'bg-[#FFF9FA]/85 backdrop-blur-sm border-b border-rose-100/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-md shadow-rose-200">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center group-hover:bg-rose-50/50 transition-colors">
              <Camera className="w-5 h-5 text-rose-600 group-hover:text-rose-500 transition-colors" />
            </div>
          </div>
          <div>
            <span className="block text-lg sm:text-xl font-bold tracking-tight font-serif text-[#3B1E32]">
              {config.nombreComercial || 'Studio Foráneas'}
            </span>
            <span className="block text-[10px] tracking-widest text-rose-600 font-semibold uppercase">
              Producción Audiovisual PUCP
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4054]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-rose-600 transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* WhatsApp Direct Chat */}
          <button
            onClick={handleWhatsAppClick}
            aria-label="Contactar por WhatsApp"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* Request Quote Button */}
          <button
            onClick={onRequestQuote}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold tracking-wider transition-all duration-200 shadow-md shadow-rose-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solicitar Cotización</span>
          </button>

          {/* USER ACCOUNT / LOGIN CONTROLS */}
          {!userProfile ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 bg-white hover:bg-rose-50 text-[#3B1E32] hover:text-rose-600 text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <User className="w-4 h-4 text-rose-500" />
              <span>Iniciar Sesión</span>
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-rose-200/90 bg-white hover:bg-rose-50 text-[#3B1E32] text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 flex items-center justify-center text-white text-xs font-bold font-serif shadow-2xs">
                  {userProfile.nombre ? userProfile.nombre[0].toUpperCase() : (userProfile.email ? userProfile.email[0].toUpperCase() : 'U')}
                </div>
                <div className="text-left hidden xl:block">
                  <span className="block font-bold text-xs text-[#3B1E32] max-w-[100px] truncate leading-tight">
                    {userProfile.nombre || userProfile.email.split('@')[0]}
                  </span>
                  <span className={`block text-[9px] font-extrabold uppercase tracking-wider ${isAdmin ? 'text-rose-600' : 'text-stone-500'}`}>
                    {isAdmin ? 'Admin' : 'Cliente'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180 text-rose-600' : ''}`} />
              </button>

              {/* USER DROPDOWN MENU */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl border border-rose-100 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 p-2 space-y-1 text-left">
                  {/* Header info */}
                  <div className="p-3 bg-gradient-to-br from-rose-50/80 to-[#FFF9FA] rounded-2xl border border-rose-100/60 mb-2">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-[#3B1E32] truncate">
                        {userProfile.nombre || 'Mi Perfil'}
                      </span>
                      {isAdmin ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-extrabold uppercase tracking-wider">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-[9px] font-bold uppercase">
                          Cliente
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5C4054] truncate">
                      {userProfile.email}
                    </p>
                  </div>

                  {/* ADMIN MODULE BUTTON (SOLO PARA ADMINISTRADORES ACTIVOS) */}
                  {isFullAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white flex items-center gap-3 transition-all cursor-pointer shadow-md shadow-rose-200 text-left"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-bold text-xs tracking-wide">
                          Módulo Administrador
                        </span>
                        <span className="block text-[10px] text-rose-100 truncate">
                          Entrar al panel de gestión
                        </span>
                      </div>
                    </button>
                  )}

                  {/* ADMIN PENDIENTE NOTICE */}
                  {isAdmin && !isActive && (
                    <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        <span>Admin Pendiente</span>
                      </div>
                      <p className="text-[10px] text-amber-800">
                        Tu acceso como administrador está en proceso de aprobación.
                      </p>
                    </div>
                  )}

                  {/* GENERAL OPTIONS FOR CLIENTS AND ADMINS */}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenRequests();
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-rose-50/70 text-[#3B1E32] flex items-center gap-3 transition-colors cursor-pointer text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-bold text-xs">
                        Mis Solicitudes
                      </span>
                      <span className="block text-[10px] text-[#5C4054]">
                        Ver estado de mis cotizaciones
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenAccount();
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-rose-50/70 text-[#3B1E32] flex items-center gap-3 transition-colors cursor-pointer text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-stone-50 text-stone-600 flex items-center justify-center shrink-0 border border-stone-100">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-bold text-xs">
                        Información de Cuenta
                      </span>
                      <span className="block text-[10px] text-[#5C4054]">
                        Ver detalles de mi perfil
                      </span>
                    </div>
                  </button>

                  <div className="pt-1 border-t border-stone-100">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full p-2 rounded-xl hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {userProfile ? (
            <button
              onClick={onOpenAccount}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-xs"
              title="Mi Cuenta"
            >
              {userProfile.nombre ? userProfile.nombre[0].toUpperCase() : 'U'}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-2 text-stone-600 hover:text-rose-600"
              title="Iniciar Sesión"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="p-2.5 rounded-xl bg-white text-[#3B1E32] hover:text-rose-600 border border-rose-200 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF9FA]/98 backdrop-blur-xl border-b border-rose-100 px-6 py-6 space-y-4 shadow-xl text-[#3B1E32]">
          {/* User state in mobile menu */}
          {userProfile ? (
            <div className="p-4 bg-white rounded-2xl border border-rose-100 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-bold text-xs text-[#3B1E32]">
                    {userProfile.nombre || 'Mi Cuenta'}
                  </span>
                  <span className="block text-[11px] text-[#5C4054]">
                    {userProfile.email}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-stone-100 text-stone-600'}`}>
                  {isAdmin ? 'Admin' : 'Cliente'}
                </span>
              </div>

              {/* Mobile Admin Module Button */}
              {isFullAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Entrar al Módulo Administrador</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRequests();
                  }}
                  className="p-2 rounded-xl bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-100"
                >
                  Mis Solicitudes
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="p-2 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs border border-stone-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-rose-200 text-[#3B1E32] font-bold text-xs shadow-xs"
            >
              <User className="w-4 h-4 text-rose-500" />
              <span>Iniciar Sesión / Registrarse</span>
            </button>
          )}

          <nav className="flex flex-col space-y-2 text-base">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#5C4054] hover:text-rose-600 py-2 border-b border-rose-100/60 transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-md shadow-rose-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>Solicitar Cotización</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
