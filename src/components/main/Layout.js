import { connect } from "react-redux";

import AuthLayout from "components/layouts/auth/AuthLayout";
import DefaultLayout from "components/layouts/default/DefaultLayout";
import ProfileLayout from "components/layouts/profile/ProfileLayout";

const mapStateToProps = (state) => ({
  currentLayout: state.global.currentLayout,
});

const Layout = ({ currentLayout, children }) => {
  return (
    <>
      {
        {
          none: children,
          auth: <AuthLayout>{children}</AuthLayout>,
          default: <DefaultLayout>{children}</DefaultLayout>,
          profile: <ProfileLayout>{children}</ProfileLayout>,
        }[currentLayout]
      }
    </>
  );
};

export default connect(mapStateToProps)(Layout);
