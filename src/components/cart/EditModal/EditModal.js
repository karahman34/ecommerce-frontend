import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCartItem } from "store/modules/cart/actions";
import { Button, Form, Modal } from "react-bootstrap";
import Cart from "components/cart/Cart/Cart";
import QtyInput from "components/cart/QtyInput/QtyInput";
import Alert from "components/Alert/Alert";

const mapDispatchToProps = (dispatch) => ({
  updateCartItem: (cart, payload) => dispatch(updateCartItem(cart, payload)),
});

const EditModal = ({ cart, onHide, updateCartItem }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    qty: cart.qty,
    message: cart.message || "",
  });
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  async function updateHandler(e) {
    e.preventDefault();
    setLoading(true);
    setAlert({
      variant: null,
      message: null,
    });

    try {
      await updateCartItem(cart, form);

      setAlert({
        variant: "success",
        message: "Cart updated.",
      });
    } catch (err) {
      setAlert({
        variant: "danger",
        message: "Failed to update Cart item.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show centered size='lg' onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Cart Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {alert.variant && alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}

        <Cart cart={cart} />

        <Form className='mt-4' onSubmit={updateHandler}>
          <Form.Group>
            <Form.Label>Qty</Form.Label>
            <QtyInput
              value={form.qty}
              onPlus={() =>
                setForm({
                  ...form,
                  qty: form.qty + 1,
                })
              }
              onMinus={() => {
                if (form.qty > 1) {
                  setForm({
                    ...form,
                    qty: form.qty - 1,
                  });
                }
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Note'
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            ></Form.Control>
          </Form.Group>

          <button type='submit' className='d-none'></button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='light' className='mr-2' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' disabled={loading} onClick={updateHandler}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(EditModal);
