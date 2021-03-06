import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBoxStyles from "./SearchBox.module.scss";

const SearchBox = ({ onSearch, placeholder }) => {
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
        placeholder={placeholder || "Enter a keyword.."}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className={SearchBoxStyles.magnify}>
        <i className='mdi mdi-magnify'></i>
      </button>
    </form>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBox;
