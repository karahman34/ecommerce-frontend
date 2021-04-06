import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import ProductDetailsStyles from "./ProductDetails.module.scss";
import { Button, Card, Image, Row, Col, Form } from "react-bootstrap";
import { formatToRupiah } from "helpers/moneyHelper";
import { connect } from "react-redux";
import { saveCartItem } from "store/modules/cart/actions";
import Alert from "components/Alert/Alert";
import { findByProductId } from "store/modules/cart/reducer";

const mapStateToProps = ({ auth, cart }) => ({
  loggedIn: auth.loggedIn,
  findByProductId: findByProductId(cart),
});

const mapDispatchToProps = (dispatch) => ({
  saveCartItem: (payload) => dispatch(saveCartItem(payload)),
});

const ProductDetails = ({
  product,
  loggedIn,
  saveCartItem,
  findByProductId,
}) => {
  const history = useHistory();
  const [thumbnail, setThumbnail] = useState(null);
  const [prevThumbnail, setPrevThumbnail] = useState(null);
  const [thumbnailChange, setThumbnailChange] = useState(false);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [saveCartLoading, setSaveCartLoading] = useState(false);
  const [alert, setAlert] = useState({
    variant: null,
    message: null,
  });

  const subTotal = useMemo(() => {
    if (product !== null) {
      return product.price * qty;
    }

    return null;
  }, [product, qty]);

  const productInsideCart = useMemo(() => {
    return findByProductId(product.id);
  }, [findByProductId, product]);

  async function saveCartHandler() {
    if (!loggedIn) {
      return history.push("/login");
    }

    setSaveCartLoading(true);

    try {
      await saveCartItem({
        product_id: product.id,
        qty,
        message,
      });

      setAlert({
        variant: "success",
        message: "Success to add product to the cart.",
      });
    } catch (err) {
      setAlert({
        variant: "danger",
        message: "Failed to add cart product, please try again later.",
      });
    } finally {
      setSaveCartLoading(false);
    }
  }

  useEffect(() => {
    if (product !== null) {
      setThumbnail(product.thumbnail);
      setPrevThumbnail(product.thumbnail);
    }
  }, [product]);

  useEffect(() => {
    if (parseInt(qty) < 1) {
      setQty(1);
    }
  }, [qty]);

  return (
    <div className={ProductDetailsStyles.productDetails}>
      {/* Success / Fail Alert */}
      {alert.variant && alert.message && (
        <Alert variant={alert.variant}>{alert.message}</Alert>
      )}

      {/* Notice Alert */}
      {productInsideCart && (
        <Alert variant='warning'>Product is already inside the cart.</Alert>
      )}

      <Row>
        <Col xs={12} md={4}>
          <Card className='shadow-sm border-0'>
            {/* Thumbnail */}
            <Card.Img src={thumbnail}></Card.Img>

            <Card.Body className='py-3 px-3'>
              {/* List Image */}
              <div className={`${ProductDetailsStyles.listImage} mt-2`}>
                {product.images.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    className={`${ProductDetailsStyles.listImageItem} ${
                      image === thumbnail ? ProductDetailsStyles.active : null
                    }`}
                    fluid
                    rounded
                    onClick={() => {
                      setThumbnail(image);
                      setPrevThumbnail(image);
                      setThumbnailChange(true);
                    }}
                    onMouseEnter={() => setThumbnail(image)}
                    onMouseLeave={() => {
                      if (!thumbnailChange) {
                        setThumbnail(prevThumbnail);
                      } else {
                        setThumbnailChange(false);
                      }
                    }}
                  ></Image>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={5}>
          <Card className='border-0 shadow-sm my-3 my-md-0'>
            <Card.Body>
              {/* Name */}
              <Card.Title className='text-capitalize'>
                {product.name}
              </Card.Title>

              {/* Price */}
              <Card.Title className='text-primary font-weight-bold'>
                {formatToRupiah(product.price)}
              </Card.Title>

              {/* Kategori */}
              <div>
                <span>Category: </span>
                <Link to='#' className='font-weight-bold'>
                  {product.category}
                </Link>
              </div>

              {/* Description */}
              <p className='mt-2'>{product.description}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={3}>
          <Card
            className={`${ProductDetailsStyles.cartCard} border-0 shadow-sm`}
          >
            <Card.Body>
              <h6>Set Stock & Note</h6>

              <Form className={ProductDetailsStyles.form}>
                {/* Qty */}
                <div className={ProductDetailsStyles.qty}>
                  <i
                    className={`${ProductDetailsStyles.minus} mdi mdi-minus`}
                    onClick={() => {
                      if (qty > 1) {
                        setQty(qty - 1);
                      }
                    }}
                  ></i>
                  <input
                    readOnly
                    type='number'
                    value={qty}
                    className={ProductDetailsStyles.input}
                  />
                  <i
                    className={`${ProductDetailsStyles.plus} mdi mdi-plus`}
                    onClick={() => setQty(qty + 1)}
                  ></i>
                </div>

                {/* Show Note */}
                {!showNote && (
                  <div
                    className='my-2 text-primary font-weight-bold'
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNote(true)}
                  >
                    <i className='mdi mdi-pencil mr-1'></i>
                    Add Note
                  </div>
                )}

                {/* Note */}
                {showNote && (
                  <div className='my-3'>
                    <Form.Control
                      as='textarea'
                      placeholder='Note'
                      autoFocus
                      onChange={(e) => setMessage(e.target.value)}
                    ></Form.Control>
                  </div>
                )}
              </Form>

              <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <span className='text-muted'>Subtotal</span>
                <h6 className='my-0'>{formatToRupiah(subTotal)}</h6>
              </div>

              <Button
                className='w-100 font-weight-bold mt-1'
                disabled={qty < 1 || saveCartLoading || productInsideCart}
                onClick={saveCartHandler}
              >
                <i className='mdi mdi-plus mr-1'></i>
                <span>Add to Cart</span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
