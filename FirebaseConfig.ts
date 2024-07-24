import {initializeApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi9Z04p6vkq5PxWs_Syiqa8P2yEGHb06I',
  authDomain: 'fleetstarpro-5e5f5.firebaseapp.com',
  projectId: 'fleetstarpro-5e5f5',
  storageBucket: 'fleetstarpro-5e5f5.appspot.com',
  messagingSenderId: '287275294934',
  appId: '1:287275294934:web:83ac720e864e79ede56977',
  measurementId: 'G-CQPH2E4QW0',
  databaseURL: 'https://fleetstarpro-5e5f5-default-rtdb.firebaseio.com/', // Add the database URL
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Database
const database = getDatabase(app);

export {app, auth, database};
