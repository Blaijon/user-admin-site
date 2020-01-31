import React from "react";

import SignOutButton from "../SignOut";
import { SignInForm } from "../SignIn";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <LinkContainer to={ROUTES.HOME}>
        <Navbar.Brand>User Admin</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to={ROUTES.EDIT_PROFILE}>
            <Nav.Link>
              <i className="fas fa-user"></i> <span>Edit Profile</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={ROUTES.PASSWORD_RESET}>
            <Nav.Link>
              <i className="fas fa-key"></i> <span>Password Reset</span>
            </Nav.Link>
          </LinkContainer>
          <SignOutButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavigationNonAuth = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to={ROUTES.HOME}>
        <Navbar.Brand>User Admin</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to={ROUTES.HOME}>
        <Button variant="outline-info" onClick={() => setModalShow(true)}>
          Sign In
        </Button>
      </LinkContainer>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login-modal"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="lead">
              <i className="fas fa-user"></i> Sign into Your Account
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm />
        </Modal.Body>
        <Modal.Footer>
          <PasswordForgetLink onClick={() => setModalShow(false)} />
          <SignUpLink onClick={() => setModalShow(false)} />
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Navigation;
