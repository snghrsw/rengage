import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC5c_mdvsEHCia1wf_lqCaIZQWS8lBh9Bk',
  authDomain: 'resume-7a6c3.firebaseapp.com',
  databaseURL: 'https://resume-7a6c3.firebaseio.com',
  messagingSenderId: '103183460643',
  storageBucket: 'resume-7a6c3.appspot.com',
};

const firebaseInstance = firebase.initializeApp(config);

export const isAuthLogin = (): boolean =>
  firebaseInstance.auth().currentUser !== null;

export default firebaseInstance;
