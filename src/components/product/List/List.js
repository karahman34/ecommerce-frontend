import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import productApi from "api/productApi";
import { Container, Row, Col } from "react-bootstrap";
import FeedTitle from "components/feed/FeedTitle/FeedTitle";
import ProductFeed from "components/product/ProductFeed/ProductFeed";
import ProductFeedSkeleton from "components/product/ProductFeedSkeleton/ProductFeedSkeleton";

const List = ({ title, to, filter }) => {
  const [products, setProducts] = useState(null);
  const [fetchProductsLoading, setFetchProductsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await productApi.all({
        limit: 8,
        filter,
      });
      const { data } = res.data;

      setProducts(data);
    } catch (err) {
      alert("Failed to load new products");
    } finally {
      setFetchProductsLoading(false);
    }
  }, [filter]);

  // Mounted.
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const SkeletonTotal = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(i);
    }

    return arr;
  }, []);

  return (
    <Container className='mt-3 mb-1'>
      {/* Title */}
      <FeedTitle to={to} title={title} />

      <Row>
        {/* Skeleton */}
        {fetchProductsLoading &&
          SkeletonTotal.map((i) => (
            <Col key={i} xs={6} lg={3} className='mb-3'>
              <ProductFeedSkeleton />
            </Col>
          ))}

        {/* Product List */}
        {!fetchProductsLoading &&
          products.map((product) => (
            <Col key={product.id} xs={6} lg={3} className='mb-3'>
              <ProductFeed product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

List.defaultProps = {
  filter: null,
};

List.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string.isRequired,
  filter: PropTypes.string,
};

export default List;
