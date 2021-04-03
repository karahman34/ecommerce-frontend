import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLayout } from "store/modules/global/actions";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import authMiddleware from "middlewares/authMiddleware";
import guestMiddleware from "middlewares/guestMiddleware";
import { setDocumentTitle } from "helpers/routeHelper";

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
  title,
  state,
}) => {
  const [tasks, setTasks] = useState(["applyMiddleware"]);
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

      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(newTasks.indexOf("applyMiddleware"), 1);

        return newTasks;
      });
    };

    // Run middleware.
    middleware({
      ...context,
      next,
    });
  }, []);

  // Apply middleware.
  useEffect(() => {
    if (middleware) {
      const context = {
        location,
        state,
        params,
        history,
      };

      applyMiddleware(context, middleware);
    } else {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks.splice(newTasks.indexOf("applyMiddleware"), 1);

        return newTasks;
      });
    }
  }, [location, state, params, history, middleware, applyMiddleware]);

  // Set route layout.
  useEffect(() => {
    if (currentLayout !== layout) {
      changeCurrentLayout(layout);
    }
  }, [layout, currentLayout, changeCurrentLayout]);

  // Set route title.
  useEffect(() => {
    if (!tasks.length) {
      setDocumentTitle(title);
    }
  }, [tasks, title]);

  return !tasks.length ? children : null;
};

RouterGuard.propTypes = {
  title: PropTypes.string,
  layout: PropTypes.string.isRequired,
  middleware: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
