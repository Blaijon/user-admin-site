import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import demoPic from "../../assets/img/user.jpg";

const SignUpPage = () => (
  <section className="container">
    <div className="d-flex flex-column align-items-center">
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <SignUpForm />
    </div>
  </section>
);

const INITIAL_STATE = {
  photo: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  passwordOne: "",
  passwordTwo: "",
  questionOne: "",
  answerOne: "",
  questionTwo: "",
  answerTwo: "",
  questionThree: "",
  answerThree: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {
    const {
      photo,
      username,
      email,
      phone,
      address,
      birthday,
      passwordOne
    } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        localStorage.setItem("uid", authUser.user.uid);
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            photo,
            username,
            email,
            phone,
            address,
            birthday
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.QUESTION);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  removeFile = () => {
    this.setState({ photo: "" });
  };

  render() {
    const {
      photo,
      username,
      email,
      phone,
      address,
      birthday,
      passwordOne,
      passwordTwo,
      error
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      phone === "" ||
      address === "" ||
      birthday === "";

    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form-group">
          <div className="avatar-container">
            <img className="avatar" src={photo || demoPic} alt="" srcSet="" />
            <div className="inputnode" style={{ margin: "0" }}>
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={this.onImageChange}
                className="inputfile inputfile-1 btn-primary"
              />
            </div>
            <div className="buttons">
              <label
                htmlFor="photo"
                className="btn btn-primary photo-label"
                style={{ margin: "0" }}
              >
                <span>Upload new photo</span>
              </label>
              <Button onClick={this.removeFile}>Remove</Button>
            </div>
          </div>
        </div>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="username">Full name</label>
              <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
            </div>{" "}
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="passwordOne">Password</label>
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </div>{" "}
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="passwordTwo">Confirm Password</label>
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="username">Date of Birth</label>
              <input
                name="birthday"
                value={birthday}
                onChange={this.onChange}
                type="date"
                placeholder="Date of Birth"
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                name="phone"
                value={phone}
                onChange={this.onChange}
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                name="address"
                value={address}
                onChange={this.onChange}
                type="text"
                placeholder="Address"
              />
            </div>{" "}
          </Col>
        </Row>
        <div className="text-center">
          <button
            disabled={isInvalid}
            className="btn btn-primary"
            type="submit"
            style={{ width: "50%" }}
          >
            Next
          </button>
        </div>

        {error && (
          <p>
            {error.message}
            {isInvalid ? "Please fill out ALL profile fields" : ""}
          </p>
        )}
      </form>
    );
  }
}

const SignUpLink = props => (
  <p>
    Don't have an account?{" "}
    <Link to={ROUTES.SIGN_UP} onClick={props.onClick}>
      Sign Up
    </Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
