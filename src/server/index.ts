
import * as Router from 'universal-router';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import UniversalRouteRedirectException from './../utils/UniversalRouteRedirectExeption';

import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import Html from './../components/Html';
import * as debugFactory from 'debug';
import routes from './../routes';
import webApiRouter from './../server/webApiRouter';

const app = express();
const debug = debugFactory('info');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webApiRouter);

function reactComponentToHtmlString(Component: React.ReactElement<any>): string {
  const content: string = renderToString(Component);
  return `<!DOCTYPE html>${renderToStaticMarkup(Html(content))}`;
};

app.get('*', (req: express.Request, res: express.Response) => {
  const pathOrContext: object = {
    path: req.path,
    redirect: (pathTransitionTo: string): void => {
      throw new UniversalRouteRedirectException(pathTransitionTo);
    },
  };

  return Router.resolve<any, any>(routes, pathOrContext)
    .then((Component: React.ReactElement<any>) =>
      res.send(reactComponentToHtmlString(Component))
    )
    .catch((error: UniversalRouteRedirectException) =>
      res.redirect(error.pathTransitionTo)
    );
});

app.listen(3000, () => {
  debug('Example app listening on port 3000!');
});
