import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "../css/custom.css";

class LogoutButton extends Component {
  render() {
    return (
      <div className="flexparent_row_leftalign logoutgrp">
        {/* <Col className="logoutgrp" lg={6} md={6} sm={6} xs={6}> */}
        <span className="textblue displayflex">
          Hello {this.props.username}
        </span>
        {/* </Col> */}
        <span>
          <button className="logoutgrpbutton " onClick={this.props.logoutUser}>
            Logout
          </button>
        </span>
      </div>
    );
  }
}
export default LogoutButton;
