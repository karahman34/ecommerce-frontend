import React from "react";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import ProductFeedStyles from "../ProductFeed/ProductFeed.module.scss";

const ProductFeedSkeleton = () => {
  return (
    <div className={ProductFeedStyles.productFeed}>
      <Card className={`shadow-sm ${ProductFeedStyles.card}`}>
        <Skeleton height={200}></Skeleton>

        <Card.Body>
          <Skeleton height={14}></Skeleton>
          <Skeleton height={14} width='65%'></Skeleton>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductFeedSkeleton;
