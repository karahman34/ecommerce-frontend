import "bootstrap/dist/css/bootstrap.min.css";

import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getMe, setLoggedIn } from "store/modules/auth/actions";
import routes from "routes";

import Layout from "components/main/Layout";
import RouterGuard from "components/main/RouterGuard";
import { setDocumentTitle } from "helpers/routeHelper";

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(getMe()),
  setLoggedIn: (value) => dispatch(setLoggedIn(value)),
});

setDocumentTitle();

function App({ fetchUser, setLoggedIn }) {
  const [appReady, setAppReady] = useState(false);

  const checkAuthUser = useCallback(async () => {
    try {
      await fetchUser();

      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
    } finally {
      setAppReady(true);
    }
  }, [fetchUser, setLoggedIn]);

  // Fedding the store.
  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  if (!appReady) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <div className='App'>
        <Layout>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} exact={route.exact}>
                <RouterGuard
                  title={route.title}
                  layout={route.layout || "default"}
                  middleware={route.middleware}
                >
                  <route.component></route.component>
                </RouterGuard>
              </Route>
            ))}
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default connect(null, mapDispatchToProps)(App);
