import IndexPage from "pages/cart/Index";

export const prefix = "/cart";

const cartIndexRoutes = [
  {
    path: prefix,
    title: "Cart",
    middleware: "auth",
    component: IndexPage,
  },
];

export default cartIndexRoutes;
