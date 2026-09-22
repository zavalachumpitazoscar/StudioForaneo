import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../../types';
import { fetchUsersList, saveUserProfile, deleteUserProfile } from '../../firebase/dataService';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  ShieldAlert,
  Key,
  RefreshCw,
  Info,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  UserPlus,
  Users,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const AdminUsers: React.FC = () => {
  const { userProfile: currentUserProfile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUid, setUpdatingUid] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'admins' | 'clients'>('all');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Deletion modal state
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await fetchUsersList();
      setUsers(list);
    } catch {
      setFeedbackMessage({ type: 'error', text: 'Error al cargar la lista de usuarios.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  const handleActivateAdmin = async (user: UserProfile) => {
    setUpdatingUid(user.uid);
    try {
      const updated: UserProfile = { ...user, rol: 'ADMIN', activo: true };
      await saveUserProfile(updated);
      setUsers(prev => prev.map(u => (u.uid === user.uid ? updated : u)));
      showToast(`¡Administrador ${user.nombre || user.email} activado exitosamente! Ya tiene acceso al panel.`);
    } catch {
      showToast('Error al activar administrador.', 'error');
    } finally {
      setUpdatingUid(null);
    }
  };

  const handleConvertToClient = async (user: UserProfile) => {
    setUpdatingUid(user.uid);
    try {
      const updated: UserProfile = { ...user, rol: 'CLIENTE', activo: true };
      await saveUserProfile(updated);
      setUsers(prev => prev.map(u => (u.uid === user.uid ? updated : u)));
      showToast(`El usuario ${user.nombre || user.email} fue asignado como Cliente activo.`);
    } catch {
      showToast('Error al cambiar rol a cliente.', 'error');
    } finally {
      setUpdatingUid(null);
    }
  };

  const handleToggleActive = async (user: UserProfile) => {
    setUpdatingUid(user.uid);
    try {
      const newStatus = !user.activo;
      const updated: UserProfile = { ...user, activo: newStatus };
      await saveUserProfile(updated);
      setUsers(prev => prev.map(u => (u.uid === user.uid ? updated : u)));
      showToast(`Estado de ${user.nombre || user.email} cambiado a: ${newStatus ? 'ACTIVO' : 'INACTIVO'}`);
    } catch {
      showToast('Error al actualizar estado.', 'error');
    } finally {
      setUpdatingUid(null);
    }
  };

  const handleRoleChange = async (user: UserProfile, newRole: UserRole) => {
    setUpdatingUid(user.uid);
    try {
      const updated: UserProfile = { ...user, rol: newRole };
      await saveUserProfile(updated);
      setUsers(prev => prev.map(u => (u.uid === user.uid ? updated : u)));
      showToast(`Rol de ${user.nombre || user.email} cambiado a: ${newRole}`);
    } catch {
      showToast('Error al actualizar rol.', 'error');
    } finally {
      setUpdatingUid(null);
    }
  };

  const handleConfirmDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteUserProfile(userToDelete.uid);
      setUsers(prev => prev.filter(u => u.uid !== userToDelete.uid));
      showToast(`Usuario ${userToDelete.nombre || userToDelete.email} eliminado definitivamente.`);
      setUserToDelete(null);
    } catch {
      showToast('Error al eliminar usuario de Firebase.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const pendingAdmins = users.filter(u => u.rol === 'ADMIN' && !u.activo);
  const activeAdmins = users.filter(u => u.rol === 'ADMIN' && u.activo);
  const clientsList = users.filter(u => u.rol === 'CLIENTE');

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      (u.nombre || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.uid.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'pending') return u.rol === 'ADMIN' && !u.activo;
    if (activeFilter === 'admins') return u.rol === 'ADMIN';
    if (activeFilter === 'clients') return u.rol === 'CLIENTE';
    return true;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-rose-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-rose-600" />
            <span>Control de Roles & Accesos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#3B1E32]">
            Gestión de Equipo & Activación de Administradores
          </h2>
          <p className="text-xs text-[#5C4054]">
            Control de usuarios registrados en Firebase, aprobación de nuevos administradores y eliminación segura.
          </p>
        </div>

        <button
          onClick={loadUsers}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFF9FA] hover:bg-rose-50 border border-rose-200 text-[#3B1E32] text-xs font-semibold cursor-pointer transition-colors shrink-0 shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-rose-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar Lista</span>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-md shadow-emerald-100'
              : 'bg-rose-50 text-rose-900 border border-rose-300 shadow-md shadow-rose-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* DEDICATED MODULE: Activación de Administradores Inactivos */}
      <div className="rounded-3xl bg-white border border-rose-100 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-[#3B1E32] flex items-center gap-2">
                <span>Módulo de Aprobación de Administradores</span>
                {pendingAdmins.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
                    {pendingAdmins.length} Pendiente{pendingAdmins.length > 1 ? 's' : ''}
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-[#5C4054]">
                Los usuarios que se registraron solicitando permisos de administrador inician inactivos por seguridad hasta que los apruebes aquí.
              </p>
            </div>
          </div>
        </div>

        {pendingAdmins.length > 0 ? (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Hay <strong>{pendingAdmins.length} cuenta(s)</strong> de administrador esperando tu aprobación para ingresar al panel.
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
              {pendingAdmins.map(u => (
                <div
                  key={u.uid}
                  className="p-4 rounded-2xl bg-[#FFF9FA] border border-amber-200 space-y-3 relative overflow-hidden group hover:border-amber-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#3B1E32]">
                          {u.nombre || 'Administrador sin nombre'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold">
                          Inactivo
                        </span>
                      </div>
                      <p className="text-xs text-[#5C4054]">{u.email}</p>
                      <p className="text-[10px] text-stone-400">
                        Registrado: {u.creadoEn ? new Date(u.creadoEn).toLocaleString() : 'Reciente'}
                      </p>
                    </div>

                    <button
                      onClick={() => setUserToDelete(u)}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-100/60">
                    <button
                      onClick={() => handleActivateAdmin(u)}
                      disabled={updatingUid === u.uid}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-emerald-200 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aprobar y Activar Admin</span>
                    </button>

                    <button
                      onClick={() => handleConvertToClient(u)}
                      disabled={updatingUid === u.uid}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-[#3B1E32] text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                      title="Convertir en usuario cliente normal"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-rose-500" />
                      <span>Solo Cliente</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-100 text-xs text-[#5C4054] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-[#3B1E32]">No hay administradores pendientes de activación.</p>
              <p className="text-[11px] text-[#5C4054]">
                Todos los administradores registrados actualmente están activos y tienen acceso regular al panel.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FIREBASE CONSOLE MANUAL ACTIVATION GUIDE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50/70 to-pink-50/40 border border-rose-200/80 text-xs text-[#5C4054] space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-rose-700 font-bold uppercase tracking-wider text-[11px]">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Opción 2: Activar manualmente desde Firebase Console</span>
          </div>
          <a
            href="https://console.firebase.google.com/project/salaviplatam-5d06b/firestore/databases/-default-/data/~2Fusers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 font-bold hover:underline"
          >
            <span>Ir a Colección users</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="leading-relaxed text-[11px] text-[#5C4054]">
          Si prefieres activarlo o editarlo directamente en la base de datos de Google Firebase:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-rose-200/80 space-y-1 shadow-2xs">
            <span className="text-rose-600 font-bold text-xs">Paso 1</span>
            <p className="text-[11px] text-[#5C4054]">
              Abre <strong>Firestore Database</strong> en tu consola de Firebase <code className="text-rose-600 font-mono text-[10px]">salaviplatam-5d06b</code>.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-rose-200/80 space-y-1 shadow-2xs">
            <span className="text-rose-600 font-bold text-xs">Paso 2</span>
            <p className="text-[11px] text-[#5C4054]">
              Entra a la colección <strong>users</strong> y haz clic en el documento con el UID del usuario.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-rose-200/80 space-y-1 shadow-2xs">
            <span className="text-rose-600 font-bold text-xs">Paso 3</span>
            <p className="text-[11px] text-[#5C4054]">
              Cambia el campo <code className="text-emerald-700 font-mono font-bold text-[10px]">activo: true</code> y verifica que <code className="text-rose-600 font-mono font-bold text-[10px]">rol: "ADMIN"</code>.
            </p>
          </div>
        </div>
      </div>

      {/* ALL USERS DIRECTORY */}
      <div className="rounded-3xl bg-white border border-rose-100 overflow-hidden space-y-4 p-5 sm:p-6 shadow-sm">
        {/* Filter bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                  : 'bg-[#FFF9FA] text-[#5C4054] hover:text-rose-600 border border-rose-200'
              }`}
            >
              Todos ({users.length})
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'pending'
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-200'
                  : 'bg-[#FFF9FA] text-[#5C4054] hover:text-amber-700 border border-rose-200'
              }`}
            >
              Admins Pendientes ({pendingAdmins.length})
            </button>
            <button
              onClick={() => setActiveFilter('admins')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'admins'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                  : 'bg-[#FFF9FA] text-[#5C4054] hover:text-rose-600 border border-rose-200'
              }`}
            >
              Administradores ({activeAdmins.length + pendingAdmins.length})
            </button>
            <button
              onClick={() => setActiveFilter('clients')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'clients'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm shadow-rose-200'
                  : 'bg-[#FFF9FA] text-[#5C4054] hover:text-rose-600 border border-rose-200'
              }`}
            >
              Clientes ({clientsList.length})
            </button>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FFF9FA] border border-rose-200 text-[#3B1E32] text-xs placeholder:text-stone-400 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Users List Table */}
        <div className="divide-y divide-rose-100 border border-rose-100 rounded-2xl overflow-hidden bg-white">
          {filteredUsers.map(u => {
            const isSelf = u.uid === currentUserProfile?.uid;
            const isOwner = u.email?.toLowerCase() === 'zavalachumpitazoscar@gmail.com';

            return (
              <div
                key={u.uid}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FFF9FA]/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm font-serif text-[#3B1E32]">
                      {u.nombre || u.email}
                    </span>
                    {isSelf && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-200">
                        Tu Cuenta Actual
                      </span>
                    )}
                    {isOwner && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200">
                        Propietario Principal
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      u.rol === 'ADMIN'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}>
                      {u.rol}
                    </span>
                  </div>
                  <div className="text-xs text-[#5C4054] flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>Email: <strong className="text-[#3B1E32]">{u.email}</strong></span>
                    <span>UID: <code className="text-[10px] text-stone-400 font-mono">{u.uid.slice(0, 15)}...</code></span>
                    <span>Registrado: {u.creadoEn ? new Date(u.creadoEn).toLocaleDateString() : 'Reciente'}</span>
                  </div>
                </div>

                {/* Role and Status Controls */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {/* Role Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#6E4965] font-semibold">Rol:</span>
                    <select
                      value={u.rol}
                      disabled={updatingUid === u.uid || isSelf || isOwner}
                      onChange={e => handleRoleChange(u, e.target.value as UserRole)}
                      className="bg-[#FFF9FA] border border-rose-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 text-[#3B1E32] focus:outline-none focus:border-rose-500 disabled:opacity-50 cursor-pointer shadow-2xs"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="CLIENTE">CLIENTE</option>
                    </select>
                  </div>

                  {/* Active / Inactive Button */}
                  <button
                    onClick={() => handleToggleActive(u)}
                    disabled={updatingUid === u.uid || isSelf || isOwner}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer border ${
                      u.activo
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {u.activo ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Activo</span>
                      </>
                    ) : (
                      <>
                        <UserX className="w-3.5 h-3.5 text-amber-600" />
                        <span>Inactivo (Pendiente)</span>
                      </>
                    )}
                  </button>

                  {/* Delete User Button */}
                  <button
                    onClick={() => setUserToDelete(u)}
                    disabled={isSelf || isOwner}
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      isSelf || isOwner
                        ? 'text-stone-300 border-transparent cursor-not-allowed opacity-40'
                        : 'text-stone-400 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-200'
                    }`}
                    title={isSelf ? 'No puedes eliminar tu propia cuenta en uso' : isOwner ? 'Cuenta protegida de propietario' : 'Eliminar usuario'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-xs text-[#5C4054] space-y-1">
              <p className="font-semibold text-[#3B1E32]">No se encontraron usuarios</p>
              <p className="text-[11px] text-stone-400">Prueba ajustando el filtro de búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRM DELETE USER MODAL */}
      <ConfirmDeleteModal
        isOpen={Boolean(userToDelete)}
        title={`¿Eliminar ${userToDelete?.rol === 'ADMIN' ? 'Administrador' : 'Usuario'}?`}
        message="¿Estás segura de que deseas eliminar permanentemente a este usuario? Perderá todos sus accesos al sistema y se borrará de Firebase."
        confirmLabel="Sí, Eliminar Usuario"
        isDeleting={isDeleting}
        itemDetails={
          userToDelete
            ? [
                { label: 'Nombre', value: userToDelete.nombre || 'Sin nombre' },
                { label: 'Correo', value: userToDelete.email },
                { label: 'Rol Actual', value: userToDelete.rol },
                { label: 'UID', value: userToDelete.uid.slice(0, 18) + '...' },
              ]
            : undefined
        }
        onConfirm={handleConfirmDeleteUser}
        onClose={() => setUserToDelete(null)}
      />
    </div>
  );
};
