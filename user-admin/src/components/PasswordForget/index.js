import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <section className="container">
    <div className="d-flex flex-column align-items-center">
      <p className="lead">
        <i className="fas fa-key"></i> Password Forgot
      </p>

      <PasswordForgetForm />
    </div>
  </section>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <Row>
        <Col md={12}>
          <form onSubmit={this.onSubmit} className="form forgot-form">
            <div className="form-group">
              <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <button
              disabled={isInvalid}
              type="submit"
              className="btn btn-primary"
            >
              Reset My Password
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </Col>
      </Row>
    );
  }
}

const PasswordForgetLink = props => (
  <p className="my-1">
    <Link to={ROUTES.PASSWORD_FORGET} onClick={props.onClick}>
      Forgot Password?
    </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
