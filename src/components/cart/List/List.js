import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import ListStyles from "./List.module.scss";
import Cart from "components/cart/Cart/Cart";
import CartSkeleton from "components/cart/CartSkeleton/CartSkeleton";

const List = ({ cartItems, onEdit, onDelete }) => {
  const loading = useMemo(() => (!Array.isArray(cartItems) ? true : false), [
    cartItems,
  ]);

  return (
    <Card className={`${ListStyles.cartList} border-0 shadow-sm`}>
      <Card.Body>
        <Card.Title className='mb-3 header-title--dash'>
          <i className='mdi mdi-cart mr-2'></i>
          <span>Cart List</span>
        </Card.Title>

        {loading &&
          [1, 2, 3, 4].map((i) => (
            <CartSkeleton key={i} className={ListStyles.cartItem} />
          ))}

        {!loading && !cartItems.length && (
          <h5 className='text-muted'>You have no items.</h5>
        )}

        {!loading &&
          cartItems.map((cartItem) => (
            <Cart
              key={cartItem.id}
              cart={cartItem}
              className={ListStyles.cartItem}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </Card.Body>
    </Card>
  );
};

List.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default List;
