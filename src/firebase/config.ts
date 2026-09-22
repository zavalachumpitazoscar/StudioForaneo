import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth;
  const errMsg = error instanceof Error ? error.message : String(error);

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    operationType,
    path,
    authInfo: {
      userId: currentAuth?.currentUser?.uid || null,
      email: currentAuth?.currentUser?.email || null,
      emailVerified: currentAuth?.currentUser?.emailVerified || null,
      isAnonymous: currentAuth?.currentUser?.isAnonymous || null,
    },
  };

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey.trim() !== '' &&
  firebaseConfig.projectId.trim() !== ''
);

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    // CRITICAL: Bind to the exact firestoreDatabaseId
    firestoreInstance = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
      ? getFirestore(appInstance, firebaseConfig.firestoreDatabaseId)
      : getFirestore(appInstance);
  } catch (err) {
    console.warn('Firebase initialization warning:', err);
  }
}

export const app = appInstance;
export const auth = authInstance;
export const db = firestoreInstance;
export { firebaseConfig };

let firestoreAccessible: boolean | null = null;
let lastCheckTime = 0;

export async function isFirestoreOnline(): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return false;

  const now = Date.now();
  // Cache the check for 15 seconds to minimize network round-trips
  if (firestoreAccessible !== null && now - lastCheckTime < 15000) {
    return firestoreAccessible;
  }

  try {
    // Light server probe to check if rules allow reading test or site configuration
    await getDocFromServer(doc(db, 'test', 'connection'));
    firestoreAccessible = true;
    lastCheckTime = now;
    return true;
  } catch (error) {
    lastCheckTime = now;
    firestoreAccessible = false;
    return false;
  }
}

// Reset cache on authentication changes so admin privileges are immediately re-evaluated
if (authInstance) {
  authInstance.onAuthStateChanged(() => {
    firestoreAccessible = null;
    lastCheckTime = 0;
  });
}

