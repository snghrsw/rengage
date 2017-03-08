require('source-map-support').install();

import * as Router from 'universal-router';
import * as bodyParser from 'body-parser';
import * as express from 'express';

import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import Html from './../components/Html';
import * as debugFactory from 'debug';
import routes from './../routes';
import webApiRouter from './../server/webApiRouter';

const app = express();
const debug = debugFactory('info');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webApiRouter);

app.use(async (req: express.Request, res: express.Response) => {
  const Component: React.ReactElement<any> = await Router.resolve<any, any>(routes, {
    path: req.path,
    redirect: (path: string): void => res.redirect(path),
  });

  const content: string = renderToString(Component);
  return res
    .set('Content-Type', 'text/html')
    .send(`<!DOCTYPE html>${renderToStaticMarkup(Html(content))}`);
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});
;