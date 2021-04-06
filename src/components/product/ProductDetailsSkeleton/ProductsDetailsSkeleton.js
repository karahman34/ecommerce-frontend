import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card, Row, Col } from "react-bootstrap";

const ProductsDetailsSkeleton = () => {
  return (
    <Row>
      <Col xs={12} md={4}>
        <Card className='shadow-sm border-0'>
          <Skeleton height={280}></Skeleton>

          <Card.Body className='px-3 py-3'>
            <Row className={`mt-2`}>
              {[1, 2, 3, 4].map((i) => (
                <Col key={i} xs={3} className='px-2'>
                  <Skeleton key={i} height={50}></Skeleton>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={5}>
        <Card className='border-0 shadow-sm'>
          <Card.Body>
            <Skeleton></Skeleton>

            <Skeleton className='my-3' width='45%'></Skeleton>
            <Skeleton className='d-block mb-3' width='38%'></Skeleton>

            <Skeleton></Skeleton>
            <Skeleton width='90%'></Skeleton>
            <Skeleton width='80%'></Skeleton>
            <Skeleton width='100%'></Skeleton>
            <Skeleton width='60%'></Skeleton>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={3}>
        <Card className='border-0 shadow-sm'>
          <Card.Body>
            <Skeleton width='70%'></Skeleton>

            <Skeleton height={30} className='my-3'></Skeleton>
            <Skeleton className='d-block mb-3' width='45%'></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton height={39}></Skeleton>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductsDetailsSkeleton;
