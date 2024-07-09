// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCi9Z04p6vkq5PxWs_Syiqa8P2yEGHb06I',
  authDomain: 'fleetstarpro-5e5f5.firebaseapp.com',
  projectId: 'fleetstarpro-5e5f5',
  storageBucket: 'fleetstarpro-5e5f5.appspot.com',
  messagingSenderId: '287275294934',
  appId: '1:287275294934:web:83ac720e864e79ede56977',
  measurementId: 'G-CQPH2E4QW0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const app_auth = getAuth(app);
const analytics = getAnalytics(app);
