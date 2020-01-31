import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import demoPic from "../../assets/img/user.jpg";

const SignUpPage = () => (
  <section className="container">
    <div className="d-flex flex-column align-items-center">
      <p className="lead">
        <i className="fas fa-user"></i> Edit Profile
      </p>
      <SignUpForm />
    </div>
  </section>
);

const INITIAL_STATE = {
  photo: "",
  username: "",
  phone: "",
  address: "",
  birthday: "",
  questionOne: "",
  answerOne: "",
  questionTwo: "",
  answerTwo: "",
  questionThree: "",
  answerThree: "",
  questions: [],
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase.questions().on("value", snapshot => {
      const questionsList = snapshot.val();

      this.setState({
        questions: questionsList
      });
    });

    let authUser = this.props.firebase.currentUser();
    if (authUser) {
      this.props.firebase.user(authUser.uid).on("value", snapshot => {
        const {
          photo,
          username,
          phone,
          address,
          birthday,
          questionOne,
          answerOne,
          questionTwo,
          answerTwo,
          questionThree,
          answerThree
        } = snapshot.val();

        this.setState({
          photo,
          username,
          phone,
          address,
          birthday,
          questionOne,
          answerOne,
          questionTwo,
          answerTwo,
          questionThree,
          answerThree
        });
      });
    }
  }

  onSubmit = event => {
    const {
      photo,
      username,
      phone,
      address,
      birthday,
      questionOne,
      answerOne,
      questionTwo,
      answerTwo,
      questionThree,
      answerThree
    } = this.state;

    let authUser = this.props.firebase.currentUser();
    // Create a user in your Firebase realtime database
    this.props.firebase
      .user(authUser.uid)
      .update({
        photo,
        username,
        phone,
        address,
        birthday,
        questionOne,
        answerOne,
        questionTwo,
        answerTwo,
        questionThree,
        answerThree
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
        file: file,
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
      phone,
      address,
      birthday,
      questionOne,
      answerOne,
      questionTwo,
      answerTwo,
      questionThree,
      answerThree,
      questions,
      error
    } = this.state;
    const isInvalid =
      username === "" || phone === "" || address === "" || birthday === "";

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
                style={{ margin: "0", marginRight: "10px" }}
              >
                <span>Upload new photo</span>
              </label>
              <Button onClick={this.removeFile}>Remove</Button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Full name</label>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            name="address"
            value={address}
            onChange={this.onChange}
            type="text"
            placeholder="Address"
          />
        </div>
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

        <div className="form-group">
          <label htmlFor="questionOne">Security Question 1</label>
          <select
            name="questionOne"
            value={questionOne}
            onChange={this.onChange}
          >
            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}{" "}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="answerOne">Security Answer 1</label>
          <input
            name="answerOne"
            value={answerOne}
            onChange={this.onChange}
            type="text"
            placeholder="Security Answer 1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="questionTwo">Security Question 2</label>
          <select
            name="questionTwo"
            value={questionTwo}
            onChange={this.onChange}
          >
            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}{" "}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="answerTwo">Security Answer 2</label>
          <input
            name="answerTwo"
            value={answerTwo}
            onChange={this.onChange}
            type="text"
            placeholder="Security Answer2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="questionThree">Security Question 3</label>
          <select
            name="questionThree"
            value={questionThree}
            onChange={this.onChange}
          >
            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}{" "}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="answerThree">Security Answer 3</label>
          <input
            name="answerThree"
            value={answerThree}
            onChange={this.onChange}
            type="text"
            placeholder="Security Answer3"
          />
        </div>
        <div className="text-center">
          <button
            disabled={isInvalid}
            className="btn btn-primary"
            type="submit"
            style={{ width: "50%" }}
          >
            Update
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
const condition = authUser => !!authUser;

export default withAuthorization(condition)(SignUpPage);

export { SignUpForm, SignUpLink };
