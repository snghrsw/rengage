import * as ReactDOM from 'react-dom';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as firebase from 'firebase';

import Html from './components/Html';
import Router from 'universal-router';
import debugFactory from 'debug';
import { renderToStaticMarkup } from 'react-dom/server';
import routes from './routes';
import webApiRouter from './server/webApiRouter';

const app = express();
const debug = debugFactory('info');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webApiRouter);

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

