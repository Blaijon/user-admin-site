import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import PasswordReset from "../PasswordReset";
import EditProfile from "../EditProfile";
import Question from "../Question";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <Navigation />
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route exact path={ROUTES.HOME} component={HomePage} />
    <Route exact path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
    <Route exact path={ROUTES.EDIT_PROFILE} component={EditProfile} />
    <Route exact path={ROUTES.QUESTION} component={Question} />
  </Router>
);

export default withAuthentication(App);
