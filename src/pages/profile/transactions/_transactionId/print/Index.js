import transactionApi from "api/transactionApi";
import { Link } from "react-router-dom";
import { formatToRupiah } from "helpers/moneyHelper";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentStyles from "./Styles.module.scss";

const Index = () => {
  const { transactionId } = useParams();

  const [appName] = useState(process.env.REACT_APP_TITLE);
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);

  const subtotal = useMemo(() => {
    if (!transaction) {
      return null;
    }

    return transaction.order_details.reduce((total, cart) => {
      return total + cart.qty * cart.product.price;
    }, 0);
  }, [transaction]);

  const fetchTransactionDetails = useCallback(async () => {
    try {
      const res = await transactionApi.details(transactionId);
      const { data } = res.data;

      setTransaction(data);
    } catch (err) {
      alert("Failed to fetch transaction details, please try again later.");
    } finally {
      setLoading(false);
    }
  }, [transactionId]);

  // Fetch data on load.
  useEffect(() => {
    fetchTransactionDetails();
  }, [fetchTransactionDetails]);

  // Print when data exist.
  useEffect(() => {
    if (transaction && !loading) {
      window.print();
    }
  }, [transaction, loading]);

  return (
    <div className={ComponentStyles.transactionPrintPage}>
      {/* Loading */}
      {loading && <h5 className='text-center'>Fetching transactions data..</h5>}

      {/* No Data */}
      {!loading && !transaction && (
        <h5>
          <Link to='/'>
            <i className='mdi mdi-home mr-2'></i>
            Go Back Home
          </Link>
        </h5>
      )}

      {/* Data */}
      {!loading && transaction && (
        <div className={ComponentStyles.container}>
          {/* Header */}
          <div className='text-center'>
            <h1>{appName}</h1>
            <h6>{window.location.origin}</h6>
          </div>

          {/* Meta Data */}
          <div className={ComponentStyles.meta}>
            <span>Transaction Id: {transaction.id}</span>
            <span>Buyer Name: {transaction.send_to.name}</span>
          </div>

          {/* Line */}
          <div className={ComponentStyles.line}></div>

          {/* Product List */}
          <table className={ComponentStyles.table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {transaction.order_details.map((cart) => (
                <tr key={cart.product.id}>
                  <td>{cart.product.id}</td>
                  <td>{cart.product.name}</td>
                  <td>{cart.qty}</td>
                  <td>{formatToRupiah(cart.product.price)}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan='3' className='text-right'>
                  Subtotal:
                </td>
                <td>{formatToRupiah(subtotal)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Line */}
          <div className={ComponentStyles.line}></div>

          {/* Footer */}
          <p className='my-0 text-center'>
            Thank you for shopping in our shop, we will continue to try to do
            our best for the buyers.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
