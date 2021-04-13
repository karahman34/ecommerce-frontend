import ProductsRoutes from "./products/index";
import cartIndexRoutes from "./cart";
import profileIndexRoutes from "./profile";

import IndexPage from "pages/Index";
import LoginPage from "pages/login/Index";
import RegisterPage from "pages/register/Index";
import ResetPasswordPage from "pages/reset-password/Index";
import ForgotPasswordPage from "pages/forgot-password/Index";
import BrowsePage from "pages/browse/Index";

const routes = [
  {
    path: "/",
    exact: true,
    component: IndexPage,
  },
  {
    path: "/login",
    meta: {
      title: "Login",
      layout: "auth",
      middleware: "guest",
    },
    component: LoginPage,
  },
  {
    path: "/register",
    meta: {
      layout: "auth",
      title: "Register",
      middleware: "guest",
    },
    component: RegisterPage,
  },
  {
    path: "/forgot-password",
    meta: {
      layout: "auth",
      title: "Forgot Password",
      middleware: "guest",
    },
    component: ForgotPasswordPage,
  },
  {
    path: "/reset-password",
    meta: {
      layout: "auth",
      title: "Reset Password",
      middleware: "guest",
    },
    component: ResetPasswordPage,
  },
  {
    path: "/browse",
    component: BrowsePage,
  },
  ...ProductsRoutes,
  ...cartIndexRoutes,
  ...profileIndexRoutes,
];

export default routes;
