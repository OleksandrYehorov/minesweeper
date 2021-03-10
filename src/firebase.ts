import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: 'AIzaSyDJdOEpo7tADYFOhGZwyHJrKQ66tLUZ_Sk',
        authDomain: 'minesweeper-12668.firebaseapp.com',
        projectId: 'minesweeper-12668',
        storageBucket: 'minesweeper-12668.appspot.com',
        messagingSenderId: '227670634951',
        appId: '1:227670634951:web:e4cd4f9c038577b7c369e2',
        measurementId: 'G-BT2Q977QMC',
      }
    : {
        apiKey: 'AIzaSyAF0yJX04phu1YuHY94UCkETMalgAwJt8w',
        authDomain: 'minesweeper-dev-12668.firebaseapp.com',
        projectId: 'minesweeper-dev-12668',
        storageBucket: 'minesweeper-dev-12668.appspot.com',
        messagingSenderId: '926976365397',
        appId: '1:926976365397:web:af9d1d5fd366c320aa15dc',
        measurementId: 'G-NQ5N9BNNJW',
      };

firebase.initializeApp(firebaseConfig);

export const firebaseAnalytics =
  process.env.NODE_ENV === 'production' ? firebase.analytics() : null;
