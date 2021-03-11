import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDJdOEpo7tADYFOhGZwyHJrKQ66tLUZ_Sk',
  authDomain: 'minesweeper-12668.firebaseapp.com',
  projectId: 'minesweeper-12668',
  storageBucket: 'minesweeper-12668.appspot.com',
  messagingSenderId: '227670634951',
  appId: '1:227670634951:web:e4cd4f9c038577b7c369e2',
  measurementId: 'G-BT2Q977QMC',
};

export const initFirebase = (): void => {
  if (process.env.NODE_ENV === 'production') {
    firebase.initializeApp(firebaseConfig);
  }
};
