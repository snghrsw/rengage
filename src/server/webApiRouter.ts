import * as express from 'express';

import firebase from './firebase';

const app = express();

app.post('/auth', async (req, res) => {
	await firebase.auth().signInWithEmailAndPassword(req.body.username, req.body.password)
		.catch(error => {
			return res.redirect('/login');
		});

	await firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			return res.redirect('/admin')
		}
		return res.redirect('/login')
	})
});

export default app;