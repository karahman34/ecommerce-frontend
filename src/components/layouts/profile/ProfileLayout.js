import React from "react";
import ProfileLayoutStyles from "./ProfileLayout.module.scss";
import TopNav from "components/layouts/default/TopNav/TopNav";
import Sidebar from "./Sidebar/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

const ProfileLayout = ({ children }) => {
  return (
    <div className={ProfileLayoutStyles.profileLayout}>
      <div className={`${ProfileLayoutStyles.navBlock} position-sticky top-0`}>
        <TopNav />
      </div>

      <Container className='mt-4'>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>

          <Col md={9} className='mt-3 mt-md-0'>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileLayout;
