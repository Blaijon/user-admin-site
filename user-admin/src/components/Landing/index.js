import React from "react";
import { Row, Col } from "react-bootstrap";

import informationBg from "../../assets/img/information.jpg";

const Landing = () => (
  <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">User Management Platform</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="landing-inner information-section">
        <Row>
          <Col md={6}>
            <div className="information-text ">
              <h1 className="x-large">Information</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img src={informationBg} alt="" srcSet="" />
          </Col>
        </Row>
      </div>
      <div className="footer">
        <p className="lead">© 2020 Copyright</p>
      </div>
    </div>
  </section>
);

export default Landing;
