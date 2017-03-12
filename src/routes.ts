import AdminBoard from './components/pages/AdminBoard';
import ApplicateForm from './components/organisms/ApplicateForm';
import LoginForm from './components/organisms/LoginForm';
import Resume from './components/organisms/Resume';
import Waiting from './components/pages/Waiting';
import NotFound from './components/pages/NotFound';
import { auth } from './server/firebaseAuth';

interface IUniversalRoute {
  path: string;
  action(props: { redirect?(transitionPath: string): void }): JSX.Element | void;
}

export default [
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
    path: '/:uid',
    action: async ({ redirect }) => {
      if (!auth.isSignedCustomer) {
        return redirect('/');
      }
      if (!await auth.isResumeAccpetedAsync) {
        return Waiting({ locationHref: location.href });
      }
      return redirect('/resume');
    },
  },
  {
    path: /\//,
    action: ({ redirect }) => {
      if (auth.isSignedCustomer) {
        return redirect(`/${auth.uid}`);
      }
      return ApplicateForm();
    },
  },
  {
    path: '*',
    action: () => {
      return NotFound();
    },
  },
] as IUniversalRoute[];
