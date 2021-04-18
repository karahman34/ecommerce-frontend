import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, Media, Image } from "react-bootstrap";
import { formatToRupiah } from "helpers/moneyHelper";
import CartStyles from "./Cart.module.scss";

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className='mdi mdi-chevron-down'
    ref={ref}
    style={{ cursor: "pointer", fontSize: "18px" }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  ></i>
));

function truncateNote(message) {
  const maxCharacters = 300;

  if (!message || message.length <= 300) {
    return message;
  }

  const str = message
    .split("")
    .slice(0, maxCharacters + 1)
    .join("");

  return `${str}...`;
}

const Cart = ({ className, cart, onEdit, onDelete }) => {
  return (
    <Media key={cart.id} className={`${CartStyles.cart} ${className}`}>
      <Image
        src={cart.product.thumbnail}
        className={`${CartStyles.thumbnail} mr-3 mr-md-4`}
        alt={cart.product.thumbnail}
      />

      <Media.Body>
        {/* Name & Menu Dropdown */}
        <div className='d-flex justify-content-between align-items-center'>
          {/* Name */}
          <Link to={`/products/${cart.product.id}`} className='text-dark'>
            <h5 className='text-capitalize my-0'>{cart.product.name}</h5>
          </Link>

          {/* Dropdown */}
          {onEdit && onDelete && (
            <Dropdown alignRight>
              <Dropdown.Toggle
                as={CustomToggle}
                className='mdi mdi-chevron-down'
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onEdit(cart)}>
                  <i className='mdi mdi-pencil mr-2'></i>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onDelete(cart)}>
                  <i className='mdi mdi-trash-can mr-2'></i>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        {/* Price & Qty */}
        <h6 className='mt-2 text-primary font-weight-bold'>
          <span>{formatToRupiah(cart.product.price)}</span>
          <span className='mx-2 text-text-uppercase'>X</span>
          <span>{cart.qty}</span>
        </h6>

        {/* Note */}
        {cart.message && <p>{truncateNote(cart.message)}</p>}
        {!cart.message && <p className='text-muted'>No Notes.</p>}
      </Media.Body>
    </Media>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

export default Cart;
