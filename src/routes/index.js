import IndexPage from "pages/Index";
import LoginPage from "pages/login/Index";
import RegisterPage from "pages/register/Index";

const routes = [
  {
    path: "/",
    exact: true,
    component: IndexPage,
    middleware: "auth",
  },
  {
    path: "/login",
    exact: false,
    layout: "auth",
    title: "Login",
    middleware: "guest",
    component: LoginPage,
  },
  {
    path: "/register",
    exact: false,
    layout: "auth",
    title: "Register",
    middleware: "guest",
    component: RegisterPage,
  },
];

export default routes;
