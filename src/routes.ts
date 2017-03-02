import * as React from 'react-dom';

import Html from './components/Html'
import LoginForm from './components/organisms/LoginForm';

export default [
	{
		path: '/', 
		async action({ next }) {
			const children = await next();
			return Html({ children });
		},
		children: [
		  {
				path: '/login',
				action: () => LoginForm()
			},
		]}
];
