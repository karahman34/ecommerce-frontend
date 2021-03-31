import { connect } from "react-redux";

import AuthLayout from "components/layouts/auth/AuthLayout";
import DefaultLayout from "components/layouts/default/DefaultLayout";

const mapStateToProps = (state) => ({
  currentLayout: state.global.currentLayout,
});

const Layout = ({ currentLayout, children }) => {
  return (
    <>
      {
        {
          auth: <AuthLayout>{children}</AuthLayout>,
          default: <DefaultLayout>{children}</DefaultLayout>,
        }[currentLayout]
      }
    </>
  );
};

export default connect(mapStateToProps)(Layout);
