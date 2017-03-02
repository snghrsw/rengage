import * as express from 'express';
import * as firebase from 'firebase';

import ReactDOM from 'react-dom';
import Router from 'universal-router';
import debugFactory from 'debug';
import { renderToString } from 'react-dom/server';
import routes from './routes';

const app = express();
const debug = debugFactory('info');

app.use(async (req, res) => {
	const component = await Router.resolve(routes, {
		path: req.path,
		redirect: (path) => res.redirect(path),
	});
	res.send(renderToString(component));
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});

