import * as Router from 'universal-router';
import * as bodyParser from 'body-parser';
import * as express from 'express';

import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import Html from './components/Html';
import debugFactory from 'debug';
import routes from './routes';
import webApiRouter from './server/webApiRouter';

const app = express();
const debug = debugFactory('info');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webApiRouter);

app.use(async (req, res) => {
  const Component: Element = await Router.resolve(routes, {
    path: req.path,
    redirect: (path: string) => res.redirect(path),
  })

  const content: string = renderToString(Component);
  return res.send(renderToStaticMarkup(Html(content)));
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});
