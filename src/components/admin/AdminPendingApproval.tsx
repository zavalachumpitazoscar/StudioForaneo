import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, ShieldAlert, LogOut, MessageCircle, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../../types';

interface AdminPendingApprovalProps {
  config: SiteConfig;
  onBackToHome: () => void;
}

export const AdminPendingApproval: React.FC<AdminPendingApprovalProps> = ({ config, onBackToHome }) => {
  const { userProfile, logout, refreshProfile } = useAuth();
  const [checking, setChecking] = useState(false);
  const [checkMsg, setCheckMsg] = useState<string | null>(null);
  const phone = (config.whatsappPrincipal || '+51997534727').replace(/\D/g, '');

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `Hola Nathaly/Rosa, me he registrado como Administrador en Studio Foráneas con el correo ${userProfile?.email}. Por favor activen mi cuenta de acceso en el panel de Equipo.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    setCheckMsg(null);
    try {
      await refreshProfile();
      if (userProfile?.activo) {
        setCheckMsg('¡Cuenta activada! Redirigiendo...');
      } else {
        setCheckMsg('Tu cuenta aún está inactiva. Cuando otro admin o Firebase te active, presiona aquí nuevamente.');
      }
    } catch {
      setCheckMsg('Error al consultar el estado. Intenta nuevamente.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Rol Administrador (Inactivo)
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            Cuenta Pendiente de Activación
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Hola <strong className="text-white">{userProfile?.nombre || userProfile?.email}</strong>, tu cuenta de administrador se creó correctamente, pero por seguridad se encuentra <span className="text-amber-400 font-semibold">INACTIVA</span> por defecto.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 text-left space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>¿Quién puede activar tu cuenta?</span>
          </div>
          <p className="leading-relaxed">
            • <strong>Otro administrador activo:</strong> Puede ingresar al panel en la sección <strong>"Equipo & Usuarios"</strong> y presionar el botón <em>"Aprobar y Activar"</em>.
          </p>
          <p className="leading-relaxed">
            • <strong>En Firebase Console:</strong> El dueño del proyecto puede cambiar tu campo <code className="text-purple-500">activo: true</code> en la colección de Firestore <code className="text-purple-500">users</code>.
          </p>
        </div>

        {checkMsg && (
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
            {checkMsg}
          </div>
        )}

        <div className="space-y-3 pt-1">
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-500 text-white font-semibold text-xs tracking-wider transition-colors cursor-pointer shadow-md shadow-purple-950 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Comprobando estado...' : 'Comprobar si ya fui activado'}</span>
          </button>

          <button
            onClick={handleWhatsAppNotify}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Notificar a las administradoras por WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={onBackToHome}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ir al Sitio Web</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-rose-900/50 hover:bg-rose-950/30 text-purple-500 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
