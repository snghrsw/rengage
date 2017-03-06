import AdminBoard from './components/pages/AdminBoard';
import LoginForm from './components/organisms/LoginForm';
import { isAuthLogin } from './server/firebase';

export default [
  {
    path: '/login',
    action: ({ redirect }) => {
      if (isAuthLogin()) {
        redirect('/admin');
      }
      return LoginForm();
    },
  },
  {
    path: '/admin',
    action: ({ redirect }) => {
      if (!isAuthLogin()) {
        redirect('/login');
      }
      return AdminBoard();
    },
  },
];
