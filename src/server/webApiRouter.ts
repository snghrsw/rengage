import * as express from 'express';

import firebase from './firebase';

const app = express();

app.post('/auth', (req, res) => {
  return firebase.auth().signInWithEmailAndPassword(req.body.username, req.body.password)
    .then(() => res.redirect('/admin'))
    .catch(error => res.redirect('/login'));
});

export default app;
