import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserRequests } from '../firebase/dataService';
import {
  X,
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  LogOut,
  FileText,
  LayoutDashboard,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRequests: () => void;
  onEnterAdmin: () => void;
  onRequestNewQuote: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenRequests,
  onEnterAdmin,
  onRequestNewQuote
}) => {
  const { userProfile, isAdmin, isActive, logout } = useAuth();
  const [requestsCount, setRequestsCount] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && userProfile?.email) {
      fetchUserRequests(userProfile.email, userProfile.uid)
        .then(reqs => setRequestsCount(reqs.length))
        .catch(() => setRequestsCount(0));
    }
  }, [isOpen, userProfile?.email]);

  if (!isOpen || !userProfile) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const isFullAdmin = isAdmin && isActive;
  const isPendingAdmin = isAdmin && !isActive;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241235]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-rose-50 via-[#FAF8FD] to-pink-50/50 border-b border-purple-100 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-violet-600 p-0.5 shadow-md shadow-purple-500/20 shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-bold text-purple-700 text-lg uppercase font-serif">
                {userProfile.nombre ? userProfile.nombre[0] : (userProfile.email ? userProfile.email[0] : 'U')}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif text-[#241235]">
                  {userProfile.nombre || 'Usuario'}
                </h3>
                {isFullAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-extrabold uppercase tracking-wide">
                    Admin
                  </span>
                )}
                {isPendingAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold">
                    Admin Pendiente
                  </span>
                )}
                {!isAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold">
                    Cliente
                  </span>
                )}
              </div>
              <p className="text-xs text-[#554064] truncate max-w-[220px]">
                {userProfile.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* MÓDULO EXCLUSIVO PARA ADMINISTRADORES */}
          {isFullAdmin && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-lg shadow-purple-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-200" />
                  <span className="font-bold text-sm tracking-wide">Módulo Administrador</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Acceso Total
                </span>
              </div>
              <p className="text-xs text-purple-100 leading-relaxed">
                Tienes permisos de administración activos para gestionar cotizaciones, servicios, fotos y usuarios.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onEnterAdmin();
                }}
                className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-purple-700 hover:bg-purple-50 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Entrar al Panel Administrador</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          )}

          {/* MENSAJE SI ES ADMIN PERO PENDIENTE */}
          {isPendingAdmin && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold">Módulo Administrador Pendiente</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Tu solicitud de administrador fue registrada. Un administrador existente o el propietario debe aprobar tu cuenta para habilitar el panel.
              </p>
            </div>
          )}

          {/* OPCIONES COMUNES PARA TODOS LOS USUARIOS (CLIENTES Y ADMINS) */}
          <div className="space-y-2">
            {/* Mis Solicitudes */}
            <button
              onClick={() => {
                onClose();
                onOpenRequests();
              }}
              className="w-full p-3.5 rounded-2xl bg-[#FAF8FD] hover:bg-purple-50/70 border border-purple-100 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-purple-700 shadow-2xs group-hover:bg-purple-700 group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#241235]">
                    Mis Solicitudes de Cotización
                  </span>
                  <span className="block text-[11px] text-[#554064]">
                    {requestsCount !== null
                      ? `${requestsCount} solicitud${requestsCount === 1 ? '' : 'es'} registrada${requestsCount === 1 ? '' : 's'}`
                      : 'Consultar estado de tus proyectos'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-purple-700 transition-colors" />
            </button>

            {/* Solicitar nueva cotización */}
            <button
              onClick={() => {
                onClose();
                onRequestNewQuote();
              }}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-purple-50/40 border border-stone-100 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#241235]">
                    Solicitar Nueva Cotización
                  </span>
                  <span className="block text-[11px] text-[#554064]">
                    Bodas, eventos, reels o contenido
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-purple-700 transition-colors" />
            </button>
          </div>

          {/* Información del Perfil */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 text-xs text-[#554064]">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500">Estado de cuenta:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isActive ? 'Activo' : 'Inactivo'}</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500">Tipo de cuenta:</span>
              <span className="font-semibold text-stone-700">
                {isAdmin ? 'Administrador' : 'Cliente Estándar'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500">Fecha de registro:</span>
              <span className="text-stone-600">
                {userProfile.creadoEn ? new Date(userProfile.creadoEn).toLocaleDateString() : 'Reciente'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Logout */}
        <div className="p-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-purple-800 hover:text-purple-900 hover:bg-purple-100/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-purple-700" />
            <span>Cerrar Sesión</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-[#241235] text-xs font-semibold cursor-pointer transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
