import React from 'react';
import auth from './../auth/auth-helper';
import { withRouter } from 'react-router-dom';
import cart from './../cart/cart-helper';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};
const Menu = withRouter(({ history }) => (
  <Navbar bg='dark' expand='lg'>
    <Container>
      <Navbar.Brand style={isActive(history, '/')} href='/'>
        Delivery App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link style={isActive(history, '/cart')} href='/cart'>
            <Button variant='danger'>
              Cart Orders <Badge variant='light'> {cart.itemTotal()}</Badge>
              <span className='sr-only'>Cart Items</span>
            </Button>
          </Nav.Link>
        </Nav>
        <Nav className='ml-auto'>
          {!auth.isAuthenticated() && (
            <>
              <Nav.Link style={isActive(history, '/signup')} href='/signup'>
                Sign up
              </Nav.Link>
              <Nav.Link style={isActive(history, '/signin')} href='/signin'>
                Sign In
              </Nav.Link>
            </>
          )}

          {auth.isAuthenticated() && (
            <>
              {auth.isAuthenticated().user.seller && (
                <>
                  <Nav.Link
                    style={isPartActive(history, '/seller/')}
                    href='/seller/shops'
                  >
                    My Business
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                style={isActive(
                  history,
                  '/user/' + auth.isAuthenticated().user._id
                )}
                href={'/user/' + auth.isAuthenticated().user._id}
              >
                My Profile
              </Nav.Link>
              <Button
                onClick={() => {
                  auth.clearJWT(() => history.push('/'));
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
));

export default Menu;
