import React, { useEffect, useState } from "react";
import productApi from "api/productApi";
import { Container, Row, Col } from "react-bootstrap";
import FeedTitle from "components/feed/FeedTitle/FeedTitle";
import ProductFeed from "components/product/ProductFeed/ProductFeed";
import ProductFeedSkeleton from "components/product/ProductFeedSkeleton/ProductFeedSkeleton";

const PopularProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  async function fetchPopularProducts() {
    try {
      const res = await productApi.popular({
        limit: 4,
      });
      const { data } = res.data;

      setProducts(data);
    } catch (err) {
      alert("Failed to load popular products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => fetchPopularProducts(), []);

  return (
    <Container>
      <FeedTitle to='#' title='Popular Products' />

      <Row>
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <Col key={i} xs={6} md={3}>
              <ProductFeedSkeleton></ProductFeedSkeleton>
            </Col>
          ))}

        {!loading &&
          products.map((product) => (
            <Col key={product.id} xs={6} md={3}>
              <ProductFeed product={product}></ProductFeed>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PopularProducts;
