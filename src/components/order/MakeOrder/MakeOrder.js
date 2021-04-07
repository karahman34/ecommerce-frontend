import transactionApi from "api/transactionApi";
import PropTypes from "prop-types";
import { formatToRupiah } from "helpers/moneyHelper";
import React, { useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { clearCart } from "store/modules/cart/actions";

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

const MakeOrder = ({ cartItems, onSuccess, onFail, clearCart }) => {
  const [loading, setLoading] = useState(false);

  async function createTransactionHandler() {
    setLoading(true);

    try {
      await transactionApi.store();

      onSuccess();
      clearCart();
    } catch (err) {
      console.log(err.response);
      setLoading(false);
      onFail();
    }
  }

  const totalItems = useMemo(
    () =>
      cartItems.reduce((total, cartItem) => {
        return total + cartItem.qty;
      }, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, cartItem) => {
        return total + cartItem.qty * cartItem.product.price;
      }, 0),
    [cartItems]
  );

  return (
    <Card className='border-0 shadow-sm'>
      <Card.Body>
        <div className='d-flex justify-content-between align-items-center'>
          <span>Total Items :</span>
          <span>{totalItems}</span>
        </div>

        <div className='mt-2 d-flex justify-content-between align-items-center'>
          <span>Subtotal :</span>
          <h6 className='my-0'>{formatToRupiah(subtotal)}</h6>
        </div>

        <Button
          className='w-100 mt-1 font-weight-medium'
          disabled={loading}
          onClick={createTransactionHandler}
        >
          <i className='mdi mdi-truck mr-2'></i>
          Confirm Order
        </Button>
      </Card.Body>
    </Card>
  );
};

MakeOrder.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MakeOrder);
