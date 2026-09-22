import React, { useState, useEffect } from 'react';
import { ServiceRequest, RequestStatus } from '../types';
import { fetchUserRequests } from '../firebase/dataService';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  MessageCircle,
  RefreshCw,
  FileText,
  AlertCircle,
  Tag,
  DollarSign
} from 'lucide-react';

interface UserRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestNewQuote: () => void;
  whatsappNumber?: string;
}

export const UserRequestsModal: React.FC<UserRequestsModalProps> = ({
  isOpen,
  onClose,
  onRequestNewQuote,
  whatsappNumber = '+51997534727'
}) => {
  const { userProfile } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    if (!userProfile?.email) return;
    setLoading(true);
    try {
      const data = await fetchUserRequests(userProfile.email, userProfile.uid);
      setRequests(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && userProfile?.email) {
      loadRequests();
    }
  }, [isOpen, userProfile?.email]);

  if (!isOpen) return null;

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'PENDIENTE':
        return {
          label: 'Pendiente de Revisión',
          classes: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'CONTACTADO':
        return {
          label: 'En Comunicación',
          classes: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500'
        };
      case 'COTIZADO':
        return {
          label: 'Cotización Enviada',
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-500'
        };
      case 'CONFIRMADO':
        return {
          label: 'Confirmado / Agendado',
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'CANCELADO':
        return {
          label: 'Cancelado',
          classes: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'FINALIZADO':
        return {
          label: 'Finalizado con Éxito',
          classes: 'bg-neutral-100 text-neutral-800 border-neutral-200',
          dot: 'bg-neutral-500'
        };
      default:
        return {
          label: status,
          classes: 'bg-neutral-100 text-neutral-700 border-neutral-200',
          dot: 'bg-neutral-400'
        };
    }
  };

  const handleWhatsAppConsult = (req: ServiceRequest) => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    const message = `Hola Studio Foráneas, les escribe ${userProfile?.nombre || 'un cliente'}. Quisiera consultar el avance de mi solicitud de cotización para "${req.servicioSolicitado}" (Fecha evento: ${req.fechaEvento}, ID: ${req.id}).`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B1E32]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-white border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100/80 border border-rose-200 flex items-center justify-center text-rose-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-[#3B1E32]">
                Mis Solicitudes de Cotización
              </h3>
              <p className="text-xs text-[#5C4054]">
                Historial y estado de tus proyectos consultados con Studio Foráneas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={loadRequests}
              disabled={loading}
              title="Actualizar estado"
              className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-rose-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-medium text-[#5C4054]">
                Cargando tus solicitudes...
              </p>
            </div>
          ) : requests.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 mx-auto flex items-center justify-center text-rose-400">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#3B1E32]">
                  Aún no has enviado solicitudes de cotización
                </p>
                <p className="text-xs text-[#5C4054] max-w-sm mx-auto">
                  ¿Tienes un evento, boda, sesión fotográfica o proyecto de video en mente? Envíanos tu idea para cotizarte sin compromiso.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onRequestNewQuote();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Solicitar una Cotización Ahora</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map(req => {
                const statusInfo = getStatusBadge(req.estado);

                return (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-white border border-rose-100/90 hover:border-rose-300 hover:shadow-md transition-all space-y-3 relative group"
                  >
                    {/* Header line: Service & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                          Servicio Solicitado
                        </span>
                        <h4 className="text-base font-bold font-serif text-[#3B1E32]">
                          {req.servicioSolicitado}
                        </h4>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold self-start sm:self-auto ${statusInfo.classes}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                        <span>{statusInfo.label}</span>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C4054] bg-[#FFF9FA] p-3 rounded-xl border border-rose-100/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>Fecha Evento: <strong>{req.fechaEvento || 'Por coordinar'}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>Lugar: <strong>{req.lugar || 'Lima / Por definir'}</strong></span>
                      </div>
                      {req.presupuestoAprox && (
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <DollarSign className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Presupuesto Aprox: <strong>{req.presupuestoAprox}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Request Details */}
                    {req.detalles && (
                      <div className="text-xs text-[#5C4054] bg-stone-50/60 p-3 rounded-xl border border-stone-100">
                        <p className="font-semibold text-[#3B1E32] mb-0.5">Detalles del proyecto:</p>
                        <p className="line-clamp-3 text-stone-600">{req.detalles}</p>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-rose-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="text-[11px] text-stone-400">
                        Enviada el: {req.creadoEn ? new Date(req.creadoEn).toLocaleDateString() : 'Reciente'} • ID: <code className="text-[10px] text-stone-500">{req.id}</code>
                      </span>

                      <button
                        onClick={() => handleWhatsAppConsult(req)}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Consultar por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onRequestNewQuote();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Nueva Solicitud de Cotización</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-[#3B1E32] text-xs font-semibold cursor-pointer transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
