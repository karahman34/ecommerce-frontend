import React, { useCallback, useEffect, useState } from "react";
import transactionApi from "api/transactionApi";
import Alert from "components/Alert/Alert";
import { Card, FormControl } from "react-bootstrap";
import Table from "components/transaction/Table/Table";
import Pagination from "components/global/Pagination/Pagination";
import TransactionDetails from "components/transaction/Details/Details";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [perPage] = useState(10);
  const [lastPage, setLastPage] = useState(null);
  const [params, setParams] = useState({
    limit: perPage,
    order: "desc",
    page: 1,
  });
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });
  const [focusTransaction, setFocusTransaction] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setAlert({
      variant: null,
      message: null,
    });

    try {
      const res = await transactionApi.all(params);
      const { data, meta } = res.data;

      setTotalItems(meta.total);
      setTransactions((prev) => [...prev, ...data]);
      setLastPage(meta.last_page);
    } catch (err) {
      setAlert({
        variant: "danger",
        message: "Failed to fetch transactions data, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    setTransactions([]);
  }, [params.page, params.order]);

  return (
    <div>
      {/* Alert */}
      {alert.variant && alert.message && (
        <Alert variant={alert.variant}>{alert.message}</Alert>
      )}

      {/* Details */}
      {focusTransaction && (
        <TransactionDetails
          transaction={focusTransaction}
          onHide={() => setFocusTransaction(null)}
        />
      )}

      <Card className='border-0 shadow-sm'>
        <Card.Body>
          <Card.Title>
            <i className='mdi mdi-truck mr-2'></i>
            Transactions
          </Card.Title>

          {/* Filter */}
          <div className='d-flex mb-2'>
            <div>
              {/* Order */}
              <FormControl
                as='select'
                value={params.order}
                onChange={(e) =>
                  setParams((prevParams) => ({
                    ...prevParams,
                    order: e.target.value,
                    page: null,
                  }))
                }
              >
                <option value='asc'>Oldest</option>
                <option value='desc'>Newest</option>
              </FormControl>
            </div>
          </div>

          {/* Table */}
          <Table
            loading={loading}
            transactions={transactions}
            onDetailClick={setFocusTransaction}
          />

          {/* Pagination */}
          {!loading &&
            transactions.length > 0 &&
            lastPage !== null &&
            lastPage > 1 && (
              <div className='d-flex justify-content-center'>
                <Pagination
                  active={params.page}
                  total={totalItems}
                  perPage={perPage}
                  onChange={(page) => {
                    if (page !== params.page) {
                      setParams((prevParams) => ({
                        ...prevParams,
                        page,
                      }));
                    }
                  }}
                />
              </div>
            )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Index;
