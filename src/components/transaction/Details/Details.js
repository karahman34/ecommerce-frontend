import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ComponentStyles from "./Details.module.scss";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import transactionApi from "api/transactionApi";
import { formatToRupiah } from "helpers/moneyHelper";

const Details = ({ transaction, onHide }) => {
  const [show, setShow] = useState(true);
  const [transactionDetails, settransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const subtotal = useMemo(() => {
    if (!transactionDetails) {
      return null;
    }

    return transactionDetails.order_details.reduce((subtotal, cart) => {
      return subtotal + cart.qty * cart.product.price;
    }, 0);
  }, [transactionDetails]);

  const handleClose = () => setShow(false);

  const fetchTransactionDetails = useCallback(async () => {
    setLoading(true);

    try {
      const res = await transactionApi.details(transaction.id);
      const { data } = res.data;

      settransactionDetails(data);
    } catch (err) {
      alert("Failed to load transaction details, please try again later.");
    } finally {
      setLoading(false);
    }
  }, [transaction]);

  useEffect(() => fetchTransactionDetails(), [fetchTransactionDetails]);

  useEffect(() => {
    if (!show) {
      onHide();
    }
  }, [show, onHide]);

  return (
    <Modal
      show={show}
      size='xl'
      onHide={handleClose}
      className={ComponentStyles.details}
    >
      <Modal.Header closeButton>
        <Modal.Title>#{transaction.id} Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Loading */}
        {loading && (
          <div className='d-flex justify-content-center my-3'>
            <Spinner
              variant='secondary'
              className='text-center'
              animation='border'
            />
          </div>
        )}

        {/* Data */}
        {!loading && transactionDetails !== null && (
          <>
            {/* Header */}
            <div className={ComponentStyles.header}>
              {/* Send To */}
              <div>
                <h5 className='mb-1'>
                  <i className='mdi mdi-truck mr-2'></i>
                  Send To
                </h5>

                <div>
                  <span className='text-muted'>Name: </span>
                  {transactionDetails.send_to.name}
                </div>
                <div>
                  <span className='text-muted'>Telephone: </span>
                  {transactionDetails.send_to.telephone}
                </div>
                <div>
                  <span className='text-muted'>Address: </span>
                  {transactionDetails.send_to.address}
                </div>
              </div>

              {/* Print Btn */}
              <a
                href={`/profile/transactions/${transaction.id}/print`}
                target='_blank'
                rel='noreferrer'
              >
                <Button variant='info' className='font-weight-medium'>
                  <i className='mdi mdi-printer mr-2'></i>
                  Print
                </Button>
              </a>
            </div>

            {/* Products Table */}
            <Table bordered striped className='mt-3'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Note</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {transactionDetails.order_details.map((cart, i) => (
                  <tr key={cart.product.id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={cart.product.thumbnail}
                        alt={cart.product.thumbnail}
                        className={ComponentStyles.productThumbnail}
                      />
                    </td>
                    <td>{cart.product.name}</td>
                    <td>
                      {cart.message ? (
                        cart.message
                      ) : (
                        <span className='text-muted'>No notes.</span>
                      )}
                    </td>
                    <td>{cart.qty}</td>
                    <td>{formatToRupiah(cart.product.price)}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan='5' className='text-right'>
                    Subtotal:
                  </td>
                  <td>{formatToRupiah(subtotal)}</td>
                </tr>
              </tfoot>
            </Table>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

Details.propTypes = {
  transaction: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default Details;
