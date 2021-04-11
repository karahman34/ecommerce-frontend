import TransactionsIndexPage from "pages/profile/transactions/Index";
import PrintTransactionPage from "pages/profile/transactions/_transactionId/print/Index";

const prefix = "/transactions";

const transactionsIndexRoutes = [
  {
    exact: true,
    path: `${prefix}`,
    title: "Transactions",
    layout: "profile",
    middleware: "auth",
    component: TransactionsIndexPage,
  },
  {
    path: `${prefix}/:transactionId/print`,
    title: "Transactions",
    layout: "none",
    middleware: "auth",
    component: PrintTransactionPage,
  },
];

export default transactionsIndexRoutes;
