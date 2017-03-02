import * as React from 'react-dom';
import * as firebase from 'firebase';

import AdminBoard from './components/pages/AdminBoard';
import Html from './components/Html'
import LoginForm from './components/organisms/LoginForm';

const config = {
	apiKey: 'AIzaSyC5c_mdvsEHCia1wf_lqCaIZQWS8lBh9Bk',
	authDomain: 'resume-7a6c3.firebaseapp.com',
	databaseURL: 'https://resume-7a6c3.firebaseio.com',
	storageBucket: 'resume-7a6c3.appspot.com',
	messagingSenderId: '103183460643'
}

firebase.initializeApp(config);

export default [
	{
		path: '/', 
		async action({ next }) {
			const children = await next();
			return Html({ children });
		},
		children: [
		  {
				path: '/login',
				action: () => LoginForm()
			},
		  {
				path: '/admin',
				action: ({ redirect }) => {
					if (firebase.auth().currentUser) {
						return AdminBoard();
					}
					return redirect('/login');
				}
			},
		]
	}
];
