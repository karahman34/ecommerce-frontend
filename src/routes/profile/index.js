import { mergeChildRoutes } from "helpers/routeHelper";
import IndexPage from "pages/profile/Index";
import PasswordIndexPage from "pages/profile/password/Index";
import transactionsIndexRoutes from "./transactions";

export const prefix = "/profile";

const profileIndexRoutes = [
  {
    path: prefix,
    exact: true,
    title: "Profile",
    layout: "profile",
    middleware: "auth",
    component: IndexPage,
  },
  {
    path: `${prefix}/password`,
    title: "Password",
    layout: "profile",
    middleware: "auth",
    component: PasswordIndexPage,
  },
  ...mergeChildRoutes(prefix, transactionsIndexRoutes),
];

export default profileIndexRoutes;
