import React from "react";
import Categories from "components/feed/Categories/Categories";
import Jumbotron from "components/feed/Jumbotron/Jumbotron";
import NewProducts from "components/product/NewProducts/NewProducts";
import PopularProducts from "components/product/PopularProducts/PopularProducts";
import RandomProducts from "components/product/RandomProducts/RandomProducts";

const Index = () => {
  return (
    <div>
      {/* Jumbotron */}
      <Jumbotron />

      {/* New Products */}
      <NewProducts />

      {/* Categories */}
      <Categories />

      {/* Divider */}
      <div className='mt-3'></div>

      {/* Popular Products */}
      <PopularProducts />

      {/* Divider */}
      <div className='my-3'></div>

      {/* Random Products */}
      <RandomProducts />

      {/* Divider */}
      <div className='mb-3'></div>
    </div>
  );
};

export default Index;
