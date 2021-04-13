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
  state,
  meta,
}) => {
  const [tasks, setTasks] = useState(["applyMiddleware"]);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const removeTask = (taskName) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(newTasks.indexOf(taskName), 1);

      return newTasks;
    });
  };

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

      removeTask("applyMiddleware");
    };

    // Run middleware.
    middleware({
      ...context,
      next,
    });
  }, []);

  // Apply middleware.
  useEffect(() => {
    const { middleware } = meta;

    if (middleware) {
      const context = {
        location,
        state,
        params,
        history,
      };

      applyMiddleware(context, middleware);
    } else {
      removeTask("applyMiddleware");
    }
  }, [location, state, params, history, meta, applyMiddleware]);

  // Set route layout.
  useEffect(() => {
    const { layout } = meta;
    const defaultLayout = "default";

    if (currentLayout !== layout) {
      changeCurrentLayout(layout || defaultLayout);
    }
  }, [meta, currentLayout, changeCurrentLayout]);

  // Set route title.
  useEffect(() => {
    const { title } = meta;

    if (!tasks.length) {
      setDocumentTitle(title);

      const currentPathName = history.location.pathname;

      return () => {
        if (currentPathName !== history.location.pathname) {
          window.scrollTo({ top: 0 });
        }
      };
    }
  }, [tasks, meta, history]);

  return !tasks.length ? children : null;
};

RouterGuard.defaultProps = {
  meta: {},
};

RouterGuard.propTypes = {
  meta: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterGuard);
