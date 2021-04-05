import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryApi from "api/categoryApi";
import CategoriesStyles from "./Categories.module.scss";
import { Button, Container, Spinner } from "react-bootstrap";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async (search = null) => {
    setLoading(true);
    const params = {
      limit: 20,
      random: 1,
    };

    if (search !== null) params.search = search;

    try {
      const res = await categoryApi.all(params);
      const { data } = res.data;

      setCategories(data);
    } catch (err) {
      alert("Failed to load categories data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(() => fetchCategories(search), 400);

    return () => clearTimeout(searchTimeout);
  }, [search, fetchCategories]);

  return (
    <div className={CategoriesStyles.categories}>
      <Container className={CategoriesStyles.container}>
        {/* Header Text */}
        <h3 className={`text-center text-white ${CategoriesStyles.header}`}>
          <i className='mdi mdi-tag mr-2'></i>
          Categories
        </h3>

        {/* Search */}
        <div className={CategoriesStyles.searchBox}>
          <input
            type='text'
            placeholder='Search categories..'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className='mdi mdi-magnify'></i>
        </div>

        {/* Loading */}
        {loading && (
          <Spinner
            animation='border'
            className='text-white d-inline-block'
          ></Spinner>
        )}

        {/* Category List */}
        {!loading && (
          <div className={CategoriesStyles.listBlock}>
            {categories.map((category) => (
              <Link to='#' key={category.id}>
                <Button variant='light' className='mx-1 my-1'>
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Categories;
