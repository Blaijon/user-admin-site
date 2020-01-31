import React from "react";

import { AuthUserContext } from "../Session";
import PasswordChangeForm from "../PasswordChange";
import { withAuthorization } from "../Session";

const PasswordReset = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <section className="container">
        <div className="d-flex flex-column align-items-center">
          <p className="lead">
            <i className="fas fa-key"></i> Password Reset
          </p>
          <label>Account: {authUser.email}</label>
          <PasswordChangeForm />
        </div>
      </section>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(PasswordReset);
