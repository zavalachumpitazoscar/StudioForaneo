export type UserRole = 'ADMIN' | 'CLIENTE';

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  rol: UserRole;
  activo: boolean;
  creadoEn: string;
}

export type RequestStatus = 'PENDIENTE' | 'CONTACTADO' | 'COTIZADO' | 'CONFIRMADO' | 'CANCELADO' | 'FINALIZADO';

export interface ServiceRequest {
  id: string;
  clienteNombre: string;
  correo: string;
  telefono: string;
  servicioSolicitado: string;
  fechaEvento: string;
  lugar: string;
  detalles: string;
  presupuestoAprox?: string;
  comoNosConocio?: string;
  estado: RequestStatus;
  observacionesInternas?: string;
  creadoEn: string;
  actualizadoEn?: string;
  userId?: string;
}

export interface ServiceItem {
  id: string;
  nombre: string;
  categoria: 'redes' | 'eventos' | 'shoot' | 'bodas' | 'otro';
  descripcion: string;
  detallesIncluidos: string[];
  precio?: string;
  precioNumero?: number;
  imagenUrl: string;
  destacado: boolean;
  publicado: boolean;
  orden: number;
}

export interface PortfolioItem {
  id: string;
  titulo: string;
  descripcion?: string;
  categoria: 'bodas' | 'eventos' | 'marcas' | 'retratos' | 'reels';
  imagenUrl: string;
  fecha?: string;
  publicado: boolean;
  orden: number;
}

export interface VideoItem {
  id: string;
  titulo: string;
  descripcion?: string;
  categoria: 'reels' | 'bodas' | 'eventos' | 'comercial';
  videoUrl: string; // Google Drive, YouTube, Vimeo, direct
  thumbnailUrl?: string;
  fecha?: string;
  publicado: boolean;
  orden: number;
}

export interface OfferItem {
  id: string;
  titulo: string;
  descripcion: string;
  descuentoTexto?: string; // e.g. "20% OFF"
  imagenUrl?: string;
  textoBoton: string;
  enlaceUrl?: string;
  fechaInicio: string; // YYYY-MM-DD
  fechaFin: string; // YYYY-MM-DD
  activo: boolean;
  prioridad: number;
}

export interface SiteConfig {
  // Identidad & Marca
  nombreComercial: string;
  lema: string;
  descripcion: string;

  // Hero Principal
  heroBadge?: string;
  heroTitulo: string;
  heroSubtitulo: string;
  heroBotonPrincipalTexto?: string;
  heroBotonSecundarioTexto?: string;
  heroImagen: string;
  heroVideoUrl?: string;

  // Métricas del Hero
  heroMetrica1Valor?: string;
  heroMetrica1Label?: string;
  heroMetrica2Valor?: string;
  heroMetrica2Label?: string;
  heroMetrica3Valor?: string;
  heroMetrica3Label?: string;
  heroMetrica4Valor?: string;
  heroMetrica4Label?: string;

  // Encabezados de Secciones
  serviciosBadge?: string;
  serviciosTitulo?: string;
  serviciosSubtitulo?: string;

  portafolioBadge?: string;
  portafolioTitulo?: string;
  portafolioSubtitulo?: string;

  videosBadge?: string;
  videosTitulo?: string;
  videosSubtitulo?: string;

  // Sección ¿Quiénes Somos?
  quienesSomosBadge?: string;
  quienesSomosTitulo?: string;
  quienesSomosDescripcion?: string;

  // Fundadora 1 (Comunicadora Audiovisual)
  fundadora1Nombre?: string;
  fundadora1Cargo?: string;
  fundadora1Bio?: string;
  fundadora1Tags?: string;
  fundadora1Foto?: string;

  // Fundadora 2 (Gestora Empresarial)
  fundadora2Nombre?: string;
  fundadora2Cargo?: string;
  fundadora2Bio?: string;
  fundadora2Tags?: string;
  fundadora2Foto?: string;

  // Beneficios de los Planes & Consideraciones
  beneficiosTitulo?: string;
  beneficiosLista?: string;
  consideracionesTexto?: string;

  // Canales de Contacto
  whatsappPrincipal: string; // e.g. "+51997534727"
  whatsappSecundario: string; // e.g. "+51947718479"
  correo: string;
  direccion: string;
  horarios: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;

  // Footer & Banner Inferior
  footerCtaTitulo?: string;
  footerCtaSubtitulo?: string;
  footerTexto: string;
}
