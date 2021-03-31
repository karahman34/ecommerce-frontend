import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLayout } from "store/modules/global/actions";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import authMiddleware from "middlewares/authMiddleware";
import guestMiddleware from "middlewares/guestMiddleware";

const mapStateToProps = (state) => ({
  currentLayout: state.global.currentLayout,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentLayout: (name) => dispatch(setLayout(name)),
});

const availableMiddleware = {
  auth: authMiddleware,
  guest: guestMiddleware,
};

const RouterGuard = ({
  children,
  currentLayout,
  changeCurrentLayout,
  layout,
  middleware,
  state,
}) => {
  const [renderRoute, setRenderRoute] = useState(false);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const applyMiddleware = useCallback((context, ...listMiddleware) => {
    const name = listMiddleware.shift();
    const middleware = availableMiddleware[name];

    if (!middleware) {
      throw new Error(`${name} middleware is not found.`);
    }

    const next = () => {
      if (listMiddleware.length) {
        return applyMiddleware(context, listMiddleware);
      }

      setRenderRoute(true);
    };

    // Run middleware.
    middleware({
      ...context,
      next,
    });
  }, []);

  // Apply middleware.
  useEffect(() => {
    const context = {
      location,
      state,
      params,
      history,
    };

    applyMiddleware(context, middleware);
  }, [location, state, params, history, middleware, applyMiddleware]);

  // Set route layout.
  useEffect(() => {
    if (currentLayout !== layout) {
      changeCurrentLayout(layout);
    }
  }, [layout, currentLayout, changeCurrentLayout]);

  return renderRoute ? children : null;
};

RouterGuard.propTypes = {
  layout: PropTypes.string.isRequired,
  middleware: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
