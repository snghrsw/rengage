import AdminBoard from './components/pages/AdminBoard';
import ApplicateForm from './components/organisms/ApplicateForm';
import LoginForm from './components/organisms/LoginForm';
import Resume from './components/organisms/Resume';
import Waiting from './components/pages/Waiting';
import { auth } from './server/firebase';

interface IUniversalRoute {
  path: string;
  action(props: { redirect?(transitionPath: string): void }): JSX.Element | void;
}

export default [
  {
    path: '/:uid',
    action: ({ redirect }) => {
      if (!auth.isSignedCustomer) {
        return redirect('/');
      }
      if (!auth.isResumeAccpeted) {
        return Waiting();
      }
      return redirect('/resume');
    },
  },
  {
    path: '/',
    action: ({ redirect }) => {
      if (auth.isSignedCustomer) {
        return redirect(`/${auth.uid}`);
      }
      return ApplicateForm();
    },
  },
  {
    path: '/resume',
    action: ({ redirect }) => {
      if (!auth.isResumeAccpeted) {
        return redirect(`/`);
      }
      return Resume();
    },
  },
  {
    path: '/login',
    action: ({ redirect }) => {
      if (auth.isSignedAdmin) {
        return redirect('/admin');
      }
      return LoginForm();
    },
  },
  {
    path: '/admin',
    action: ({ redirect }) => {
      if (!auth.isSignedAdmin) {
        return redirect('/login');
      }
      return AdminBoard();
    },
  },
] as IUniversalRoute[];
