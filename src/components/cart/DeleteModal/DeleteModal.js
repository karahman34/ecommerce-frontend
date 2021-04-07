import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { removeCartItem } from "store/modules/cart/actions";
import { connect } from "react-redux";
import Alert from "components/Alert/Alert";

const mapDispatchToProps = (dispatch) => ({
  removeCartItem: (cart) => dispatch(removeCartItem(cart)),
});

const DeleteModal = ({ cart, onDeleted, onHide, removeCartItem }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  async function deleteHandler(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({
      variant: null,
      message: null,
    });

    try {
      await removeCartItem(cart);

      onDeleted(cart);
      onHide();
    } catch (err) {
      setLoading(false);

      setAlert({
        variant: "danger",
        message: "Failed to delete Cart item.",
      });
    }
  }

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.variant && alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}

        <p>
          Are you sure want to delete{" "}
          <span className='text-primary'>{cart.product.name}</span> from the
          cart ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' className='mr-2' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' disabled={loading} onClick={deleteHandler}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DeleteModal);
