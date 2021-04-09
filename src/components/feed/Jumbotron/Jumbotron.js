import React from "react";
import JumbotronStyles from "./Jumbotron.module.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Jumbotron = () => {
  return (
    <div className={JumbotronStyles.jumbotron}>
      <div className='px-3'>
        <h1>Find your goods here</h1>
        <h5>We provide a high level products with quality</h5>
        <h5> and friendly price.</h5>

        <Link to='/browse'>
          <Button className={JumbotronStyles.btn}>
            <i className='mdi mdi-cart mr-2'></i>
            <span>Shop Now</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Jumbotron;
