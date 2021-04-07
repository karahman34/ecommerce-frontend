import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import DefaultLayoutStyles from "components/layouts/default/DefaultLayout.module.scss";
import Alert from "components/Alert/Alert";
import CartList from "components/cart/List/List";
import EditCartModal from "components/cart/EditModal/EditModal";
import DeleteCartModal from "components/cart/DeleteModal/DeleteModal";
import SendTo from "components/order/SendTo/SendTo";
import MakeOrder from "components/order/MakeOrder/MakeOrder";
import MakeOrderSkeleton from "components/order/MakeOrderSkeleton/MakeOrderSkeleton";

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

const Index = ({ cartItems }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [focusCart, setFocusCart] = useState(null);
  const [deletedCart, setDeletedCart] = useState(null);
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  const onEdit = useCallback((cart) => {
    setShowEdit(true);
    setFocusCart(cart);
  }, []);

  const onCancelEdit = useCallback(() => {
    setShowEdit(false);
    setFocusCart(null);
  }, []);

  const onDelete = useCallback((cart) => {
    setShowDelete(true);
    setFocusCart(cart);
  }, []);

  const onCancelDelete = useCallback(() => {
    setShowDelete(false);
    setFocusCart(null);
  }, []);

  return (
    <Container className={`${DefaultLayoutStyles.page}`}>
      {/* Edit Cart Modal */}
      {showEdit && <EditCartModal cart={focusCart} onHide={onCancelEdit} />}

      {/* Delete Cart Modal */}
      {showDelete && (
        <DeleteCartModal
          cart={focusCart}
          onHide={onCancelDelete}
          onDeleted={(cart) => setDeletedCart(cart)}
        />
      )}

      <Row>
        <Col lg={9}>
          {/* Alert - Cart deleted */}
          {deletedCart && (
            <Alert variant='success'>
              <span className='font-weight-bold mr-1'>
                {deletedCart.product.name}
              </span>
              <span>has been removed from the cart.</span>
            </Alert>
          )}

          {/* Normal Alert */}
          {alert.variant && alert.message && (
            <Alert variant={alert.variant}>{alert.message}</Alert>
          )}

          {/* Cart List */}
          <CartList cartItems={cartItems} onEdit={onEdit} onDelete={onDelete} />
        </Col>

        <Col lg={3} className='mt-3 mt-lg-0'>
          {/* Send To */}
          <SendTo />

          {/* Divider */}
          <div className='mb-3'></div>

          {/* Make Order Skeleton */}
          {cartItems === null && <MakeOrderSkeleton />}

          {/* Make Order */}
          {cartItems !== null && cartItems.length > 0 && (
            <MakeOrder
              cartItems={cartItems}
              onSuccess={() =>
                setAlert({
                  variant: "success",
                  message: "Success to create transaction.",
                })
              }
              onFail={() =>
                setAlert({
                  variant: "danger",
                  message:
                    "Failed to create transaction, please try again later.",
                })
              }
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(Index);
