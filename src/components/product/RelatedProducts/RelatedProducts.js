import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import RelatedProductsStyles from "./RelatedProducts.module.scss";
import productApi from "api/productApi";
import FeedTitle from "components/feed/FeedTitle/FeedTitle";
import ProductFeed from "components/product/ProductFeed/ProductFeed";
import ProductFeedSkeleton from "components/product/ProductFeedSkeleton/ProductFeedSkeleton";

const RelatedProducts = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const res = await productApi.related(product.id, {
        limit: 8,
        page,
      });
      const { data, links } = res.data;

      setProducts(data);

      if (!links.next) {
        setNextPage(false);
      }
    } catch (err) {
      alert("Failed to load related products");
    } finally {
      setLoading(false);
    }
  }, [product, page]);

  useEffect(() => fetchRelatedProducts(), [fetchRelatedProducts]);

  return (
    <div className={RelatedProductsStyles.relatedProducts}>
      <FeedTitle title='Related Products'></FeedTitle>

      <Row>
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <Col key={i} xs={6} md={3}>
              <ProductFeedSkeleton />
            </Col>
          ))}

        {!loading &&
          products.map((product) => (
            <Col key={product.id} xs={6} md={3} className='pb-3'>
              <ProductFeed product={product} />
            </Col>
          ))}
      </Row>

      {products && nextPage && (
        <Button
          className={`${RelatedProductsStyles.showMoreButton} d-block mt-2 mx-auto`}
          disabled={loading}
          onClick={() => setPage(page + 1)}
        >
          <i className='mdi mdi-eye mr-2'></i>
          Show More
        </Button>
      )}
    </div>
  );
};

RelatedProducts.propTypes = {
  product: PropTypes.object.isRequired,
};

export default RelatedProducts;
