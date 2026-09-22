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
  nombreComercial: string;
  lema: string;
  descripcion: string;
  heroTitulo: string;
  heroSubtitulo: string;
  heroImagen: string;
  heroVideoUrl?: string;
  whatsappPrincipal: string; // e.g. "+51997534727"
  whatsappSecundario: string; // e.g. "+51947718479"
  correo: string;
  direccion: string;
  horarios: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  footerTexto: string;
}
