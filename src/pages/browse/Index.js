import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import qs from "query-string";
import Sidebar from "./Sidebar";
import DefaultLayoutStyles from "components/layouts/default/DefaultLayout.module.scss";
import productApi from "api/productApi";
import ProductFeed from "components/product/ProductFeed/ProductFeed";
import ProductFeedSkeleton from "components/product/ProductFeedSkeleton/ProductFeedSkeleton";

const Index = () => {
  const history = useHistory();
  const queryParams = qs.parse(history.location.search);

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [params, setParams] = useState({
    page: parseInt(queryParams.page) || null,
    category: queryParams.category || null,
    q: queryParams.q || null,
    filter: queryParams.filter || "new",
  });

  const productsLength = useMemo(() => Object.keys(products).length, [
    products,
  ]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const api = {
      new: productApi.all,
      popular: productApi.popular,
      random: productApi.random,
    };

    try {
      const res = await api[params.filter]({
        ...params,
        filter: null,
        limit: 9,
      });
      const { data, links } = res.data;

      setProducts((prevProducts) => {
        return {
          ...prevProducts,
          ...data.reduce((obj, product) => {
            obj[product.id] = product;

            return obj;
          }, {}),
        };
      });

      if (!links.next) {
        setIsLastPage(true);
      }
    } catch (err) {
      alert("Failed to fetch products data.");
    } finally {
      setLoading(false);
    }
  }, [params]);

  function changeFilter(key, value) {
    setParams((prevParams) => ({
      ...prevParams,
      [key]: value,
      page: null,
    }));

    setProducts({});
    setIsLastPage(false);
  }

  // Fetch products on mounted.
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Watch Params.
  useEffect(() => {
    const newQueryString = {};
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        const param = params[key];
        if (param !== null) {
          newQueryString[key] = param;
        }
      }
    }

    history.push({
      pathname: window.location.pathname,
      search: qs.stringify(newQueryString),
    });
  }, [params, history]);

  return (
    <Container className={DefaultLayoutStyles.page}>
      <Row>
        <Col lg={3} className='mb-3 mb-lg-0'>
          <Sidebar
            onSelect={(category) => changeFilter("category", category)}
          />
        </Col>

        <Col lg={9}>
          {/* Filter & Search */}
          <div className='d-flex justify-content-between align-items-center mb-3'>
            {/* Filter */}
            <div>
              <FormControl
                as='select'
                value={params.filter}
                onChange={(e) => changeFilter("filter", e.target.value)}
              >
                <option value='new'>New</option>
                <option value='popular'>Popular</option>
                <option value='random'>Random</option>
              </FormControl>
            </div>

            {/* Search */}
            <div>
              <InputGroup>
                <FormControl
                  value={params.q || ""}
                  placeholder='Search by name'
                  onChange={(e) => changeFilter("q", e.target.value)}
                ></FormControl>

                <InputGroup.Append>
                  <InputGroup.Text>
                    <i className='mdi mdi-magnify'></i>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </div>

          {/* Skeletons */}
          {loading && !productsLength && (
            <Row>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Col key={i} xs={6} lg={4}>
                  <ProductFeedSkeleton />
                </Col>
              ))}
            </Row>
          )}

          {/* No Products Response */}
          {!loading && !productsLength && (
            <h5 className='mt-3 text-muted text-center'>No Products found.</h5>
          )}

          {/* Product List */}
          {!loading && productsLength > 0 && (
            <Row>
              {Object.keys(products).map((productId) => (
                <Col key={productId} xs={6} lg={4} className='mb-3'>
                  <ProductFeed product={products[productId]} />
                </Col>
              ))}
            </Row>
          )}

          {/* Show More Btn */}
          {!isLastPage && productsLength > 0 && (
            <div className='d-flex justify-content-center'>
              <Button
                disabled={loading}
                onClick={() =>
                  setParams((prevParams) => ({
                    ...prevParams,
                    page: prevParams.page ? prevParams.page + 1 : 2,
                  }))
                }
              >
                <i className='mdi mdi-eye mr-2'></i>
                Show More
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
