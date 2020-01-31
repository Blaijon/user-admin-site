import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <section className="container">
    <div className="d-flex flex-column align-items-center">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Security Answers
      </p>
      <SignUpForm />
    </div>
  </section>
);

const INITIAL_STATE = {
  questionOne: "1",
  answerOne: "",
  questionTwo: "1",
  answerTwo: "",
  questionThree: "1",
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
    this.setState({ loading: true });

    this.props.firebase.questions().on("value", snapshot => {
      const questionsList = snapshot.val();

      this.setState({
        questions: questionsList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {
    const {
      questionOne,
      answerOne,
      questionTwo,
      answerTwo,
      questionThree,
      answerThree
    } = this.state;

    let uid = localStorage.getItem("uid");
    // Create a user in your Firebase realtime database
    this.props.firebase
      .user(uid)
      .update({
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
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      questionOne,
      answerOne,
      questionTwo,
      answerTwo,
      questionThree,
      answerThree,
      questions,
      error
    } = this.state;
    console.log("questions: ", questions);
    const isInvalid =
      answerOne === "" || answerTwo === "" || answerThree === "";

    return (
      <form onSubmit={this.onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="questionOne">Security Question 1</label>
          <select
            name="questionOne"
            value={questionOne}
            onChange={this.onChange}
          >
            <option value="">Select Question 1</option>
            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}
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
            <option value="">Select Question 2</option>
            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}
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
            <option value="">Select Question 3</option>

            {questions
              ? questions.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))
              : ""}
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
            Sign Up
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

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };
