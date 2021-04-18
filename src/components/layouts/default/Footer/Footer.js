import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterStyles from "./Footer.module.scss";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";

const Footer = () => {
  const [appName] = useState(process.env.REACT_APP_TITLE);
  const [contacts] = useState([
    {
      icon: "mdi-phone",
      value: "0852-1234-5678",
    },
    {
      icon: "mdi-email",
      value: "rere@example.com",
    },
    {
      icon: "mdi-home",
      value: "Jl.kidulrowo No.45, Bandung, Jawa Barat 40234, Indonesia",
    },
  ]);

  const [socials] = useState([
    {
      icon: "mdi-facebook",
      link: "#",
    },
    {
      icon: "mdi-twitter",
      link: "#",
    },
    {
      icon: "mdi-instagram",
      link: "#",
    },
  ]);

  return (
    <Jumbotron className={`${FooterStyles.footer} bg-dark mb-0`}>
      <Container>
        <Row className='text-white d-flex justify-content-center'>
          <Col xs='12' md='4'>
            <h3 className={`${FooterStyles.title} ${FooterStyles.appName}`}>
              {appName}
            </h3>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </Col>

          <Col xs='12' md='4'>
            <h4 className={FooterStyles.title}>CONTACTS</h4>

            <ul className={FooterStyles.list}>
              {contacts.map((contact) => (
                <li key={contact.value} className={FooterStyles.listItem}>
                  <i className={`mdi ${contact.icon}`}></i>
                  <span>{contact.value}</span>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs='12' md='4'>
            <h4 className={FooterStyles.title}>Socials</h4>

            <div className='d-flex'>
              {socials.map((social) => (
                <Link
                  to={social.link}
                  key={social.icon}
                  className={FooterStyles.social}
                >
                  <i className={`mdi ${social.icon}`}></i>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Footer;
