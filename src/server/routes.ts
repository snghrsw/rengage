import * as React from 'react';
import * as express from 'express';
import * as firebase from 'firebase';

import App from './../shared/components/App';
import ReactDOM from 'react-dom';
import debugFactory from 'debug';
import { renderToString } from 'react-dom/server';
import { resolve } from 'universal-router';

const app = express();
const debug = debugFactory('info');

const config = {
	apiKey: 'AIzaSyC5c_mdvsEHCia1wf_lqCaIZQWS8lBh9Bk',
	authDomain: 'resume-7a6c3.firebaseapp.com',
	databaseURL: 'https://resume-7a6c3.firebaseio.com',
	storageBucket: 'resume-7a6c3.appspot.com',
	messagingSenderId: '103183460643'
}

firebase.initializeApp(config);
const database = firebase.database();

const routes = [
  { path: '*', action: () => App({}) },
];

app.get('*', (req, res) => {
	debug(req.url);
	resolve(routes, { path: req.url }).then(component => {
		debug(component);
		res.send(renderToString(component));
	});
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



