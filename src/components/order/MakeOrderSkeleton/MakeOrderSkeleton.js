import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card } from "react-bootstrap";

const MakeOrderSkeleton = () => {
  return (
    <Card className='border-0 shadow-sm'>
      <Card.Body>
        <div className='d-flex justify-content-between align-items-center'>
          <Skeleton width={70}></Skeleton>
          <Skeleton width={60}></Skeleton>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <Skeleton width={100}></Skeleton>
          <Skeleton width={60}></Skeleton>
        </div>

        <Skeleton height={38}></Skeleton>
      </Card.Body>
    </Card>
  );
};

export default MakeOrderSkeleton;
