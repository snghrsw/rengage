import * as express from 'express';
import { auth } from './firebaseAuth';

const app = express();

// Authentication for the admin
app.post('/auth', (req: express.Request, res: express.Response) => {
  return auth.authAdmin(req.body.username, req.body.password)
    .then(() => res.redirect('/admin'))
    .catch(() => res.redirect('/login'));
});

// Resume application for the customer
app.post('/applicate', (req: express.Request, res: express.Response) => {
  return auth.authCustomer(req.body.companyName)
    .then(customer => res.redirect(`/${customer.uid}`))
    .catch(() => res.redirect('/'));
});

export default app;
