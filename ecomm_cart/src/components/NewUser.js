import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// import { Redirect } from "react-router-dom";
import axios from "axios";
import "../css/custom.css";
// import { getCurrentDate } from "../utils";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
    };
    this.handleSubmit_login = this.handleSubmit_login.bind(this);
    this.handleSubmit_signup = this.handleSubmit_signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit_signup(event) {
    // console.log("sign-up handleSubmit, username: ");
    console.log("new username created: " + this.state.username);
    // console.log(getCurrentDate());

    event.preventDefault();

    let payloadobj = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(`http://localhost:3000/users`, payloadobj).then(response => {
      console.log(response);
      //

      if (!response.data.error) {
        console.log("successful signup", response.data.id);
        this.props.updateUserStatus(this.state.username);
        this.props.updateUserId(response.data.id);

        let cartpayloadobj = {
          last_accessed_date: this.props.currentDate
        };
        axios
          .post(
            `http://localhost:3000/users/${response.data.id}/usercarts`,
            cartpayloadobj
          )
          .then(response => {
            console.log(response);
            this.props.updateuserCartId(response.data.id);
            // updateuserCartId
          });
        // this.setState({
        //   //redirect to login page
        //   redirectTo: "/login"
        // });
      } else {
        alert("Username already taken");
        console.log(response.data.error);
      }

      //
    });
  }

  handleSubmit_login(event) {
    event.preventDefault();
    // console.log("handleSubmit");

    let payloadobj = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post(`http://localhost:3000/users`, payloadobj)
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200 && response.data.success) {
          console.log("success ");
          alert("Successful login");
          this.props.updateUserStatus(this.state.username);
        } else {
          console.log(" something went wrong");
          alert("Incorrect username or login. try again");
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
        alert("Something went wrong, try again");
      });
  }

  render() {
    return (
      <div>
        <Row>
          <div className="SignupForm">
            <form>
              {/* <div className="form-group">
              <div className="col-1 col-ml-auto"> */}
              <Col lg={12} md={12} sm={12} xs={12}>
                <span className="signuplogingrp ">
                  <input
                    className="form-input  "
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />

                  <input
                    className="form-input "
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <button
                    // className="btn btn-info col-1 col-mr-auto"
                    onClick={this.handleSubmit_login}
                    type="submit"
                  >
                    Login
                  </button>

                  <button
                    // className="btn btn-info col-1 col-mr-auto"
                    onClick={this.handleSubmit_signup}
                    type="submit"
                  >
                    Sign up
                  </button>
                </span>
              </Col>
            </form>
          </div>
        </Row>
      </div>
    );
  }
}

export default Signup;
