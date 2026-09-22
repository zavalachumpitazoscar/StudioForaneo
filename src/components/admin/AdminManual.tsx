import React, { useState } from 'react';
import {
  BookOpen,
  Inbox,
  Layers,
  Camera,
  Film,
  Sparkles,
  Sliders,
  Users,
  DollarSign,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface AdminManualProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminManual: React.FC<AdminManualProps> = ({ onNavigateTab }) => {
  const [activeChapter, setActiveChapter] = useState<string>('intro');
  const [copiedLink, setCopiedLink] = useState(false);

  const chapters = [
    { id: 'intro', label: '1. Introducción y Plan Básico', icon: DollarSign },
    { id: 'solicitudes', label: '2. Gestión de Solicitudes', icon: Inbox },
    { id: 'servicios', label: '3. Servicios y Precios', icon: Layers },
    { id: 'portafolio', label: '4. Portafolio de Fotos', icon: Camera },
    { id: 'videos', label: '5. Videos y Reels', icon: Film },
    { id: 'promociones', label: '6. Promociones y Banners', icon: Sparkles },
    { id: 'configuracion', label: '7. Configuración General', icon: Sliders },
    { id: 'usuarios', label: '8. Equipo y Permisos (RBAC)', icon: Users },
    { id: 'multimedia', label: '9. Fotos y Videos Gratis', icon: HelpCircle },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F3] border border-rose-200/80 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Guía Oficial y Manual de Uso</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#33182B]">
            Manual Completo del Panel de Administración
          </h1>

          <p className="text-sm sm:text-base text-[#5E4758] leading-relaxed">
            Aquí aprenderás a administrar cada sección del sitio web de <strong className="text-rose-600">Studio Foráneas</strong> paso a paso, conociendo qué significa cada opción, cómo actualizar el contenido y cómo aprovechar el <strong className="text-emerald-700">Plan Básico Gratuito</strong> sin ningún costo mensual.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar + Chapter Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#5E4758] px-2">
            Capítulos del Manual
          </span>
          <div className="space-y-1 bg-white p-2 rounded-2xl border border-rose-100 shadow-xs">
            {chapters.map((ch) => {
              const Icon = ch.icon;
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-200'
                      : 'text-[#5E4758] hover:text-[#33182B] hover:bg-rose-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{ch.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'rotate-90 sm:rotate-0' : ''}`} />
                </button>
              );
            })}
          </div>

          {/* Quick jump to admin sections */}
          <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-rose-200/80 space-y-2.5 text-xs">
            <span className="font-bold text-[#33182B] block">Accesos directos:</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onNavigateTab('solicitudes')}
                className="p-2 rounded-lg bg-white border border-rose-100 text-[#5E4758] hover:text-rose-600 font-medium text-center"
              >
                Solicitudes
              </button>
              <button
                onClick={() => onNavigateTab('servicios')}
                className="p-2 rounded-lg bg-white border border-rose-100 text-[#5E4758] hover:text-rose-600 font-medium text-center"
              >
                Servicios
              </button>
              <button
                onClick={() => onNavigateTab('portafolio')}
                className="p-2 rounded-lg bg-white border border-rose-100 text-[#5E4758] hover:text-rose-600 font-medium text-center"
              >
                Portafolio
              </button>
              <button
                onClick={() => onNavigateTab('configuracion')}
                className="p-2 rounded-lg bg-white border border-rose-100 text-[#5E4758] hover:text-rose-600 font-medium text-center"
              >
                Configuración
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Details Container */}
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6 text-[#33182B]">
          {/* Chapter 1: Introducción y Plan Básico */}
          {activeChapter === 'intro' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 1</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Introducción y Funcionamiento del Plan Básico
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span>Cero Costos Recurrentes (Plan Básico 100% Gratuito)</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-950">
                  El sistema está completamente optimizado para operar en los <strong>planes gratuitos</strong> de los servicios (Firebase Spark Plan, almacenamiento local sincronizado y alojamiento de medios externo sin costo). No se requiere tarjeta de crédito, suscripciones ni pagos mensuales.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  ¿Cómo funciona la persistencia de datos?
                </h3>
                <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                  El panel cuenta con un sistema de <strong>doble respaldo inteligente</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#5E4758]">
                  <li>
                    <strong>Respaldo Inmediato Local (LocalStorage):</strong> Cada cambio que haces en servicios, fotos, videos o solicitudes se guarda inmediatamente en el navegador. Aunque no haya conexión a internet, nunca perderás tus datos ni tus cambios.
                  </li>
                  <li>
                    <strong>Sincronización Cloud (Firestore):</strong> Cuando la base de datos de Firebase está activa y configurada en modo nativo, se sincroniza en la nube para que otros miembros del equipo vean los cambios al instante.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Roles del Sistema
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="font-bold text-rose-700 block text-sm">👑 Administrador (ADMIN)</span>
                    <p className="text-[#5E4758] mt-1">
                      Acceso total. Puede crear, editar y eliminar servicios, fotos, videos, gestionar solicitudes y activar nuevos usuarios.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-800 block text-sm">👤 Cliente / Registrado</span>
                    <p className="text-[#5E4758] mt-1">
                      Puede enviar solicitudes de cotización desde la web. No tiene acceso al panel de edición hasta ser aprobado por un administrador.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2: Gestión de Solicitudes */}
          {activeChapter === 'solicitudes' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 2</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Gestión de Solicitudes de Cotización
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Cada vez que un cliente completa el formulario de cotización en la página web pública, se genera un ticket en esta sección con su nombre, WhatsApp, email, servicio de interés y detalles.
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  ¿Qué significan los estados de cada solicitud?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-900">
                    <span className="font-bold block">🟡 PENDIENTE</span>
                    <span>El cliente acaba de enviar la solicitud. Nadie se ha comunicado con él todavía.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-900">
                    <span className="font-bold block">🔵 CONTACTADO</span>
                    <span>Ya le escribiste por WhatsApp o correo electrónico para saludarlo o consultar detalles.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-purple-200 bg-purple-50 text-purple-900">
                    <span className="font-bold block">🟣 COTIZADO</span>
                    <span>Ya se le envió la propuesta formal o el presupuesto económico.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900">
                    <span className="font-bold block">🟢 CONFIRMADO</span>
                    <span>El cliente aceptó el servicio o ya realizó el adelanto de reserva.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800">
                    <span className="font-bold block">⚪ FINALIZADO</span>
                    <span>El proyecto audiovisual o cobertura del evento fue entregado con éxito.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-900">
                    <span className="font-bold block">🔴 CANCELADO</span>
                    <span>El cliente desistió o no continuó con la contratación.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Paso a paso para atender a un cliente
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#5E4758]">
                  <li>Ingresa a la pestaña <strong>Solicitudes</strong> en el menú lateral.</li>
                  <li>Revisa los datos del cliente y haz clic en el botón verde <strong>Contactar por WhatsApp</strong>. Se abrirá automáticamente una conversación con su número.</li>
                  <li>Cambia el estado del ticket a <strong>CONTACTADO</strong> o <strong>COTIZADO</strong>.</li>
                  <li>Puedes escribir <strong>Notas Internas</strong> (por ejemplo: <em>"Quiere paquete de 3 reels para el 25 de octubre"</em>) para que Nathaly o Rosa también lo sepan.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Chapter 3: Servicios y Precios */}
          {activeChapter === 'servicios' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 3</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Servicios, Paquetes y Precios
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Controla todos los servicios que se muestran en la sección principal del sitio web. Puedes crear nuevos planes, modificar precios, agregar qué incluye cada servicio y destacarlos.
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  ¿Cómo agregar o editar un servicio?
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#5E4758]">
                  <li>Haz clic en el botón <strong>+ Nuevo Servicio</strong> en la esquina superior derecha.</li>
                  <li><strong>Nombre del Servicio:</strong> Ej: <em>"Pack 4 Reels Mensuales"</em>.</li>
                  <li><strong>Categoría:</strong> Selecciona entre <em>Redes Sociales</em>, <em>Eventos & Bodas</em> o <em>Full Day Shoot</em>. Esto determina en qué pestaña de filtro aparecerá.</li>
                  <li><strong>Precio Visible:</strong> Ej: <em>"S/ 650 / mes"</em> o <em>"A cotizar"</em>.</li>
                  <li><strong>Detalles Incluidos:</strong> Escribe cada punto en una línea separada (presionando Enter). Cada línea se convertirá en un check verde en la tarjeta pública.</li>
                  <li><strong>Imagen o Portada:</strong> Pega el enlace de una foto (ver Capítulo 9 para usar Google Drive o imágenes gratuitas).</li>
                  <li><strong>Destacado (Pill):</strong> Si lo activas, tendrá un borde dorado y la etiqueta <em>"Más Popular"</em>.</li>
                  <li>Haz clic en <strong>Guardar Servicio</strong> y se reflejará inmediatamente en la web.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Chapter 4: Portafolio de Fotos */}
          {activeChapter === 'portafolio' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 4</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Portafolio de Fotografías
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Aquí administras la galería visual de trabajos realizados por Studio Foráneas (fotografía de producto, sesiones de moda, gastronomía, eventos y bodas).
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Paso a paso para publicar una foto en el portafolio
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#5E4758]">
                  <li>Haz clic en <strong>+ Agregar Foto al Portafolio</strong>.</li>
                  <li><strong>Título del Trabajo:</strong> Ej: <em>"Campaña de Verano - Marca Joyas"</em>.</li>
                  <li><strong>Categoría:</strong> Elige la categoría para que los clientes puedan filtrarla (Moda, Producto, Gastronomía, Eventos).</li>
                  <li><strong>URL de la Imagen:</strong> Pega el enlace de la fotografía. Puede ser un enlace compartido de <strong>Google Drive</strong> (el sistema lo convierte a imagen directa automáticamente) o de Imgur/Unsplash.</li>
                  <li><strong>Orden:</strong> Un número (1, 2, 3...) para decidir qué foto aparece primero.</li>
                  <li>Guarda y visualiza el resultado haciendo clic en <strong>"Ver Sitio Web"</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Chapter 5: Videos y Reels */}
          {activeChapter === 'videos' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 5</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Videos, Reels & Producción Audiovisual
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Esta sección permite mostrar reproducciones de videos verticales (Reels / TikTok / Shorts) y videos horizontales (spots publicitarios, aftermovies, videos corporativos).
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Formatos de Video Admitidos (100% Gratis)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-rose-100 bg-[#FFF9FA]">
                    <span className="font-bold text-rose-700 block">YouTube / Shorts</span>
                    <span className="text-neutral-500">Pega cualquier enlace regular de YouTube o enlace corto /shorts/...</span>
                  </div>
                  <div className="p-3 rounded-xl border border-rose-100 bg-[#FFF9FA]">
                    <span className="font-bold text-rose-700 block">Vimeo</span>
                    <span className="text-neutral-500">Pega el enlace de tu video de Vimeo sin publicidad.</span>
                  </div>
                  <div className="p-3 rounded-xl border border-rose-100 bg-[#FFF9FA]">
                    <span className="font-bold text-rose-700 block">Google Drive Video</span>
                    <span className="text-neutral-500">Copia el enlace compartido con permiso público de visualización.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 6: Promociones */}
          {activeChapter === 'promociones' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 6</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Promociones, Descuentos y Banners
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Crea campañas temporales con códigos de descuento (ejemplo: <code>FORANEAS20</code>, <code>CYBERWEEK</code>) que se muestran en la franja superior de la página y en la sección de ofertas.
              </p>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Campos de una Promoción:
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5E4758]">
                  <li><strong>Título de la Oferta:</strong> Ej: <em>"20% de Descuento en tu Primer Shoot"</em>.</li>
                  <li><strong>Código de Cupón:</strong> La palabra que el cliente usará al escribir por WhatsApp.</li>
                  <li><strong>Porcentaje / Monto:</strong> Ej: <em>"20% OFF"</em> o <em>"S/ 100 de regalo"</em>.</li>
                  <li><strong>Interruptor de Activo:</strong> Puedes desactivar una oferta sin borrarla cuando termine la temporada.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Chapter 7: Configuración General */}
          {activeChapter === 'configuracion' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 7</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Configuración del Sitio y Redes Sociales
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Edita los datos de contacto directos de Studio Foráneas: número de WhatsApp, Instagram, TikTok, correo de contacto y los textos de presentación de la página principal.
              </p>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-2 text-xs">
                <span className="font-bold text-rose-800 block text-sm">💡 Configuración Clave: WhatsApp</span>
                <p className="text-[#5E4758]">
                  Escribe el número con el código de país (ejemplo: <code>+51997534727</code>). Todos los botones flotantes y formularios de la web dirigirán los chats directamente a este número.
                </p>
              </div>
            </div>
          )}

          {/* Chapter 8: Usuarios y Permisos */}
          {activeChapter === 'usuarios' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 8</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Equipo, Cuentas y Permisos (RBAC)
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5E4758] leading-relaxed">
                Control de acceso basado en roles para Nathaly, Rosa y colaboradores:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#5E4758]">
                <p>
                  1. <strong>Registro de nuevos usuarios:</strong> Cualquier miembro del equipo puede registrarse en el modal de inicio de sesión con su correo o mediante Google.
                </p>
                <p>
                  2. <strong>Aprobación por seguridad:</strong> Los nuevos registros entran como usuarios pendientes. El administrador principal (tú) debe ingresar a la pestaña <strong>Usuarios</strong> y activar el interruptor para darles acceso.
                </p>
                <p>
                  3. <strong>Propietario Automático:</strong> El correo <code>zavalachumpitazoscar@gmail.com</code> cuenta con acceso administrativo automático al iniciar sesión con Google.
                </p>
              </div>
            </div>
          )}

          {/* Chapter 9: Fotos y Videos Gratis */}
          {activeChapter === 'multimedia' && (
            <div className="space-y-6">
              <div className="border-b border-rose-100 pb-4">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capítulo 9</span>
                <h2 className="text-2xl font-bold font-serif text-[#33182B] mt-1">
                  Cómo Subir Fotos y Videos sin Pagar Servidores
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs sm:text-sm">
                <span className="font-bold block text-emerald-800">
                  🎉 ¡El sistema incluye un convertidor automático de Google Drive!
                </span>
                <p className="leading-relaxed text-emerald-900">
                  No necesitas pagar servicios de almacenamiento como Firebase Storage o AWS S3. Puedes usar tu cuenta gratuita de Google Drive para alojar todas tus fotos.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Paso a paso para usar fotos de Google Drive:
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#5E4758]">
                  <li>Sube tu foto a tu Google Drive personal.</li>
                  <li>Haz clic derecho sobre la foto &gt; <strong>Compartir</strong>.</li>
                  <li>En <em>Acceso general</em>, selecciona <strong>"Cualquier persona con el enlace"</strong> (como Lector).</li>
                  <li>Haz clic en <strong>Copiar enlace</strong>.</li>
                  <li>Pega ese enlace directamente en el formulario de la foto en este panel. ¡El sistema lo convertirá automáticamente en una imagen visible sin que tengas que hacer nada más!</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-base font-serif text-[#33182B]">
                  Otras opciones 100% gratuitas para fotos:
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5E4758]">
                  <li><strong>Imgur / Postimages / ImgBB:</strong> Sitios web gratuitos donde puedes subir una imagen y copiar el enlace directo (terminado en .jpg o .png).</li>
                  <li><strong>Unsplash / Pexels:</strong> Fotografías profesionales libres de derechos para maquetas o fondos.</li>
                  <li><strong>Instagram / Redes:</strong> Puedes copiar la dirección de imagen de publicaciones públicas.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
