import PropTypes from "prop-types";

const Footer = ({ appTitle }) => {
  return (
    <div id='footer'>
      <p className='text-muted mt-4'>Copyright &copy; 2021 - {appTitle}</p>
    </div>
  );
};

Footer.propTypes = {
  appTitle: PropTypes.string.isRequired,
};

export default Footer;
