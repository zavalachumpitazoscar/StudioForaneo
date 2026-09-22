import React, { useState } from 'react';
import { ServiceRequest, RequestStatus } from '../../types';
import {
  Inbox,
  Clock,
  CheckCircle,
  MessageCircle,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  DollarSign,
  Search,
  Filter,
  Save,
  X,
  Sparkles,
  FileText
} from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminRequestsProps {
  requests: ServiceRequest[];
  onUpdateStatus: (id: string, status: RequestStatus, observacionesInternas?: string) => Promise<void>;
  onDeleteRequest: (id: string) => Promise<void>;
}

export const AdminRequests: React.FC<AdminRequestsProps> = ({
  requests,
  onUpdateStatus,
  onDeleteRequest
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<RequestStatus>('PENDIENTE');
  const [isSaving, setIsSaving] = useState(false);

  // State for delete confirmation modal
  const [requestToDelete, setRequestToDelete] = useState<ServiceRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusOptions: RequestStatus[] = [
    'PENDIENTE',
    'CONTACTADO',
    'COTIZADO',
    'CONFIRMADO',
    'CANCELADO',
    'FINALIZADO'
  ];

  const filteredRequests = requests.filter(r => {
    if (filterStatus !== 'TODAS' && r.estado !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.clienteNombre.toLowerCase().includes(q);
      const matchEmail = r.correo.toLowerCase().includes(q);
      const matchService = r.servicioSolicitado.toLowerCase().includes(q);
      const matchPhone = r.telefono.toLowerCase().includes(q);
      return matchName || matchEmail || matchService || matchPhone;
    }
    return true;
  });

  const handleOpenDetail = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setCurrentStatus(req.estado);
    setInternalNotes(req.observacionesInternas || '');
  };

  const handleSaveDetails = async () => {
    if (!selectedRequest) return;
    setIsSaving(true);
    await onUpdateStatus(selectedRequest.id, currentStatus, internalNotes);
    setIsSaving(false);
    setSelectedRequest({
      ...selectedRequest,
      estado: currentStatus,
      observacionesInternas: internalNotes
    });
  };

  const handleDirectWhatsApp = (req: ServiceRequest) => {
    const cleanPhone = req.telefono.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hola ${req.clienteNombre}, te saludamos de Studio Foráneas con respecto a tu solicitud para "${req.servicioSolicitado}". ¡Queremos coordinar los detalles contigo!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleConfirmDelete = async () => {
    if (!requestToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteRequest(requestToDelete.id);
      if (selectedRequest && selectedRequest.id === requestToDelete.id) {
        setSelectedRequest(null);
      }
      setRequestToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

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
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Inbox className="w-3.5 h-3.5 text-rose-600" />
            <span>Módulo de Cotizaciones</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#3B1E32]">
            Gestión de Solicitudes de Clientes
          </h2>
          <p className="text-xs text-[#5C4054]">
            Administra los pedidos de cotización, cambia estados y contacta a los clientes vía WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200">
            {requests.length} Solicitud{requests.length !== 1 ? 'es' : ''} en total
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-rose-100 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cliente, correo o servicio..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] placeholder-stone-400 text-xs focus:border-rose-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setFilterStatus('TODAS')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'TODAS'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                : 'bg-[#FFF9FA] text-[#5C4054] border border-rose-200 hover:text-rose-600 hover:bg-rose-50'
            }`}
          >
            Todas ({requests.length})
          </button>
          {statusOptions.map((st) => {
            const count = requests.filter(r => r.estado === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                    : 'bg-[#FFF9FA] text-[#5C4054] border border-rose-200 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Requests Table / Cards */}
      <div className="space-y-3">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-100 hover:border-rose-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-base font-serif text-[#3B1E32]">
                  {req.clienteNombre}
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider ${getStatusBadge(req.estado)}`}>
                  {req.estado}
                </span>
                <span className="text-xs text-rose-600 font-bold">
                  • {req.servicioSolicitado}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5C4054]">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  {req.telefono}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  {req.correo}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  {req.fechaEvento || 'Por coordinar'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {req.lugar || 'Lima'}
                </span>
              </div>

              {req.detalles && (
                <p className="text-xs text-[#5C4054] line-clamp-1 italic bg-[#FFF9FA] border border-rose-100/70 p-2.5 rounded-xl">
                  "{req.detalles}"
                </p>
              )}

              {req.observacionesInternas && (
                <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 p-2 rounded-xl font-medium">
                  <strong>Nota interna:</strong> {req.observacionesInternas}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleDirectWhatsApp(req)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                title="Escribir por WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => handleOpenDetail(req)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Detalle</span>
              </button>

              <button
                onClick={() => setRequestToDelete(req)}
                className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                title="Eliminar solicitud"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 shadow-sm p-8 space-y-2">
            <Inbox className="w-10 h-10 text-rose-300 mx-auto" />
            <h4 className="text-sm font-bold text-[#3B1E32]">No hay solicitudes que mostrar</h4>
            <p className="text-[#5C4054] text-xs">
              No se encontraron solicitudes con el filtro o término de búsqueda aplicado.
            </p>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B1E32]/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-rose-100 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider">
                  Detalle de Solicitud #{selectedRequest.id.slice(0, 12)}
                </span>
                <h3 className="text-xl font-bold font-serif text-[#3B1E32]">
                  {selectedRequest.clienteNombre}
                </h3>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-[#3B1E32] hover:bg-rose-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Servicio Solicitado:</span>
                <span className="text-[#3B1E32] font-bold text-sm">{selectedRequest.servicioSolicitado}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Teléfono / WhatsApp:</span>
                <span className="text-[#3B1E32] font-bold">{selectedRequest.telefono}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Correo Electrónico:</span>
                <span className="text-[#3B1E32]">{selectedRequest.correo}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Fecha Estimada del Evento:</span>
                <span className="text-[#3B1E32]">{selectedRequest.fechaEvento || 'No especificada'}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Lugar / Locación:</span>
                <span className="text-[#3B1E32]">{selectedRequest.lugar || 'No especificado'}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100">
                <span className="text-[#6E4965] font-semibold block">Presupuesto Aprox:</span>
                <span className="text-[#3B1E32]">{selectedRequest.presupuestoAprox || 'No especificado'}</span>
              </div>

              <div className="space-y-1 p-3.5 rounded-2xl bg-[#FFF9FA] border border-rose-100 sm:col-span-2">
                <span className="text-[#6E4965] font-semibold block">¿Cómo nos conoció?:</span>
                <span className="text-[#3B1E32]">{selectedRequest.comoNosConocio || 'Instagram / Recomendación'}</span>
              </div>
            </div>

            {/* Mensaje original */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#3B1E32]">
                Detalles enviados por el cliente:
              </span>
              <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-xs text-[#5C4054] leading-relaxed italic">
                {selectedRequest.detalles || 'Sin detalles adicionales especificados.'}
              </div>
            </div>

            {/* Status Switcher & WhatsApp */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3B1E32]">
                  Estado de la Solicitud
                </label>
                <select
                  value={currentStatus}
                  onChange={e => setCurrentStatus(e.target.value as RequestStatus)}
                  className="w-full p-2.5 rounded-xl bg-white border border-rose-200 text-[#3B1E32] text-xs font-semibold focus:border-rose-500 focus:outline-none shadow-2xs"
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => handleDirectWhatsApp(selectedRequest)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Observaciones Internas */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#3B1E32]">
                Observaciones Internas / Notas Privadas (Solo visibles para administradoras)
              </label>
              <textarea
                rows={3}
                placeholder="Ej. Se envió cotización de S/. 700. Llamada agendada para el jueves..."
                value={internalNotes}
                onChange={e => setInternalNotes(e.target.value)}
                className="w-full p-3 rounded-2xl bg-white border border-rose-200 text-[#3B1E32] placeholder-stone-400 text-xs focus:border-rose-500 focus:outline-none resize-none shadow-2xs"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-rose-100">
              <button
                onClick={() => setRequestToDelete(selectedRequest)}
                className="text-xs text-red-600 hover:text-red-700 hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar solicitud</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-[#3B1E32] text-xs font-semibold cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleSaveDetails}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-200 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={Boolean(requestToDelete)}
        title="¿Eliminar Solicitud de Cotización?"
        message="¿Estás segura de que deseas eliminar permanentemente esta solicitud? Esta acción no se puede deshacer."
        confirmLabel="Sí, Eliminar Solicitud"
        isDeleting={isDeleting}
        itemDetails={
          requestToDelete
            ? [
                { label: 'Cliente', value: requestToDelete.clienteNombre },
                { label: 'Servicio', value: requestToDelete.servicioSolicitado },
                { label: 'Teléfono', value: requestToDelete.telefono },
                { label: 'Fecha Evento', value: requestToDelete.fechaEvento || 'Por definir' },
              ]
            : undefined
        }
        onConfirm={handleConfirmDelete}
        onClose={() => setRequestToDelete(null)}
      />
    </div>
  );
};
