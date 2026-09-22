import { firebaseConfig } from './config';

export interface FormattedAuthError {
  message: string;
  isOperationNotAllowed: boolean;
  helpUrl?: string;
}

export function formatAuthError(error: any): FormattedAuthError {
  const code = error?.code || '';
  const rawMsg = error?.message || '';

  if (code === 'auth/operation-not-allowed' || rawMsg.includes('auth/operation-not-allowed')) {
    const projectId = firebaseConfig?.projectId || 'salaviplatam-5d06b';
    return {
      message: 'El registro con correo y contraseña no está habilitado todavía en tu consola de Firebase. Debes activarlo en Firebase Console > Authentication > Métodos de acceso.',
      isOperationNotAllowed: true,
      helpUrl: `https://console.firebase.google.com/project/${projectId}/authentication/providers`
    };
  }

  if (code === 'auth/email-already-in-use') {
    return {
      message: 'Este correo electrónico ya está registrado. Por favor, selecciona "Iniciar sesión aquí" para acceder.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/weak-password') {
    return {
      message: 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/invalid-email') {
    return {
      message: 'El correo electrónico ingresado no tiene un formato válido.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return {
      message: 'Correo o contraseña incorrectos. Verifica tus datos o restablece tu contraseña.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/popup-closed-by-user') {
    return {
      message: 'Se cerró la ventana de inicio de sesión con Google antes de completar la autenticación.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/popup-blocked') {
    return {
      message: 'El navegador bloqueó la ventana emergente de Google. Permite ventanas emergentes para este sitio.',
      isOperationNotAllowed: false
    };
  }

  if (code === 'auth/unauthorized-domain') {
    const projectId = firebaseConfig?.projectId || 'salaviplatam-5d06b';
    return {
      message: 'Este dominio no está en la lista de dominios autorizados en Firebase Authentication.',
      isOperationNotAllowed: false,
      helpUrl: `https://console.firebase.google.com/project/${projectId}/authentication/settings`
    };
  }

  return {
    message: rawMsg || 'Ocurrió un error con la autenticación. Intenta nuevamente.',
    isOperationNotAllowed: false
  };
}
