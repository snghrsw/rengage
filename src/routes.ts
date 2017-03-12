import AdminBoard from './components/pages/AdminBoard';
import ApplicateForm from './components/organisms/ApplicateForm';
import LoginForm from './components/organisms/LoginForm';
import Resume from './components/organisms/Resume';
import Waiting from './components/pages/Waiting';
import { auth } from './server/firebase';
import NotFound from './components/pages/NotFound';

interface IUniversalRoute {
  path: string;
  action(props: { redirect?(transitionPath: string): void }): JSX.Element | void;
}

export default [
  {
    path: '/:uid',
    action: async ({ redirect }) => {
      if (!auth.isSignedCustomer) {
        return redirect('/');
      }
      if (!await auth.isResumeAccpetedAsync) {
        return Waiting(auth);
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
    action: async ({ redirect }) => {
      if (!await auth.isResumeAccpetedAsync) {
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
  {
    path: '*',
    action: () => {
      return NotFound();
    },
  },
] as IUniversalRoute[];
