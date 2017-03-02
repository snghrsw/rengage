import * as ReactDOM from 'react-dom';

import Router from 'universal-router';
import routes from './routes';

function render(component) {
	const rootElement : HTMLElement = document.getElementById('root');
	ReactDOM.render(component, rootElement);
}

Router.resolve(routes, { path: location.pathname }).then(render);