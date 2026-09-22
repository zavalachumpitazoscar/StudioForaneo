import React, { useState, useEffect } from 'react';
import { ServiceItem, SiteConfig } from '../types';
import { createServiceRequest } from '../firebase/dataService';
import { useAuth } from '../context/AuthContext';
import {
  X,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Calendar,
  MapPin,
  DollarSign,
  Send,
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServiceName?: string;
  services: ServiceItem[];
  config: SiteConfig;
  onRequireLogin?: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  selectedServiceName = '',
  services,
  config,
  onRequireLogin
}) => {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    clienteNombre: userProfile?.nombre || '',
    correo: userProfile?.email || '',
    telefono: '',
    servicioSolicitado: '',
    fechaEvento: '',
    lugar: '',
    detalles: '',
    presupuestoAprox: '',
    comoNosConocio: 'Instagram'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [, setLastSubmittedId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        clienteNombre: prev.clienteNombre || userProfile.nombre || '',
        correo: userProfile.email || prev.correo || ''
      }));
    }
  }, [userProfile]);

  useEffect(() => {
    if (selectedServiceName) {
      setFormData(prev => ({ ...prev, servicioSolicitado: selectedServiceName }));
    } else if (services.length > 0 && !formData.servicioSolicitado) {
      setFormData(prev => ({ ...prev, servicioSolicitado: services[0].nombre }));
    }
  }, [selectedServiceName, services]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) {
      setErrorMsg('Debes iniciar sesión con tu cuenta de cliente antes de enviar la cotización.');
      if (onRequireLogin) onRequireLogin();
      return;
    }

    if (!formData.clienteNombre || !formData.correo || !formData.telefono || !formData.servicioSolicitado) {
      setErrorMsg('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const created = await createServiceRequest({
        clienteNombre: formData.clienteNombre,
        correo: formData.correo,
        telefono: formData.telefono,
        servicioSolicitado: formData.servicioSolicitado,
        fechaEvento: formData.fechaEvento || 'Por definir',
        lugar: formData.lugar || 'Lima / Por definir',
        detalles: formData.detalles || 'Sin detalles adicionales',
        presupuestoAprox: formData.presupuestoAprox,
        comoNosConocio: formData.comoNosConocio,
        userId: userProfile?.uid
      });

      setLastSubmittedId(created.id);
      setSubmitted(true);
    } catch {
      setErrorMsg('Hubo un problema al registrar la solicitud. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppChat = () => {
    const cleanPhone = (config.whatsappPrincipal || '+51997534727').replace(/\D/g, '');
    const message = `Hola Nathaly y Rosa, acabo de enviar una solicitud en la web sobre "${formData.servicioSolicitado}". Mi nombre es ${formData.clienteNombre}. ¿Podríamos coordinar detalles?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg(null);
    setFormData({
      clienteNombre: userProfile?.nombre || '',
      correo: userProfile?.email || '',
      telefono: '',
      servicioSolicitado: services[0]?.nombre || '',
      fechaEvento: '',
      lugar: '',
      detalles: '',
      presupuestoAprox: '',
      comoNosConocio: 'Instagram'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-rose-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-[#FFF5F7] to-[#FFF0F3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-[#33182B]">
                {submitted
                  ? '¡Solicitud Registrada!'
                  : !userProfile
                  ? 'Iniciar Sesión para Cotizar'
                  : 'Solicitar Cotización de Servicio'}
              </h3>
              <p className="text-xs text-rose-600 font-medium">
                Studio Foráneas • Comunicadoras PUCP
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full text-stone-400 hover:text-[#33182B] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!userProfile ? (
            /* USER NOT LOGGED IN - AUTH GATE REQUIRED */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center shadow-xs">
                <Lock className="w-8 h-8 text-rose-500" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl font-bold font-serif text-[#3B1E32]">
                  Debes iniciar sesión para solicitar cotización
                </h4>
                <p className="text-xs text-[#5C4054] leading-relaxed">
                  Para preparar tu presupuesto personalizado y que puedas dar seguimiento al estado de tu proyecto en tiempo real, ingresa o crea tu cuenta de cliente.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-left space-y-2.5 max-w-md mx-auto text-xs text-[#5C4054]">
                <div className="flex items-center gap-2 font-bold text-[#3B1E32]">
                  <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Beneficios de identificarte:</span>
                </div>
                <ul className="space-y-2 text-[11px] text-[#5C4054]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tu cotización se vinculará a tu cuenta y podrás verla en <strong>"Mis Solicitudes"</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Nathaly y Rosa actualizarán el estado (En comunicación, Cotizado, Confirmado) visible en tu panel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tus datos de contacto se completan automáticamente para mayor agilidad.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onRequireLogin) {
                      onRequireLogin();
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider transition-all shadow-md shadow-rose-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Iniciar Sesión / Crear Cuenta</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-rose-200 text-xs font-semibold text-[#5C4054] hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Volver a la Web
                </button>
              </div>
            </div>
          ) : submitted ? (
            /* SUCCESS STATE */
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold font-serif text-[#33182B]">
                  ¡Gracias, {formData.clienteNombre}!
                </h4>
                <p className="text-[#5E4758] text-sm max-w-md mx-auto leading-relaxed">
                  Tu solicitud para <strong className="text-rose-600">{formData.servicioSolicitado}</strong> ha sido guardada en nuestro sistema con estado <span className="text-emerald-600 font-bold">PENDIENTE</span>.
                </p>
                <p className="text-xs text-[#8A6D81]">
                  Nathaly y Rosa revisarán tus requerimientos para enviarte la propuesta personalizada a la brevedad. Puedes seguir el estado en el menú <strong>"Mis Solicitudes"</strong>.
                </p>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Respuesta más rápida por WhatsApp</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Si deseas una respuesta inmediata o tienes dudas específicas sobre fechas y locaciones, puedes escribirnos directamente por WhatsApp con tus datos prellenados:
                </p>
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-emerald-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar a Nathaly y Rosa por WhatsApp</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full border border-rose-200 text-xs font-semibold text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE - ONLY ACCESSIBLE WHEN LOGGED IN */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Authenticated User Status Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-xs text-[#5C4054]">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {userProfile.nombre ? userProfile.nombre[0].toUpperCase() : 'U'}
                  </div>
                  <span className="truncate">
                    Solicitando como: <strong className="text-[#3B1E32]">{userProfile.nombre || 'Cliente'}</strong> ({userProfile.email})
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Sesión Activa
                </span>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Camila Morales"
                      value={formData.clienteNombre}
                      onChange={e => setFormData({ ...formData, clienteNombre: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp / Teléfono */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    WhatsApp o Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +51 987 654 321"
                      value={formData.telefono}
                      onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A3243]">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="camila@ejemplo.com"
                    value={formData.correo}
                    onChange={e => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Servicio Solicitado */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A3243]">
                  Servicio de interés *
                </label>
                <select
                  value={formData.servicioSolicitado}
                  onChange={e => setFormData({ ...formData, servicioSolicitado: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre} {s.precio ? `(${s.precio})` : ''}
                    </option>
                  ))}
                  <option value="Personalizado / Mixto">Proyecto Personalizado / Asesoría</option>
                </select>
              </div>

              {/* Fecha y Lugar */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    Fecha tentativa del evento o rodaje
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ej. 15 de Noviembre 2025"
                      value={formData.fechaEvento}
                      onChange={e => setFormData({ ...formData, fechaEvento: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    Lugar o Distrito
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ej. Miraflores, Lima / En Estudio"
                      value={formData.lugar}
                      onChange={e => setFormData({ ...formData, lugar: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Presupuesto y Cómo nos conoció */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    Presupuesto estimado (Opcional)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-[#9E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ej. S/ 800 - S/ 1500"
                      value={formData.presupuestoAprox}
                      onChange={e => setFormData({ ...formData, presupuestoAprox: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A3243]">
                    ¿Cómo supiste de Studio Foráneas?
                  </label>
                  <select
                    value={formData.comoNosConocio}
                    onChange={e => setFormData({ ...formData, comoNosConocio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="Instagram">Instagram (@studioforaneas)</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Recomendación">Recomendación de un amigo</option>
                    <option value="Comunidad PUCP">Comunidad PUCP</option>
                    <option value="Búsqueda Web">Búsqueda Web</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              {/* Detalles Adicionales */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A3243]">
                  Cuéntanos más detalles de tu idea o evento
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej. Es una boda íntima de 60 personas en Cieneguilla, necesitamos fotos digitales y video resumen para redes..."
                  value={formData.detalles}
                  onChange={e => setFormData({ ...formData, detalles: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#33182B] text-xs focus:border-rose-500 focus:bg-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Botón de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-200 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Enviando solicitud...' : 'Enviar Solicitud de Cotización'}</span>
                </button>
                <p className="text-center text-[11px] text-[#8A6D81] mt-2">
                  Tus datos están protegidos. Nathaly y Rosa te responderán en menos de 24 horas.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
