import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Index = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Index.defaultProps = {
  variant: "primary",
};

Index.propTypes = {
  variant: PropTypes.string,
};

export default Index;
