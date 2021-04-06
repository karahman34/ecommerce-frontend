import ProductDetails from "pages/products/_productId/Index";

const prefix = "/products";

const productsIndexRoutes = [
  {
    path: `${prefix}/:productId`,
    component: ProductDetails,
  },
];

export default productsIndexRoutes;
