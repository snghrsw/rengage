import * as express from 'express';
import * as firebase from 'firebase';

import ReactDOM from 'react-dom';
import debugFactory from 'debug';
import { renderToString } from 'react-dom/server';
import { resolve } from 'universal-router';
import routes from './routes';

const app = express();
const debug = debugFactory('info');

app.get('*', async (req, res) => {
	const component = await resolve(routes, { path: req.url });
	res.send(renderToString(component));
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});

