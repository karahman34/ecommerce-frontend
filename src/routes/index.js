import ProductsRoutes from "./products/index";

import IndexPage from "pages/Index";
import LoginPage from "pages/login/Index";
import RegisterPage from "pages/register/Index";
import ResetPasswordPage from "pages/reset-password/Index";
import ForgotPasswordPage from "pages/forgot-password/Index";

const routes = [
  {
    path: "/",
    exact: true,
    component: IndexPage,
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
  {
    path: "/forgot-password",
    exact: false,
    layout: "auth",
    title: "Forgot Password",
    middleware: "guest",
    component: ForgotPasswordPage,
  },
  {
    path: "/reset-password",
    exact: false,
    layout: "auth",
    title: "Reset Password",
    middleware: "guest",
    component: ResetPasswordPage,
  },
  ...ProductsRoutes,
];

export default routes;
