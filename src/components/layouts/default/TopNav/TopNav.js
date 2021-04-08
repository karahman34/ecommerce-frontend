import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "store/modules/auth/actions";
import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import TopNavStyles from "./TopNav.module.scss";
import SearchBox from "../SearchBox/SearchBox";
import { fetchUserCarts } from "store/modules/cart/actions";

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  currentUser: state.auth.user,
  carts: state.cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logout()),
  fetchUserCarts: () => dispatch(fetchUserCarts()),
});

const TopNav = ({
  carts,
  fetchUserCarts,
  loggedIn,
  currentUser,
  logoutUser,
}) => {
  const appTitle = process.env.REACT_APP_TITLE;

  function onSearch(search) {
    alert(search);
  }

  async function logoutHandler() {
    try {
      await logoutUser();
    } catch (err) {
      alert("Failed to logout user.");
    }
  }

  // Mounted
  useEffect(() => {
    if (loggedIn) {
      fetchUserCarts().catch(() => alert("Failed to fetch user carts."));
    }
  }, [fetchUserCarts, loggedIn]);

  const firstName = useMemo(() => {
    return !currentUser ? null : currentUser.name.split(" ")[0];
  }, [currentUser]);

  const cartsLength = useMemo(
    () => (Array.isArray(carts) ? carts.length : null),
    [carts]
  );

  return (
    <Navbar id='main-navbar' className={TopNavStyles.topnav} expand='lg'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          className={["text-primary", TopNavStyles.brand]}
        >
          {appTitle}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='main-navbar-nav' />

        <Navbar.Collapse id='main-navbar-nav'>
          {/* Search */}
          <SearchBox onSearch={onSearch} />

          {/* Right Navs */}
          <Nav className='ml-auto'>
            {/* Guest Menus */}
            {!loggedIn && (
              <>
                <Nav.Link as={Link} to='/login'>
                  <Button variant='outline-primary'>Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  <Button variant='primary'>Register</Button>
                </Nav.Link>
              </>
            )}

            {/* Auth Menus */}
            {loggedIn && (
              <>
                {/* Shopping Cart */}
                <Nav.Link
                  as={Link}
                  to='/cart'
                  className={[TopNavStyles.cart, TopNavStyles.link]}
                >
                  <i className='mdi mdi-cart'></i>
                  <span className='d-lg-none mx-2'>Shopping Cart</span>
                  {cartsLength !== null && cartsLength > 0 && (
                    <Badge
                      pill
                      variant='primary'
                      className={TopNavStyles.badge}
                    >
                      {cartsLength}
                    </Badge>
                  )}
                </Nav.Link>

                {/* User Dropdown */}
                <NavDropdown
                  id='user-nav-dropdown'
                  alignRight
                  title={
                    <>
                      <i className='mdi mdi-account'></i>
                      <span className='ml-2 mr-1'>{firstName}</span>
                    </>
                  }
                >
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>

                  {/* Divider */}
                  <NavDropdown.Divider />

                  {/* Logout */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
