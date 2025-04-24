import Service from '@ember/service';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
};

export default class FirebaseService extends Service {
  app = initializeApp(firebaseConfig);
  // db = getFirestore(this.app);
}
