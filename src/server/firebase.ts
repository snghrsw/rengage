import * as firebase from 'firebase';

const config : Object = {
	apiKey: 'AIzaSyC5c_mdvsEHCia1wf_lqCaIZQWS8lBh9Bk',
	authDomain: 'resume-7a6c3.firebaseapp.com',
	databaseURL: 'https://resume-7a6c3.firebaseio.com',
	storageBucket: 'resume-7a6c3.appspot.com',
	messagingSenderId: '103183460643'
}

firebase.initializeApp(config);

export default firebase;