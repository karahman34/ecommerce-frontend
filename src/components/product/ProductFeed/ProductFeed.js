import React from "react";
import PropTypes from "prop-types";
import ProductFeedStyles from "./ProductFeed.module.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { formatToRupiah } from "helpers/moneyHelper";

const ProductFeed = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className={ProductFeedStyles.productFeed}
    >
      <Card className={`shadow-sm ${ProductFeedStyles.card}`}>
        <Card.Img
          variant='top'
          src={product.thumbnail}
          alt={product.thumbnail}
        ></Card.Img>

        <Card.Body>
          <p className='mb-2 font-weight-bold'>{product.name}</p>
          <p className='mb-0 text-dark'>{formatToRupiah(product.price)}</p>
        </Card.Body>
      </Card>
    </Link>
  );
};

ProductFeed.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductFeed;
