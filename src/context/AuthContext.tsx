import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { fetchUserProfile, saveUserProfile } from '../firebase/dataService';
import { formatAuthError } from '../firebase/authErrors';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isFirebase: boolean;
  isAdmin: boolean;
  isActive: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    pass: string,
    nombre: string,
    asAdmin?: boolean
  ) => Promise<{ success: boolean; error?: string; isPendingAdmin?: boolean }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: (role: UserRole, active?: boolean) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const isSystemAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const e = email.toLowerCase().trim();
  return (
    e === 'zavalachumpitazoscar@gmail.com' ||
    e === 'administracion@studioforaneas.com' ||
    e === 'admin@studioforaneas.com'
  );
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load demo profile from localStorage if in demo mode
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      const savedDemo = localStorage.getItem('studio_foraneas_current_user');
      if (savedDemo) {
        try {
          const profile = JSON.parse(savedDemo) as UserProfile;
          setUserProfile(profile);
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        let profile = await fetchUserProfile(user.uid);
        const isOwner = isSystemAdminEmail(user.email);
        if (isOwner && (!profile || !profile.activo || profile.rol !== 'ADMIN')) {
          profile = {
            uid: user.uid,
            email: user.email || 'administracion@studioforaneas.com',
            nombre: profile?.nombre || user.displayName || 'Administración Studio Foráneas',
            rol: 'ADMIN',
            activo: true,
            creadoEn: profile?.creadoEn || new Date().toISOString()
          };
          await saveUserProfile(profile);
        }
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (currentUser) {
      const profile = await fetchUserProfile(currentUser.uid);
      setUserProfile(profile);
    } else if (userProfile) {
      const profile = await fetchUserProfile(userProfile.uid);
      setUserProfile(profile);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      // Demo authentication mode
      const usersList = await import('../firebase/dataService').then(m => m.fetchUsersList());
      const found = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setUserProfile(found);
        localStorage.setItem('studio_foraneas_current_user', JSON.stringify(found));
        return { success: true };
      } else {
        // Automatically create user in demo mode
        const isOwner = isSystemAdminEmail(email);
        const demoUser: UserProfile = {
          uid: `user-${Date.now()}`,
          email,
          nombre: email.split('@')[0],
          rol: isOwner ? 'ADMIN' : (email.includes('admin') ? 'ADMIN' : 'CLIENTE'),
          activo: isOwner ? true : (email.includes('admin') ? false : true),
          creadoEn: new Date().toISOString()
        };
        await saveUserProfile(demoUser);
        setUserProfile(demoUser);
        localStorage.setItem('studio_foraneas_current_user', JSON.stringify(demoUser));
        return { success: true };
      }
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      let profile = await fetchUserProfile(cred.user.uid);
      const isOwner = isSystemAdminEmail(cred.user.email);
      if (!profile) {
        profile = {
          uid: cred.user.uid,
          email: cred.user.email || email,
          nombre: cred.user.displayName || email.split('@')[0],
          rol: isOwner ? 'ADMIN' : 'CLIENTE',
          activo: true, // Usuarios normales activos por defecto
          creadoEn: new Date().toISOString()
        };
        await saveUserProfile(profile);
      } else if (isOwner && (!profile.activo || profile.rol !== 'ADMIN')) {
        profile = { ...profile, rol: 'ADMIN', activo: true };
        await saveUserProfile(profile);
      }
      setUserProfile(profile);
      return { success: true };
    } catch (err: any) {
      const formatted = formatAuthError(err);
      return { success: false, error: formatted.message };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      quickDemoLogin('ADMIN', true);
      return { success: true };
    }
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const isOwner = isSystemAdminEmail(res.user.email);
      let profile = await fetchUserProfile(res.user.uid);
      if (!profile) {
        profile = {
          uid: res.user.uid,
          email: res.user.email || '',
          nombre: res.user.displayName || res.user.email?.split('@')[0] || 'Usuario',
          rol: isOwner ? 'ADMIN' : 'CLIENTE',
          activo: true, // Usuarios estándar activos por defecto
          creadoEn: new Date().toISOString()
        };
        await saveUserProfile(profile);
      } else if (isOwner && (!profile.activo || profile.rol !== 'ADMIN')) {
        profile = { ...profile, rol: 'ADMIN', activo: true };
        await saveUserProfile(profile);
      }
      setUserProfile(profile);
      return { success: true };
    } catch (err: any) {
      const formatted = formatAuthError(err);
      return { success: false, error: formatted.message };
    }
  };

  const register = async (
    email: string,
    pass: string,
    nombre: string,
    asAdmin: boolean = false
  ): Promise<{ success: boolean; error?: string; isPendingAdmin?: boolean }> => {
    const cleanEmail = email.toLowerCase().trim();
    const isOwner = isSystemAdminEmail(cleanEmail);
    const targetRole: UserRole = (asAdmin || isOwner) ? 'ADMIN' : 'CLIENTE';
    // Por requerimiento:
    // 1. Todas las cuentas normales por defecto quedan ACTIVAS (activo: true) para entrar y usar la web.
    // 2. Si se crea como Administrador, queda INACTIVA (activo: false) por defecto para que otro admin
    //    o la consola de Firebase lo active manualmente.
    const targetActivo: boolean = isOwner ? true : (asAdmin ? false : true);

    if (!isFirebaseConfigured || !auth) {
      const newUser: UserProfile = {
        uid: `user-${Date.now()}`,
        email: cleanEmail,
        nombre: nombre.trim() || cleanEmail.split('@')[0],
        rol: targetRole,
        activo: targetActivo,
        creadoEn: new Date().toISOString()
      };
      await saveUserProfile(newUser);
      setUserProfile(newUser);
      localStorage.setItem('studio_foraneas_current_user', JSON.stringify(newUser));
      return {
        success: true,
        isPendingAdmin: targetRole === 'ADMIN' && !targetActivo
      };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email || cleanEmail,
        nombre: nombre.trim() || cleanEmail.split('@')[0],
        rol: targetRole,
        activo: targetActivo,
        creadoEn: new Date().toISOString()
      };
      await saveUserProfile(newProfile);
      setUserProfile(newProfile);
      return {
        success: true,
        isPendingAdmin: targetRole === 'ADMIN' && !targetActivo
      };
    } catch (err: any) {
      const formatted = formatAuthError(err);
      return { success: false, error: formatted.message };
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('studio_foraneas_current_user');
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return { success: true }; // Simulates email sent in demo
    }
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'No se pudo enviar el correo de recuperación' };
    }
  };

  const quickDemoLogin = (role: UserRole, active: boolean = true) => {
    const demoProfile: UserProfile = {
      uid: role === 'ADMIN' ? 'admin-foraneas-01' : 'cliente-demo-01',
      email: role === 'ADMIN' ? 'admin@studioforaneas.com' : 'cliente@ejemplo.com',
      nombre: role === 'ADMIN' ? 'Nathaly & Rosa (Admin)' : 'Cliente Registrado',
      rol: role,
      activo: active,
      creadoEn: new Date().toISOString()
    };
    setUserProfile(demoProfile);
    localStorage.setItem('studio_foraneas_current_user', JSON.stringify(demoProfile));
  };

  const isAdmin = userProfile?.rol === 'ADMIN';
  const isActive = Boolean(userProfile?.activo);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isFirebase: isFirebaseConfigured,
        isAdmin,
        isActive,
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
        quickDemoLogin,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
