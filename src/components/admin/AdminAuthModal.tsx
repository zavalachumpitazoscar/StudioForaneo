import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  Key,
  User,
  X,
  AlertCircle,
  CheckCircle,
  ShieldCheck,
  ExternalLink,
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { firebaseConfig } from '../../firebase/config';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  customTitle?: string;
  customSubtitle?: string;
  defaultMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  customTitle,
  customSubtitle,
  defaultMode = 'login',
  onSuccess
}) => {
  const { login, loginWithGoogle, register, resetPassword, isFirebase } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>(defaultMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [registerAsAdmin, setRegisterAsAdmin] = useState(false);
  const [createdPendingAdmin, setCreatedPendingAdmin] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync mode if defaultMode changes
  React.useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setError(null);
      setSuccess(null);
      setCreatedPendingAdmin(null);
    }
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    const res = await loginWithGoogle();
    if (!res.success) {
      setError(res.error || 'No se pudo iniciar sesión con Google');
    } else {
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreatedPendingAdmin(null);
    setLoading(true);

    if (mode === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || 'Credenciales inválidas');
      } else {
        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
        }
      }
    } else if (mode === 'register') {
      if (!nombre.trim()) {
        setError('Por favor ingresa tu nombre');
        setLoading(false);
        return;
      }
      const res = await register(email, password, nombre, registerAsAdmin);
      if (!res.success) {
        setError(res.error || 'No se pudo completar el registro');
      } else {
        if (res.isPendingAdmin) {
          setCreatedPendingAdmin(true);
          setSuccess('Cuenta de Administrador creada. Por seguridad, está pendiente de activación.');
        } else {
          setCreatedPendingAdmin(false);
          setSuccess('¡Cuenta creada con éxito! Tu cuenta está activa.');
          setTimeout(() => {
            if (onSuccess) {
              onSuccess();
            } else {
              onClose();
            }
          }, 1200);
        }
      }
    } else if (mode === 'reset') {
      const res = await resetPassword(email);
      if (!res.success) {
        setError(res.error || 'No se pudo enviar el correo');
      } else {
        setSuccess('Se han enviado instrucciones para restablecer tu contraseña a tu correo.');
      }
    }

    setLoading(false);
  };

  const getTitle = () => {
    if (customTitle && mode === 'login') return customTitle;
    if (mode === 'login') return 'Iniciar Sesión';
    if (mode === 'register') return 'Crear Cuenta';
    return 'Recuperar Contraseña';
  };

  const getSubtitle = () => {
    if (customSubtitle && mode === 'login') return customSubtitle;
    if (mode === 'login') return 'Ingresa para gestionar tus solicitudes o administrar el estudio';
    if (mode === 'register') return 'Crea tu cuenta para cotizar servicios y dar seguimiento';
    return 'Te enviaremos un enlace seguro para restablecer tu clave';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-rose-100 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-[#3B1E32] hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 mx-auto shadow-md shadow-rose-200">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-rose-600">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#3B1E32]">
            {getTitle()}
          </h3>
          <p className="text-xs text-[#5C4054] max-w-xs mx-auto leading-relaxed">
            {getSubtitle()}
          </p>
        </div>

        {/* Notification message */}
        {error && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Error</span>
                <span className="leading-relaxed">{error}</span>
              </div>
            </div>

            {(error.includes('consola de Firebase') || error.includes('operation-not-allowed') || error.includes('no está habilitado')) && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Configuración en Firebase Console</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Para habilitar el login con correo o Google, activa los métodos en Authentication &gt; Sign-in method en tu proyecto <strong>{firebaseConfig?.projectId}</strong>.
                </p>
                <a
                  href={`https://console.firebase.google.com/project/${firebaseConfig?.projectId || 'salaviplatam-5d06b'}/authentication/providers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wide transition-all shadow-sm w-full justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Firebase Console</span>
                </a>
              </div>
            )}
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Google Sign-in */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-rose-50/50 border border-rose-200 text-[#3B1E32] font-semibold text-xs tracking-wide flex items-center justify-center gap-2.5 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-rose-100"></div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">o con correo</span>
            <div className="h-[1px] flex-1 bg-rose-100"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Nathaly Vergara"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none placeholder:text-stone-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#3B1E32]">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Contraseña
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-[11px] text-rose-600 hover:text-rose-700 hover:underline font-medium cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs focus:border-rose-500 focus:outline-none placeholder:text-stone-400"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100 space-y-1.5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={registerAsAdmin}
                  onChange={e => setRegisterAsAdmin(e.target.checked)}
                  className="mt-0.5 rounded border-rose-300 text-rose-600 focus:ring-rose-500 bg-white w-4 h-4 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3B1E32]">
                    <ShieldCheck className="w-4 h-4 text-rose-500" />
                    <span>Crear como Administrador</span>
                    {registerAsAdmin && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                        Inactivo por defecto
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5C4054] leading-relaxed">
                    {registerAsAdmin
                      ? '⚠️ Cuenta de Administrador: Por seguridad se crea en estado inactivo. Un administrador existente o en Firebase Console deberá activarla.'
                      : '✅ Cuenta de Cliente: Queda activa inmediatamente para cotizar y ver tus solicitudes.'}
                  </p>
                </div>
              </label>
            </div>
          )}

          {createdPendingAdmin ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Cuenta de Administrador Pendiente</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                ¡Tu usuario fue creado exitosamente! Como solicitaste rol de Administrador, tu cuenta quedó en estado <strong>inactivo</strong> por seguridad.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Entendido / Cerrar
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-rose-200"
            >
              {loading
                ? 'Procesando...'
                : mode === 'login'
                ? 'Iniciar Sesión'
                : mode === 'register'
                ? (registerAsAdmin ? 'Crear como Administrador (Inactivo)' : 'Crear Cuenta de Cliente (Activa)')
                : 'Enviar Instrucciones'}
            </button>
          )}
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center text-xs text-[#5C4054] border-t border-rose-100 pt-3">
          {mode === 'login' ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
