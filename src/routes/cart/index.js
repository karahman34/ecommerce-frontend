import IndexPage from "pages/cart/Index";

export const prefix = "/carts";

const cartIndexRoutes = [
  {
    path: "/",
    title: "Cart",
    middleware: "auth",
    component: IndexPage,
  },
];

export default cartIndexRoutes;
