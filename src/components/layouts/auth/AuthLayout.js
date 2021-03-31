import "./AuthLayout.scss";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const AuthLayout = ({ children }) => {
  const [appTitle] = useState(process.env.REACT_APP_TITLE);

  return (
    <div id='auth-layout'>
      <Container>
        <Header appTitle={appTitle} />

        {children}

        <Footer appTitle={appTitle} />
      </Container>
    </div>
  );
};

export default AuthLayout;
