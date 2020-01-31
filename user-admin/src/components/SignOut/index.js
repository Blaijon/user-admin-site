import React from "react";
import { Nav } from "react-bootstrap";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase, history }) => {
  function onClick() {
    firebase.doSignOut();
  }
  return (
    <Nav.Link onClick={onClick}>
      <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
    </Nav.Link>
  );
};

export default withFirebase(SignOutButton);
