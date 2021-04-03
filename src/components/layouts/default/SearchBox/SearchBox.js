import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBoxStyles from "./SearchBox.module.scss";

const SearchBox = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    if (onSearch) {
      onSearch(search);
    }
  }

  return (
    <form className={SearchBoxStyles.searchBox} onSubmit={submitHandler}>
      <input
        type='text'
        className={SearchBoxStyles.input}
        value={search}
        placeholder='Enter a keyword..'
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className={SearchBoxStyles.magnify}>
        <i className='mdi mdi-magnify'></i>
      </span>

      <input type='submit' className='d-none' />
    </form>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBox;
