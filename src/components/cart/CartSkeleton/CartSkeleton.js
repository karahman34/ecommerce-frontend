import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import CartStyles from "../Cart/Cart.module.scss";
import { Media } from "react-bootstrap";

const CartSkeleton = ({ className }) => {
  return (
    <Media className={`${CartStyles.cart} ${className}`}>
      <Skeleton className={`${CartStyles.thumbnail} mr-3 mr-md-4`} />

      <Media.Body>
        <Skeleton width='100%'></Skeleton>

        <Skeleton width={130} className='my-3'></Skeleton>

        <Skeleton width='80%' />
        <Skeleton width='90%' />
        <Skeleton width='95%' />
        <Skeleton width='70%' />
      </Media.Body>
    </Media>
  );
};

CartSkeleton.propTypes = {
  className: PropTypes.string,
};

export default CartSkeleton;
