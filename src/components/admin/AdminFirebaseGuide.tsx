import React, { useState } from 'react';
import { isFirebaseConfigured, firebaseConfig } from '../../firebase/config';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Terminal,
  ExternalLink,
  Github,
  Flame,
  Key,
  FolderGit2,
  HelpCircle
} from 'lucide-react';

export const AdminFirebaseGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const firestoreRulesSample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isSuperAdmin() {
      return isSignedIn() && (
        request.auth.token.email == 'zavalachumpitazoscar@gmail.com' ||
        request.auth.token.email == 'administracion@studioforaneas.com' ||
        request.auth.token.email == 'admin@studioforaneas.com'
      );
    }

    function isAdmin() {
      return isSuperAdmin() || (
        isSignedIn() &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol == 'ADMIN' &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.activo == true
      );
    }

    // Services collection: Public read, Admin write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Portfolio collection: Public read, Admin write
    match /portfolio/{itemId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Videos collection: Public read, Admin write
    match /videos/{videoId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Offers/Promotions collection: Public read, Admin write
    match /offers/{offerId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Service Requests: Any authenticated client can submit a quote request, Admins can read/manage all, users can read their own
    match /requests/{requestId} {
      allow create: if true;
      allow read: if isAdmin() || (isSignedIn() && (
        (resource.data.correo != null && resource.data.correo == request.auth.token.email) ||
        (resource.data.userId != null && resource.data.userId == request.auth.uid)
      ));
      allow update, delete: if isAdmin();
    }

    // Site Configuration: Public read, Admin write
    match /site_config/{configId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Users collection: Owner and Admin can read, Admin or owner can update
    match /users/{userId} {
      allow get: if isSignedIn() && (request.auth.uid == userId || isSuperAdmin() || isAdmin());
      allow list: if isAdmin();
      allow create, update: if isSignedIn() && (request.auth.uid == userId || isAdmin());
      allow delete: if isAdmin();
    }

    // Test connection doc
    match /test/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}`;

  return (
    <div className="space-y-6 max-w-4xl text-left animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-purple-100 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            <span>Documentación Técnica</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#241235]">
            Guía de Configuración: Firebase & Publicación en GitHub
          </h2>
          <p className="text-xs text-[#554064]">
            Instrucciones detalladas paso a paso para conectar tu base de datos gratuita de Firebase y publicar el proyecto.
          </p>
        </div>
      </div>

      {/* Current Connection Status */}
      <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
        isFirebaseConfigured
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
          : 'bg-amber-50/90 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-amber-500 shrink-0 shadow-2xs">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#241235] flex items-center gap-2">
              <span>{isFirebaseConfigured ? 'Firebase Conectado' : 'Modo Demo / Pruebas Activo'}</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                {firebaseConfig.projectId}
              </span>
            </div>
            <p className="text-xs text-[#554064] mt-0.5 leading-relaxed">
              {isFirebaseConfigured
                ? `Todos los servicios, fotos, videos y configuraciones se almacenan directamente en tu base de datos Firestore (default) del proyecto ${firebaseConfig.projectId}.`
                : 'La aplicación está funcionando con almacenamiento local reactivo.'}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-bold border border-emerald-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Plan Spark (Gratuito)
          </span>
        </div>
      </div>

      {/* Step by Step Guide */}
      <div className="space-y-4 text-xs text-[#554064]">
        {/* Step 1 */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">1</span>
            <span>Crear Proyecto en Firebase (100% Gratuito)</span>
          </h3>
          <ol className="list-decimal list-inside space-y-2 pl-2 text-xs leading-relaxed text-[#554064]">
            <li>Ingresa a <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-purple-700 underline font-semibold">console.firebase.google.com</a> y presiona <strong>"Agregar proyecto"</strong>.</li>
            <li>Asígnale el nombre <strong>"Studio Foráneas"</strong> y desactiva Google Analytics para mayor rapidez.</li>
            <li>En la barra izquierda, ingresa a <strong>Compilación &gt; Authentication</strong> y presiona <strong>"Comenzar"</strong>.</li>
            <li>En la pestaña <em>Método de inicio de sesión</em>, habilita <strong>Correo electrónico/Contraseña</strong>.</li>
            <li>En la barra izquierda, ingresa a <strong>Firestore Database</strong> y presiona <strong>"Crear base de datos"</strong> en modo producción (Ubicación: <em>us-central1</em> u otra cercana).</li>
          </ol>
        </div>

        {/* Step 2: Rules */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">2</span>
              <span>Reglas de Seguridad de Firestore (Pégalas en Firebase Console)</span>
            </h3>
            <button
              onClick={() => copyToClipboard(firestoreRulesSample, 'rules')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold flex items-center gap-1.5 border border-purple-200 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'rules' ? '¡Copiado!' : 'Copiar Reglas'}</span>
            </button>
          </div>

          <p className="text-xs text-[#554064]">
            En la consola de Firestore, ve a la pestaña <strong>"Reglas"</strong>, reemplaza todo el contenido por lo siguiente y presiona <strong>"Publicar"</strong>:
          </p>

          <pre className="p-4 rounded-2xl bg-[#2A1724] border border-rose-950/60 text-[11px] font-mono text-purple-100 overflow-x-auto max-h-60 leading-relaxed shadow-inner">
            {firestoreRulesSample}
          </pre>
        </div>

        {/* Step 3: First Admin User Activation */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">3</span>
            <span>Crear y Activar el Primer Usuario Administrador</span>
          </h3>
          <p className="leading-relaxed">
            1. Pídele a tu socia o administradora que se registre desde el botón de acceso de esta web (marcando la casilla de administrador).
          </p>
          <p className="leading-relaxed">
            2. Desde tu panel de <strong>Equipo & Usuarios</strong>, verás su tarjeta en la sección de aprobación de administradores pendientes con el botón <strong>"Aprobar y Activar Admin"</strong>.
          </p>
          <p className="leading-relaxed">
            3. Si prefieres activarla por consola, ingresa a <strong>Firestore Database</strong> &gt; colección <code className="text-purple-700 font-mono text-[11px]">users</code> &gt; documento con su <strong>UID</strong> y ajusta:
          </p>
          <div className="p-3.5 rounded-2xl bg-[#2A1724] border border-rose-950/60 font-mono text-[11px] text-emerald-400">
            rol: "ADMIN"<br />
            activo: true
          </div>
          <p className="text-[11px] text-[#6E4965]">
            ¡Listo! A partir de ese momento, podrá acceder directamente al panel administrativo completo sin depender de nadie.
          </p>
        </div>

        {/* Step 4: Where to put credentials and GitHub Pages */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-serif text-[#241235] uppercase tracking-wider flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">4</span>
            <span>Credenciales de Firebase & Alerta de Seguridad de GitHub</span>
          </h3>
          <p className="leading-relaxed">
            Las aplicaciones web de Firebase utilizan un archivo <code className="text-[#241235] font-semibold">firebase-applet-config.json</code> en la raíz del proyecto para conectar con el SDK en el navegador.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>¿Qué significa la alerta "Secret scanning / Google API Key" en GitHub?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              GitHub escanea automáticamente cualquier clave que comience con <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900">AIzaSy...</code>. En Firebase Web, la API Key <strong>no es una clave secreta administrativa</strong>, sino un identificador público necesario para que los navegadores ubiquen tu base de datos (la seguridad real la proporcionan las <strong>Reglas de Firestore</strong> que configuraste en el Paso 2).
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800">
              <strong>Cómo resolver la alerta en GitHub:</strong> Entra en la alerta de GitHub, pulsa el botón <strong>"Close alert"</strong> (Cerrar alerta) en la esquina superior derecha y selecciona <strong>"False positive"</strong> (Falso positivo) o <strong>"Won't fix"</strong>.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-[#241235] flex items-center gap-1.5 text-xs">
              <Github className="w-4 h-4 text-stone-500" />
              <span>Para Publicar en GitHub Pages:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-xs text-[#554064]">
              <li>Sube el repositorio a tu cuenta de GitHub (<code className="text-[#241235]">git push origin main</code>).</li>
              <li>Ejecuta <code className="text-[#241235]">npm run build</code> para generar la carpeta <code className="text-[#241235]">dist/</code>.</li>
              <li>En GitHub &gt; <strong>Settings &gt; Pages</strong>, selecciona la rama o usa GitHub Actions para desplegar automáticamente la carpeta <code className="text-[#241235]">dist</code>.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
