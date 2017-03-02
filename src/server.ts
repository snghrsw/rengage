import * as ReactDOM from 'react-dom';
import * as express from 'express';
import * as firebase from 'firebase';

import Html from './components/Html';
import Router from 'universal-router';
import debugFactory from 'debug';
import { renderToStaticMarkup } from 'react-dom/server';
import routes from './routes';

const app = express();
const debug = debugFactory('info');

app.use(express.static('public'));

app.use(async (req, res) => {
	const children = await Router.resolve(routes, {
		path: req.path,
		redirect: (path) => res.redirect(path),
	});
	res.send(renderToStaticMarkup(Html({ children })));
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});

