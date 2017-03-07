import * as express from 'express';

import firebase from './firebase';

const app = express();

// Authentication for the admin
app.post('/auth', (req, res) => {
  return firebase.auth().signInWithEmailAndPassword(req.body.username, req.body.password)
    .then(() => res.redirect('/admin'))
    .catch(() => res.redirect('/login'));
});

// Resume application for the customer
app.post('/applicate', async (req, res) => {
  const anonymouslyUser = await firebase.auth().signInAnonymously()
    .catch(() => res.redirect('/'));

  firebase.database()
    .ref(`applicate/${anonymouslyUser.uid}`)
    .set({
      ...req.body,
      isResumeAccepted: false,
    });
  return res.redirect(`/${anonymouslyUser.uid}`);
});

export default app;
