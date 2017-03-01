import * as express from 'express';
import * as firebase from 'firebase';

import App from './../shared/components/App';
import debugFactory from 'debug';
import { renderToString } from 'react-dom/server';

const app = express();
const debug = debugFactory('info');

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "resume-7a6c3.firebaseapp.com",
	databaseURL: "https://resume-7a6c3.firebaseio.com",
	storageBucket: "resume-7a6c3.appspot.com",
	messagingSenderId: "103183460643"
}

firebase.initializeApp(config);
const database = firebase.database();

function checkAuthCustomer(req, res) {
	res.redirect('/');
} 

function checkAuthAdmin(req, res) {
	res.redirect('/login');
} 

app.get('/:accessToken', checkAuthCustomer, (req, res) => {
	res.send(renderToString(App({})))
});

app.get('/', (req, res) =>
	res.send(renderToString(App({})))
);

app.get('/please-wait', checkAuthAdmin, (req, res) => {
	res.send(renderToString(App({
		state: 123
	})))
});

app.get('/login', checkAuthAdmin, (req, res) => {
	res.send(renderToString(App({
		state: 123
	})))
});

app.get('/admin', checkAuthAdmin, (req, res) => {
	res.send(renderToString(App({
		state: 123
	})))
});

// Login
app.post('/auth', (req, res) => {
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
		.catch(error => {
			debug(error);
		});

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			debug(`User is signed in ${user.uid}`);
			database.ref(`/admin/${user.uid}`).once('value').then(function(snapshot) {
				debug(snapshot.val());
			})
			res.redirect('/admin');
		} else {
			debug('No user is signed in.')
		}
	})

});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});

firebase.auth().signInWithEmailAndPassword('hirayamaru@gmail.com', 'shin0123')
	.catch(error => {
		debug(error);
	});


