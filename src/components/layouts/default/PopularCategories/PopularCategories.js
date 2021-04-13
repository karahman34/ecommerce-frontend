import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PopularCategoriesStyles from "./PopularCategories.module.scss";

const mapStateToProps = (state) => ({
  categories: state.global.popularCategories,
});

const PopularCategories = ({ categories }) => {
  return (
    <Navbar
      className={[
        "d-none d-lg-block",
        PopularCategoriesStyles.popularCategories,
      ]}
    >
      <Container className={PopularCategoriesStyles.container}>
        <Navbar.Collapse id='popular-categories-navbar-nav'>
          <Nav>
            {/* All */}
            <Nav.Link href='#' className={PopularCategoriesStyles.link}>
              <Button
                className={PopularCategoriesStyles.category}
                size='sm'
                variant='primary'
              >
                All
              </Button>
            </Nav.Link>

            {/* List Categories */}
            {categories.map((category) => (
              <Nav.Link
                key={category.id}
                as={Link}
                to={{
                  pathname: "/browse",
                  search: `?category=${category.name}`,
                }}
                className={PopularCategoriesStyles.link}
              >
                <Button
                  className={PopularCategoriesStyles.category}
                  size='sm'
                  variant='outline-primary'
                >
                  {category.name}
                </Button>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default connect(mapStateToProps)(PopularCategories);
