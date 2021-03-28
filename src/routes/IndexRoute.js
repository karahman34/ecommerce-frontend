import { Route } from 'react-router-dom'
import IndexPage from 'pages'
import LoginPage from 'pages/login'

const IndexRoute = () => {
  return (
    <>
      <Route exact path="/">
        <IndexPage></IndexPage>
      </Route>

      <Route path="/login">
        <LoginPage></LoginPage>
      </Route>
    </>
  );
}

export default IndexRoute;
