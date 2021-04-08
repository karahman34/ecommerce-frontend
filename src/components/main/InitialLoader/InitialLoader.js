import React from "react";
import { Spinner } from "react-bootstrap";
import InitialLoaderStyles from "./InitialLoader.module.scss";

const InitialLoader = () => {
  return (
    <div className={InitialLoaderStyles.initialLoader}>
      <Spinner animation='border' variant='primary' />
    </div>
  );
};

export default InitialLoader;
