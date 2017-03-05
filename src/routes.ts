import AdminBoard from './components/pages/AdminBoard';
import Html from './components/Html'
import LoginForm from './components/organisms/LoginForm';
import firebase from './server/firebase';

export default [
	{
		path: '/login',
		action: () => LoginForm()
	},
	{
		path: '/admin',
		action: ({ redirect }) => {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					return AdminBoard();
				}
				return redirect('/login');
			});
		}
	},
];
