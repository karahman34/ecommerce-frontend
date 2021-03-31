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
    component: LoginPage,
    layout: "auth",
    middleware: "guest",
  },
  {
    path: "/register",
    exact: false,
    component: RegisterPage,
    layout: "auth",
    middleware: "guest",
  },
];

export default routes;
