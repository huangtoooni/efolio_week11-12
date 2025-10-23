import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase only if config is available
let db = null

try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } else {
    console.warn('Firebase configuration not found. Some features may not work.')
  }
} catch (error) {
  console.error('Error initializing Firebase:', error)
}

export default db
