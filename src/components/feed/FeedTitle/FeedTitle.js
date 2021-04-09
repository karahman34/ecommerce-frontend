import React from "react";
import PropTypes from "prop-types";
import FeedTitleStyles from "./FeedTitle.module.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const FeedTitle = ({ title, to }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between mb-1 ${FeedTitleStyles.feedTitle}`}
    >
      <h3 className='text-primary'>{title}</h3>

      {to && (
        <Link to={to}>
          <Button>See More</Button>
        </Link>
      )}
    </div>
  );
};

FeedTitle.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string.isRequired,
};

export default FeedTitle;
