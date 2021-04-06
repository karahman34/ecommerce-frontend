import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import productApi from "api/productApi";
import DefaultLayoutStyles from "components/layouts/default/DefaultLayout.module.scss";
import ProductDetails from "components/product/ProductDetails/ProductDetails";
import ProductDetailsSkeleton from "components/product/ProductDetailsSkeleton/ProductsDetailsSkeleton";
import RelatedProducts from "components/product/RelatedProducts/RelatedProducts";
import { setDocumentTitle } from "helpers/routeHelper";

const Index = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [fetchProductLoading, setFetchProductLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await productApi.show(productId);
      const { data } = res.data;

      setProduct(data);
    } catch (err) {
      alert("Failed to load product data");
    } finally {
      setFetchProductLoading(false);
    }
  }, [productId]);

  useEffect(() => fetchProduct(), [fetchProduct]);

  useEffect(() => {
    if (product) {
      setDocumentTitle(product.name);
    }
  }, [product]);

  return (
    <Container className={DefaultLayoutStyles.page}>
      {/* Product Details Skeleton */}
      {fetchProductLoading && <ProductDetailsSkeleton />}

      {/* Product Details */}
      {!fetchProductLoading && (
        <ProductDetails product={product}></ProductDetails>
      )}

      {/* Related Products */}
      {product && (
        <>
          <div className='mt-4'></div>
          <RelatedProducts product={product} />
        </>
      )}
    </Container>
  );
};

export default Index;
