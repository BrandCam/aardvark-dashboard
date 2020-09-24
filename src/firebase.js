import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgJMamgE5VioreMsZSQiPG88XIzkncvSs",
  authDomain: "aardvark-ad2d6.firebaseapp.com",
  databaseURL: "https://aardvark-ad2d6.firebaseio.com",
  projectId: "aardvark-ad2d6",
  storageBucket: "aardvark-ad2d6.appspot.com",
  messagingSenderId: "894001134038",
  appId: "1:894001134038:web:9493bb092090140d038c77",
  measurementId: "G-Z85QZTLM7D",
};

export const app = firebase.initializeApp(firebaseConfig);
