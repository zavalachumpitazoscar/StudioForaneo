import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType, isFirestoreOnline } from './config';
import {
  ServiceItem,
  PortfolioItem,
  VideoItem,
  OfferItem,
  ServiceRequest,
  SiteConfig,
  UserProfile
} from '../types';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_VIDEOS,
  INITIAL_OFFERS,
  INITIAL_REQUESTS
} from '../data/initialData';

// Local storage keys for fallback demo mode
const STORAGE_KEYS = {
  SERVICES: 'studio_foraneas_services',
  PORTFOLIO: 'studio_foraneas_portfolio',
  VIDEOS: 'studio_foraneas_videos',
  OFFERS: 'studio_foraneas_offers',
  REQUESTS: 'studio_foraneas_requests',
  CONFIG: 'studio_foraneas_config',
  USERS: 'studio_foraneas_users',
};

function getLocalData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function setLocalData<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

// ---------------- SERVICES ----------------
export async function fetchServices(): Promise<ServiceItem[]> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  const path = 'services';
  try {
    const q = query(collection(db, path), orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_SERVICES;
    }
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ServiceItem));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
}

export async function saveService(service: ServiceItem): Promise<void> {
  const list = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  const index = list.findIndex(s => s.id === service.id);
  if (index >= 0) {
    list[index] = service;
  } else {
    list.push(service);
  }
  setLocalData(STORAGE_KEYS.SERVICES, list);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `services/${service.id}`;
  try {
    await setDoc(doc(db, 'services', service.id), service, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function removeService(serviceId: string): Promise<void> {
  const list = getLocalData<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  const filtered = list.filter(s => s.id !== serviceId);
  setLocalData(STORAGE_KEYS.SERVICES, filtered);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `services/${serviceId}`;
  try {
    await deleteDoc(doc(db, 'services', serviceId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ---------------- PORTFOLIO ----------------
export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  }
  const path = 'portfolio';
  try {
    const q = query(collection(db, path), orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_PORTFOLIO;
    }
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PortfolioItem));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return getLocalData<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  }
}

export async function savePortfolioItem(item: PortfolioItem): Promise<void> {
  const list = getLocalData<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  const index = list.findIndex(p => p.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.push(item);
  }
  setLocalData(STORAGE_KEYS.PORTFOLIO, list);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `portfolio/${item.id}`;
  try {
    await setDoc(doc(db, 'portfolio', item.id), item, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function removePortfolioItem(itemId: string): Promise<void> {
  const list = getLocalData<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  const filtered = list.filter(p => p.id !== itemId);
  setLocalData(STORAGE_KEYS.PORTFOLIO, filtered);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `portfolio/${itemId}`;
  try {
    await deleteDoc(doc(db, 'portfolio', itemId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ---------------- VIDEOS ----------------
export async function fetchVideos(): Promise<VideoItem[]> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  }
  const path = 'videos';
  try {
    const q = query(collection(db, path), orderBy('orden', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_VIDEOS;
    }
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as VideoItem));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  }
}

export async function saveVideo(video: VideoItem): Promise<void> {
  const list = getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  const index = list.findIndex(v => v.id === video.id);
  if (index >= 0) {
    list[index] = video;
  } else {
    list.push(video);
  }
  setLocalData(STORAGE_KEYS.VIDEOS, list);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `videos/${video.id}`;
  try {
    await setDoc(doc(db, 'videos', video.id), video, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function removeVideo(videoId: string): Promise<void> {
  const list = getLocalData<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  const filtered = list.filter(v => v.id !== videoId);
  setLocalData(STORAGE_KEYS.VIDEOS, filtered);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `videos/${videoId}`;
  try {
    await deleteDoc(doc(db, 'videos', videoId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ---------------- OFFERS ----------------
export async function fetchOffers(): Promise<OfferItem[]> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  }
  const path = 'offers';
  try {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot.empty) {
      return INITIAL_OFFERS;
    }
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as OfferItem));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return getLocalData<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  }
}

export async function saveOffer(offer: OfferItem): Promise<void> {
  const list = getLocalData<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  const index = list.findIndex(o => o.id === offer.id);
  if (index >= 0) {
    list[index] = offer;
  } else {
    list.push(offer);
  }
  setLocalData(STORAGE_KEYS.OFFERS, list);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `offers/${offer.id}`;
  try {
    await setDoc(doc(db, 'offers', offer.id), offer, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function removeOffer(offerId: string): Promise<void> {
  const list = getLocalData<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
  const filtered = list.filter(o => o.id !== offerId);
  setLocalData(STORAGE_KEYS.OFFERS, filtered);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `offers/${offerId}`;
  try {
    await deleteDoc(doc(db, 'offers', offerId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ---------------- REQUESTS (CLIENT + ADMIN) ----------------
export async function createServiceRequest(
  data: Omit<ServiceRequest, 'id' | 'estado' | 'creadoEn'>
): Promise<ServiceRequest> {
  const newRequest: ServiceRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    estado: 'PENDIENTE',
    creadoEn: new Date().toISOString()
  };

  // Guardar en caché local inmediatamente
  const list = getLocalData<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  list.unshift(newRequest);
  setLocalData(STORAGE_KEYS.REQUESTS, list);

  if (!isFirebaseConfigured || !db) {
    console.info('Firebase no configurado, solicitud almacenada localmente.');
    return newRequest;
  }

  const path = `requests/${newRequest.id}`;
  try {
    await setDoc(doc(db, 'requests', newRequest.id), {
      ...newRequest,
      createdAtServer: serverTimestamp()
    });
    console.log('✅ Solicitud enviada a Firestore en colección "requests":', newRequest.id);
    return newRequest;
  } catch (err) {
    console.error('⚠️ Error al registrar en Firestore (requests):', err);
    return newRequest;
  }
}

export async function fetchServiceRequests(): Promise<ServiceRequest[]> {
  const localList = getLocalData<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  if (!isFirebaseConfigured || !db) {
    return localList;
  }
  const path = 'requests';
  try {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot.empty) {
      return localList;
    }
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ServiceRequest));
    setLocalData(STORAGE_KEYS.REQUESTS, items);
    return items.sort((a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime());
  } catch (err) {
    console.warn('⚠️ No se pudieron obtener solicitudes desde Firestore, usando datos locales:', err);
    return localList;
  }
}

export async function fetchUserRequests(email: string, userId?: string): Promise<ServiceRequest[]> {
  const cleanEmail = email.toLowerCase().trim();
  const localList = getLocalData<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  const localUserRequests = localList.filter(r =>
    (r.correo && r.correo.toLowerCase().trim() === cleanEmail) ||
    (userId && r.userId === userId)
  );

  const online = await isFirestoreOnline();
  if (!online || !db) {
    return localUserRequests;
  }

  const path = 'requests';
  try {
    const q = query(
      collection(db, path),
      where('correo', '==', cleanEmail)
    );
    const snapshot = await getDocs(q);
    const serverRequests = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ServiceRequest));

    // Combine with local to guarantee immediate reactivity
    const all = [...serverRequests];
    for (const l of localUserRequests) {
      if (!all.some(a => a.id === l.id)) {
        all.push(l);
      }
    }
    return all.sort((a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime());
  } catch (err) {
    console.warn('Fallback querying user requests:', err);
    return localUserRequests;
  }
}

export async function updateServiceRequest(
  requestId: string,
  updates: Partial<Pick<ServiceRequest, 'estado' | 'observacionesInternas'>>
): Promise<void> {
  const updatedData = {
    ...updates,
    actualizadoEn: new Date().toISOString()
  };

  const list = getLocalData<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  const index = list.findIndex(r => r.id === requestId);
  if (index >= 0) {
    list[index] = { ...list[index], ...updatedData };
    setLocalData(STORAGE_KEYS.REQUESTS, list);
  }

  if (!isFirebaseConfigured || !db) return;

  const path = `requests/${requestId}`;
  try {
    await updateDoc(doc(db, 'requests', requestId), {
      ...updatedData,
      updatedAtServer: serverTimestamp()
    });
    console.log('✅ Solicitud actualizada en Firestore:', requestId);
  } catch (err) {
    console.error('⚠️ Error actualizando solicitud en Firestore:', err);
  }
}

export async function removeServiceRequest(requestId: string): Promise<void> {
  const list = getLocalData<ServiceRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  const filtered = list.filter(r => r.id !== requestId);
  setLocalData(STORAGE_KEYS.REQUESTS, filtered);

  if (!isFirebaseConfigured || !db) return;

  const path = `requests/${requestId}`;
  try {
    await deleteDoc(doc(db, 'requests', requestId));
    console.log('✅ Solicitud eliminada en Firestore:', requestId);
  } catch (err) {
    console.error('⚠️ Error eliminando solicitud en Firestore:', err);
  }
}

// ---------------- SITE CONFIG ----------------
export async function fetchSiteConfig(): Promise<SiteConfig> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<SiteConfig>(STORAGE_KEYS.CONFIG, INITIAL_SITE_CONFIG);
  }
  const path = 'site_config/main';
  try {
    const docSnap = await getDoc(doc(db, 'site_config', 'main'));
    if (!docSnap.exists()) {
      return INITIAL_SITE_CONFIG;
    }
    return docSnap.data() as SiteConfig;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
    return getLocalData<SiteConfig>(STORAGE_KEYS.CONFIG, INITIAL_SITE_CONFIG);
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  setLocalData(STORAGE_KEYS.CONFIG, config);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = 'site_config/main';
  try {
    await setDoc(doc(db, 'site_config', 'main'), config, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// ---------------- USERS & RBAC ----------------
const INITIAL_USERS: UserProfile[] = [
  {
    uid: 'admin-foraneas-01',
    email: 'admin@studioforaneas.com',
    nombre: 'Nathaly & Rosa (Admin)',
    rol: 'ADMIN',
    activo: true,
    creadoEn: new Date().toISOString()
  }
];

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    const list = getLocalData<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    return list.find(u => u.uid === uid) || null;
  }
  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
    return null;
  }
}

export async function saveUserProfile(user: UserProfile): Promise<void> {
  const list = getLocalData<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  const idx = list.findIndex(u => u.uid === user.uid);
  if (idx >= 0) {
    list[idx] = user;
  } else {
    list.push(user);
  }
  setLocalData(STORAGE_KEYS.USERS, list);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `users/${user.uid}`;
  try {
    await setDoc(doc(db, 'users', user.uid), user, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchUsersList(): Promise<UserProfile[]> {
  const online = await isFirestoreOnline();
  if (!online || !db) {
    return getLocalData<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
  const path = 'users';
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map(d => d.data() as UserProfile);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    return [];
  }
}

export async function deleteUserProfile(uid: string): Promise<void> {
  const list = getLocalData<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  const filtered = list.filter(u => u.uid !== uid);
  setLocalData(STORAGE_KEYS.USERS, filtered);

  const online = await isFirestoreOnline();
  if (!online || !db) return;

  const path = `users/${uid}`;
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
