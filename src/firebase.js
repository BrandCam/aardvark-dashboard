import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASSE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASSE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASSE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASSE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASSE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASSE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASSE_MEASUREMENT_ID,
};

export const app = firebase.initializeApp(firebaseConfig);
