import PropTypes from "prop-types";

const Header = ({ appTitle }) => {
  return (
    <h2 id='header' className='mb-3 text-center'>
      <i className='mdi mdi-cart'></i>
      <span className='ml-2'>{appTitle}</span>
    </h2>
  );
};

Header.propTypes = {
  appTitle: PropTypes.string.isRequired,
};

export default Header;
