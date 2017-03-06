import * as ReactDOM from 'react-dom';

import Router from 'universal-router';
import routes from './routes';

function render(component) {
  const rootElement: HTMLElement = document.getElementById('root');
  ReactDOM.render(component, rootElement);
}

const options = {
  path: location.pathname,
  redirect: () => ({}),
};
Router.resolve(routes, options).then(render);
