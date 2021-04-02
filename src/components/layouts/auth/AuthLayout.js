import { useState } from "react";
import { Container } from "react-bootstrap";
import AuthLayoutStyles from "./AuthLayout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const AuthLayout = ({ children }) => {
  const [appTitle] = useState(process.env.REACT_APP_TITLE);

  return (
    <div className={AuthLayoutStyles["auth-layout"]}>
      <Container className={AuthLayoutStyles.container}>
        <Header appTitle={appTitle} />

        {children}

        <Footer appTitle={appTitle} />
      </Container>
    </div>
  );
};

export default AuthLayout;
