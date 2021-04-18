import React from "react";
import Categories from "components/feed/Categories/Categories";
import Jumbotron from "components/feed/Jumbotron/Jumbotron";
import ListProducts from "components/product/List/List";

const Index = () => {
  return (
    <div>
      {/* Jumbotron */}
      <Jumbotron />

      {/* New Products */}
      <ListProducts to='/browse' title='New Products' filter='new' />

      {/* Categories */}
      <Categories />

      {/* Divider */}
      <div className='mt-3'></div>

      {/* Popular Products */}
      <ListProducts
        to={{ pathname: "/browse", search: "?filter=popular" }}
        title='Popular Products'
        filter='popular'
      />

      {/* Divider */}
      <div className='my-3'></div>

      {/* Random Products */}
      <ListProducts
        to={{ pathname: "/browse", search: "?filter=random" }}
        title='Random Products'
        filter='random'
      />

      {/* Divider */}
      <div className='mb-3'></div>
    </div>
  );
};

export default Index;
