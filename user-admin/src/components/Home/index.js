import React, { Component } from "react";
import { withAuthorization } from "../Session";
import demoPic from "../../assets/img/user.jpg";

const INITIAL_STATE = {
  photo: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  questionOne: "",
  answerOne: "",
  questionTwo: "",
  answerTwo: "",
  questionThree: "",
  answerThree: ""
};

class HomePage extends Component {
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
          email,
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
          email,
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
  render() {
    const {
      photo,
      username,
      email,
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
    return (
      <section className="container">
        <div className="profile-grid my-1">
          <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={photo || demoPic} alt="" />
            <h1 className="large">{username}</h1>
            <p className="lead">Email: {email}</p>
            <p className="lead">Phone: {phone}</p>
            <p className="lead">Date of Birth: {birthday}</p>
            <p>Address: {address}</p>
          </div>

          <div className="profile-about bg-light p-2">
            <h1 className="text-secondary">Security questions and answers</h1>
            <div className="line"></div>
            <h2 className="text-primary">{questionOne}</h2>
            <p>{answerOne}</p>
            <div className="line"></div>
            <h2 className="text-primary">{questionTwo}</h2>
            <p>{answerTwo}</p>
            <div className="line"></div>
            <h2 className="text-primary">{questionThree}</h2>
            <p>{answerThree}</p>
          </div>
        </div>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
