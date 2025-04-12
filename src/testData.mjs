import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, push } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const pushTestData = async () => {
  try {
    const testFiles = [
      {
        code: 'test123',
        name: 'test-document.pdf',
        type: 'application/pdf',
        size: 1024 * 1024,
        url: 'https://example.com/test.pdf',
        createdAt: new Date().toISOString()
      },
      {
        code: 'test456',
        name: 'sample-image.jpg',
        type: 'image/jpeg',
        size: 2048 * 1024,
        url: 'https://example.com/image.jpg',
        createdAt: new Date().toISOString()
      }
    ]

    const filesRef = ref(database, 'files')
    
    for (const testFile of testFiles) {
      const newFileRef = push(filesRef)
      await set(newFileRef, testFile)
    }

    console.log('Test data pushed successfully!')
  } catch (error) {
    console.error('Error pushing test data:', error)
  }
}

pushTestData()