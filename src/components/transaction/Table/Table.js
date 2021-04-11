import React from "react";
import PropTypes from "prop-types";
import { Badge, Button, Table as BootrapTable, Spinner } from "react-bootstrap";
import { formatDateTime } from "helpers/dateHelper";
import { formatToRupiah } from "helpers/moneyHelper";

const Table = ({ loading, transactions, onDetailClick }) => {
  return (
    <BootrapTable striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Order Id</th>
          <th>Total</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {/* Loading */}
        {loading && (
          <tr>
            <td colSpan='100%' className='text-muted'>
              <div className='d-flex justify-content-center align-items-center'>
                <Spinner
                  variant='secondary'
                  animation='border'
                  className='mr-2'
                  size='sm'
                />
                <span>Fetching transactions data...</span>
              </div>
            </td>
          </tr>
        )}

        {/* List data */}
        {!loading &&
          transactions.length > 0 &&
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.order_id}</td>
              <td>{formatToRupiah(transaction.total)}</td>
              <td>
                <h5 className='mb-0'>
                  <Badge
                    variant={`${
                      transaction.status === "pending" ? "warning" : "success"
                    }`}
                  >
                    {transaction.status}
                  </Badge>
                </h5>
              </td>
              <td>{formatDateTime(transaction.created_at)}</td>
              <td>
                <Button size='sm' onClick={(e) => onDetailClick(transaction)}>
                  <i className='mdi mdi-eye'></i>
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </BootrapTable>
  );
};

Table.propTypes = {
  loading: PropTypes.bool,
  transactions: PropTypes.array.isRequired,
  onDetailClick: PropTypes.func.isRequired,
};

export default Table;
