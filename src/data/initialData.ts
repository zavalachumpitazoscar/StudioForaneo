import { ServiceItem, PortfolioItem, VideoItem, OfferItem, ServiceRequest, SiteConfig } from '../types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  nombreComercial: 'Studio Foráneas',
  lema: 'Creamos contenido auténtico que conecta',
  descripcion: 'Producción audiovisual, estrategia digital y cobertura de eventos por comunicadoras de la PUCP. Ayudamos a las marcas a comunicar su esencia de manera clara, atractiva y coherente.',
  
  // Hero
  heroBadge: 'PUCP • Producción Audiovisual, Redes Sociales & Bodas',
  heroTitulo: 'Contenido que comunica la esencia de tu marca',
  heroSubtitulo: 'Estrategia comercial, creación de contenido para redes sociales, producción audiovisual y cobertura de bodas y eventos especiales.',
  heroBotonPrincipalTexto: 'Solicitar Cotización',
  heroBotonSecundarioTexto: 'Ver Trabajos & Portafolio',
  heroImagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop',

  // Hero Métricas
  heroMetrica1Valor: 'S/. 500',
  heroMetrica1Label: 'Packs mensuales desde',
  heroMetrica2Valor: 'En Vivo',
  heroMetrica2Label: 'Stories y Reels en eventos',
  heroMetrica3Valor: '100% Pro',
  heroMetrica3Label: 'Luces, micros y trípodes',
  heroMetrica4Valor: 'PUCP',
  heroMetrica4Label: 'Estrategia + Producción',

  // Encabezados de Secciones
  serviciosBadge: 'Nuestros Servicios',
  serviciosTitulo: 'Hacemos realidad lo que necesites',
  serviciosSubtitulo: 'Planes flexibles pensados para negocios, marcas personales y eventos especiales. Elige el plan que mejor se adapte a tu proyecto.',

  portafolioBadge: 'Portafolio Visual',
  portafolioTitulo: 'Cada toma cuenta una historia única',
  portafolioSubtitulo: 'Fotografía editorial, cobertura de bodas y campañas comerciales con dirección de arte y edición profesional.',

  videosBadge: 'Producción en Movimiento',
  videosTitulo: 'Videos, Reels & Coberturas',
  videosSubtitulo: 'Showreels cinematográficos, resúmenes dinámicos para redes sociales y filmación documental con edición profesional y etalonaje de color.',

  // ¿Quiénes Somos?
  quienesSomosBadge: '¿Quiénes Somos?',
  quienesSomosTitulo: 'Unimos visión audiovisual & estrategia de ventas',
  quienesSomosDescripcion: 'Combinamos nuestras fortalezas y perspectivas para crear contenido auténtico, estratégico y cercano a las audiencias. Nuestro objetivo es ayudar a las marcas a comunicar su esencia de una manera clara, atractiva y coherente.',

  // Fundadora 1
  fundadora1Nombre: 'Nathaly Vergara',
  fundadora1Cargo: 'Comunicadora Audiovisual • PUCP',
  fundadora1Bio: 'Comunicadora Audiovisual por la Pontificia Universidad Católica del Perú (PUCP) con amplia experiencia en producción audiovisual, creación de contenido, manejo de redes sociales, redacción creativa, edición profesional y estrategia digital.',
  fundadora1Tags: 'Dirección Audiovisual, Edición & Guiones, Reels Dinámicos',
  fundadora1Foto: '',

  // Fundadora 2
  fundadora2Nombre: 'Rosa Velásquez',
  fundadora2Cargo: 'Gestora Empresarial y Social • PUCP',
  fundadora2Bio: 'Gestora empresarial y social por la Pontificia Universidad Católica del Perú (PUCP), con experiencia en el área comercial y en creación de contenido. Combina estrategias de venta con crecimiento digital para potenciar marcas y resultados reales.',
  fundadora2Tags: 'Estrategia Comercial, Crecimiento Digital, Planificación de Ventas',
  fundadora2Foto: '',

  // Beneficios & Consideraciones
  beneficiosTitulo: 'Todos nuestros planes de contenido para redes sociales incluyen:',
  beneficiosLista: 'Planificación mensual de contenidos estratégicos\nDesarrollo de ideas y conceptos creativos\nCreación de las piezas contempladas en tu plan\nRedacción de captions persuasivos para engagement\nProgramación y publicación en la red social escogida\nCoordinación y seguimiento del calendario de contenidos',
  consideracionesTexto: 'Consideraciones importantes: Las locaciones, desplazamientos o modelos especiales se coordinan previamente. Cualquier pieza o contenido adicional podrá ser cotizado por separado a la medida de tus necesidades.',

  // Contacto & Redes
  whatsappPrincipal: '+51997534727',
  whatsappSecundario: '+51947718479',
  correo: 'studioforaneas@gmail.com',
  direccion: 'Lima, Perú - Cobertura nacional e internacional',
  horarios: 'Lunes a Sábado: 9:00 AM - 7:00 PM',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  tiktokUrl: 'https://tiktok.com',
  youtubeUrl: 'https://youtube.com',

  // Footer & Banner
  footerCtaTitulo: '¿Lista para impulsar tu marca o inmortalizar tu evento?',
  footerCtaSubtitulo: 'Conversemos hoy mismo para diseñar un plan audiovisual y estratégico hecho a tu medida.',
  footerTexto: '© 2026 Studio Foráneas. Todos los derechos reservados. Diseñado para marcas y creadores.'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-redes-sociales',
    nombre: 'Creación de Contenido para Redes Sociales',
    categoria: 'redes',
    descripcion: 'Cada plan se adapta al nivel de presencia y frecuencia que tu marca necesita. Incluye planificación mensual, desarrollo de conceptos, redacción de captions, edición profesional y programación.',
    detallesIncluidos: [
      'Planificación mensual de contenidos',
      'Desarrollo de ideas y conceptos creativos',
      'Creación de piezas contempladas en el plan',
      'Redacción de captions estratégicos para engagement',
      'Programación y publicación en la red escogida',
      'Coordinación y seguimiento del calendario'
    ],
    precio: 'Desde S/. 500 / mes (Packs Básico, Crecimiento y Pro)',
    precioNumero: 500,
    imagenUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    destacado: true,
    publicado: true,
    orden: 1
  },
  {
    id: 'serv-eventos-bodas',
    nombre: 'Creación de Contenido para Eventos & Bodas',
    categoria: 'eventos',
    descripcion: '¿Tienes una boda, fiesta importante, feria o inauguración? ¡Disfrútalo! Nosotras creamos contenido en tiempo real, reels dinámicos y cobertura fotográfica para ti.',
    detallesIncluidos: [
      'Stories en tiempo real durante todo el evento',
      'Reels dinámicos producidos y editados durante el evento',
      'Reel recap cinematográfico post-evento',
      'Galería de fotos de alta calidad para carrusel',
      'Entrega de material en crudo completo en plan Pro'
    ],
    precio: 'Desde S/. 500 (Planes 3h y 6h)',
    precioNumero: 500,
    imagenUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    destacado: true,
    publicado: true,
    orden: 2
  },
  {
    id: 'serv-full-day-shoot',
    nombre: 'Full Day Shoot & Campañas Comerciales',
    categoria: 'shoot',
    descripcion: 'Una jornada completa dedicada a generar todo el material audiovisual y fotográfico que tu marca necesita para el mes o tu nueva temporada comercial.',
    detallesIncluidos: [
      'Jornada de producción de 3 o 5 horas',
      'Reels personalizados a elección del cliente',
      'Creación y validación previa de los guiones de cada reel',
      'Equipo profesional incluido: micrófonos, luz de apoyo y trípode',
      'Edición y etalonaje de color profesional'
    ],
    precio: 'Desde S/. 400 (Planes Básico 3h y Pro 5h)',
    precioNumero: 400,
    imagenUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    destacado: true,
    publicado: true,
    orden: 3
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    titulo: 'Cobertura Cinematográfica de Boda en Cieneguilla',
    descripcion: 'Fotografía documental y reels románticos en atardecer capturando emociones auténticas.',
    categoria: 'bodas',
    imagenUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    fecha: '2026-02-14',
    publicado: true,
    orden: 1
  },
  {
    id: 'port-2',
    titulo: 'Campaña Primavera para Marca de Moda Sostenible',
    descripcion: 'Sesión editorial en estudio y locación natural con enfoque en texturas y detalles de prendas.',
    categoria: 'marcas',
    imagenUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    fecha: '2026-01-20',
    publicado: true,
    orden: 2
  },
  {
    id: 'port-3',
    titulo: 'Inauguración Boutiques & Gastronomía Miraflores',
    descripcion: 'Stories en vivo, interacción con invitados y reel recap con más de 80k visualizaciones.',
    categoria: 'eventos',
    imagenUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    fecha: '2026-02-05',
    publicado: true,
    orden: 3
  },
  {
    id: 'port-4',
    titulo: 'Retratos Corporativos & Marca Personal',
    descripcion: 'Sesión de retratos cercana y profesional para fundadoras y directores de empresas.',
    categoria: 'retratos',
    imagenUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    fecha: '2026-01-10',
    publicado: true,
    orden: 4
  },
  {
    id: 'port-5',
    titulo: 'Sesión Pre-Boda al Atardecer en Playa',
    descripcion: 'Toma íntima y narrativa visual en tonos dorados cálidos sin poses artificiales.',
    categoria: 'bodas',
    imagenUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
    fecha: '2026-02-28',
    publicado: true,
    orden: 5
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    titulo: 'Showreel Audiovisual Studio Foráneas',
    descripcion: 'Compilación de nuestros mejores trabajos de boda, comerciales de marcas y eventos.',
    categoria: 'reels',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', // Standard showcase video
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop',
    publicado: true,
    orden: 1
  },
  {
    id: 'vid-2',
    titulo: 'Recap Cinematográfico de Boda & Evento',
    descripcion: 'Resumen emocional de 60 segundos diseñado con el formato vertical ideal para Instagram Reels y TikTok.',
    categoria: 'bodas',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop',
    publicado: true,
    orden: 2
  }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: 'promo-temporada-bodas',
    titulo: 'PROMOCIÓN DE BODAS & EVENTOS',
    descripcion: '20% de descuento reservando tu fecha con anticipación para este mes. Incluye stories en tiempo real y reel recap de regalo.',
    descuentoTexto: '20% OFF',
    imagenUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    textoBoton: 'Aprovechar Oferta',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31',
    activo: true,
    prioridad: 1
  }
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-demo-1',
    clienteNombre: 'Camila Montoya',
    correo: 'camila.montoya@ejemplo.com',
    telefono: '+51 987 654 321',
    servicioSolicitado: 'Creación de Contenido para Eventos & Bodas',
    fechaEvento: '2026-10-24',
    lugar: 'Hacienda Villa Hermosa, Lurín',
    detalles: 'Estamos buscando cobertura de video y fotos para nuestra boda. Nos interesa mucho tener stories en tiempo real para que los invitados que no pudieron viajar lo vean.',
    presupuestoAprox: 'S/. 1,000 - S/. 1,500',
    comoNosConocio: 'Instagram',
    estado: 'PENDIENTE',
    observacionesInternas: 'Contactar por WhatsApp para coordinar llamada de 15 min.',
    creadoEn: '2026-03-01T10:30:00.000Z'
  },
  {
    id: 'req-demo-2',
    clienteNombre: 'Diego Alarcón - Marca Aura Concept',
    correo: 'diego@auraconcept.pe',
    telefono: '+51 912 345 678',
    servicioSolicitado: 'Creación de Contenido para Redes Sociales',
    fechaEvento: '2026-04-01',
    lugar: 'San Isidro / Remoto',
    detalles: 'Necesitamos el Pack Crecimiento mensual para lanzar nuestra nueva línea de accesorios. Queremos coordinar el cronograma y los guiones.',
    presupuestoAprox: 'S/. 700 / mes',
    comoNosConocio: 'Recomendación de amiga',
    estado: 'CONTACTADO',
    observacionesInternas: 'Ya se envió el PDF de planes y tarifas por WhatsApp.',
    creadoEn: '2026-02-27T16:15:00.000Z'
  }
];
