import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, Card, ListGroup } from "react-bootstrap";

const Sidebar = () => {
  const location = useLocation();

  const [menus] = useState([
    {
      path: "/profile",
      icon: "account",
      text: "Profile",
    },
    {
      path: "/profile/password",
      icon: "lock",
      text: "Password",
    },
    {
      path: "/profile/transactions",
      icon: "truck",
      text: "Transactions",
    },
  ]);
  const [activeKey, setActiveKey] = useState("-1");

  useEffect(() => {
    if (document.body.scrollWidth >= 992) {
      setActiveKey("0");
    }
  }, []);

  return (
    <Accordion activeKey={activeKey}>
      <Card className={`border-0 shadow-sm`}>
        <Card.Body className='px-0 py-0'>
          <Card.Title className='px-3 py-3 mb-0 d-flex justify-content-between align-content-center'>
            Menus
            <i
              className={`mdi mdi-chevron-${
                activeKey === "0" ? "down" : "up"
              } d-block d-md-none`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveKey(activeKey === "-1" ? "0" : "-1");
              }}
            ></i>
          </Card.Title>

          <Accordion.Collapse eventKey='0'>
            <ListGroup variant='flush'>
              {menus.map((menu) => (
                <ListGroup.Item
                  key={menu.path}
                  as={Link}
                  to={menu.path}
                  active={location.pathname === menu.path}
                  className='font-weight-medium'
                >
                  <i className={`mdi mdi-${menu.icon} mr-2`}></i>
                  {menu.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
  );
};

export default Sidebar;
