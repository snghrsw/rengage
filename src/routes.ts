import Html from "./components/Html";
import LoginForm from "./components/organisms/LoginForm";
import AdminBoard from "./components/pages/AdminBoard";
import firebase from "./server/firebase";

export default [
  {
    action: () => LoginForm(),
    path: "/login",
  },
  {
    action: ({ redirect }) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return AdminBoard();
        }
        return redirect("/login");
      });
    },
    path: "/admin",
  },
];
