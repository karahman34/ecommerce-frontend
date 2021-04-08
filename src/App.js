import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getMe, setLoggedIn } from "store/modules/auth/actions";
import { fetchPopularCategories } from "store/modules/global/actions";
import routes from "routes";

import Layout from "components/main/Layout";
import RouterGuard from "components/main/RouterGuard";
import InitialLoader from "components/main/InitialLoader/InitialLoader";
import { setDocumentTitle } from "helpers/routeHelper";

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(getMe()),
  fetchPopularCategories: (params) => dispatch(fetchPopularCategories(params)),
  setLoggedIn: (value) => dispatch(setLoggedIn(value)),
});

setDocumentTitle();

function App({ fetchUser, fetchPopularCategories, setLoggedIn }) {
  const [tasks, setTasks] = useState(["fetchUser", "fetchPopularCategories"]);

  // Fedding the store.
  useEffect(() => {
    fetchUser()
      .then(() => setLoggedIn(true))
      .catch(setLoggedIn(false))
      .finally(() =>
        setTasks((prev) => {
          const newTasks = [...prev];
          newTasks.splice(newTasks.indexOf("fetchUser"), 1);

          return newTasks;
        })
      );

    fetchPopularCategories()
      .catch(() => alert("Failed to fetch popular categories."))
      .finally(() =>
        setTasks((prev) => {
          const newTasks = [...prev];
          newTasks.splice(newTasks.indexOf("fetchPopularCategories"), 1);

          return newTasks;
        })
      );
  }, [fetchUser, fetchPopularCategories, setLoggedIn]);

  if (tasks.length) {
    return <InitialLoader />;
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
