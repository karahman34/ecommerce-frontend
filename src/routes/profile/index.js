import IndexPage from "pages/profile/Index";

export const prefix = "/profile";

const profileIndexRoutes = [
  {
    path: prefix,
    title: "Profile",
    layout: "profile",
    middleware: "auth",
    component: IndexPage,
  },
];

export default profileIndexRoutes;
