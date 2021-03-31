import IndexPage from "pages/Index";
import LoginPage from "pages/login/Index";

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
];

export default routes;
