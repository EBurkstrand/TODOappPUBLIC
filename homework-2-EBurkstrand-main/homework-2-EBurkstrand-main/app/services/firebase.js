import Service from '@ember/service';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkL4XyMiVvMGsD3kipAbaQ8xCyiMn2Gq0',
  authDomain: 'homework-2-b0789.firebaseapp.com',
  projectId: 'homework-2-b0789',
  storageBucket: 'homework-2-b0789.firebasestorage.app',
  messagingSenderId: '549803176861',
  appId: '1:549803176861:web:7ee2dae13f3da7e6f3b574',
  measurementId: 'G-51CR6XG4RX',
};

export default class FirebaseService extends Service {
  app = initializeApp(firebaseConfig);
  // db = getFirestore(this.app);
}
