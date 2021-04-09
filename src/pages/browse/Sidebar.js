import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import { Accordion, Button, Badge, Card, Spinner } from "react-bootstrap";
import categoryApi from "api/categoryApi";
import SidebarStyles from "./Sidebar.module.scss";
import SearchBox from "components/layouts/default/SearchBox/SearchBox";

const Sidebar = ({ onSelect }) => {
  const history = useHistory();
  const queryParams = useMemo(() => qs.parse(history.location.search), [
    history.location.search,
  ]);

  const isActiveCategory = useCallback(
    (category) => {
      return queryParams.category && queryParams.category === category.name;
    },
    [queryParams]
  );

  const [activeKey, setActiveKey] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [params, setParams] = useState({
    page: 1,
  });

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const res = await categoryApi.all(params);
      const { data, links } = res.data;

      setCategories((prev) => [...prev, ...data]);

      if (!links.next) {
        setIsLastPage(true);
      }
    } catch (err) {
      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (document.body.scrollWidth >= 992) {
      setActiveKey("0");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (search !== null) {
      setParams({
        search,
        page: 1,
      });

      setCategories([]);
      setIsLastPage(false);
    }
  }, [search]);

  return (
    <Accordion activeKey={activeKey} className={SidebarStyles.sidebar}>
      <Card className='border-0 shadow-sm'>
        <Card.Body className='d-flex flex-column px-0'>
          <Card.Title className='d-flex justify-content-between px-3'>
            <div>
              <i className='mdi mdi-tag mr-2'></i>
              Categories
            </div>

            <i
              className={`mdi mdi-chevron-${
                activeKey === "0" ? "down" : "up"
              } d-block d-lg-none`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveKey(activeKey === "0" ? "-1" : "0")}
            ></i>
          </Card.Title>

          {/* Search box */}
          <div className='px-3'>
            <SearchBox
              placeholder='Search categories'
              onSearch={(query) => setSearch(query)}
            />
          </div>

          <Accordion.Collapse
            eventKey='0'
            className='flex-grow-1 overflow-auto'
          >
            <>
              {/* List Category */}
              {!loading && (
                <div className={`${SidebarStyles.listCategory} mt-2`}>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`${
                        SidebarStyles.listCategoryItem
                      } px-3 d-flex justify-content-between align-items-center ${
                        isActiveCategory(category)
                          ? "bg-primary text-white"
                          : null
                      }`}
                      onClick={() =>
                        onSelect(
                          isActiveCategory(category) ? null : category.name
                        )
                      }
                    >
                      <span>{category.name}</span>
                      <Badge variant='secondary'>
                        {category.total_products}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Not Found Response */}
              {!loading && !categories.length && (
                <p className='mb-0 text-center text-muted'>
                  Categories not found.
                </p>
              )}

              {/* Spinner */}
              {loading && (
                <div className='mt-3 text-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              )}

              {/* See more btn */}
              {!isLastPage && categories.length > 0 && (
                <div className='d-flex justify-content-center mt-2'>
                  <Button
                    disabled={loading}
                    onClick={() =>
                      setParams((prevParams) => ({
                        ...prevParams,
                        page: prevParams.page + 1,
                      }))
                    }
                  >
                    <i className='mdi mdi-eye mr-2'></i>
                    See More
                  </Button>
                </div>
              )}
            </>
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
  );
};

Sidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Sidebar;
