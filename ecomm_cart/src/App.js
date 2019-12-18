import React, { Component, isValidElement } from "react";
import { Container, Row, Col } from "reactstrap";

// Components
import Signup from "./components/NewUser";
import SearchBox from "./components/SearchBox";
import ProductCards from "./components/ProductCards";
// import LoginForm from "./components/Login_ph.js";
import CartSummary from "./components/CartSummary";
import CartDetail from "./components/CartDetail";
import LogoutButton from "./components/LogOutButton";

//css and images
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";
import "./custom.scss";
import "./css/custom.css";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      loggedIn: false,
      username: "",
      cart: [],
      useritemsquantity: 0,
      userId: null,
      fetchCartDetail: false
    };

    this.updateUserStatus = this.updateUserStatus.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.toggle_fetchCartDetail = this.toggle_fetchCartDetail.bind(this);
  }

  //  updateCart
  updateCart(productid, userquantity) {
    console.log("add to cart id : ", productid, " qty: ", userquantity);
    var newqty = 0;
    newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    this.setState({
      useritemsquantity: newqty
    });
  }
  // updateUserStatus
  updateUserStatus(username) {
    this.setState({ username: username, loggedIn: true });
    console.log(username);
  }

  // updateUserId
  updateUserId(userId) {
    this.setState({
      userId: userId
    });
  }

  // updatefetchCartDetail

  toggle_fetchCartDetail() {
    this.setState({
      fetchCartDetail: !this.state.fetchCartDetail
    });
  }

  // logoutUser
  logoutUser() {
    this.setState({ username: "", loggedIn: false });
    // console.log(username);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            {/************* Header ****************/}
            {/************* Logo  ****************/}
            <Col lg={5} md={5} sm={5} xs={5}>
              <div className="logo_main">
                <h2>Header</h2>
              </div>
            </Col>
            {/************  Logo ****************/}
            {/************* Login Signup *********/}
            <Col lg={7} md={7} sm={7} xs={7}>
              {!this.state.loggedIn && (
                <Signup
                  loggedIn={this.state.loggedIn}
                  updateUserStatus={this.updateUserStatus}
                  updateUserId={this.updateUserId}
                />
              )}

              {/* {!this.state.loggedIn && (
              <LoginForm updateUserStatus={this.updateUserStatus} />
            )} */}

              {this.state.loggedIn && (
                <LogoutButton
                  username={this.state.username}
                  logoutUser={this.logoutUser}
                />
              )}
            </Col>
            {/************  Header ****************/}
            {/************* Cart Detail ****************/}
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="search_main">
                {this.state.fetchCartDetail && (
                  <CartDetail
                    toggle_fetchCartDetail={this.toggle_fetchCartDetail}
                  />
                )}
              </div>
            </Col>
            {/************  Cart Detail ****************/}
            {/************* Search ****************/}
            <Col lg={5} md={5} sm={5} xs={5}>
              <div className="search_main">
                <SearchBox />
                <CartSummary
                  useritemsquantity={this.state.useritemsquantity}
                  toggle_fetchCartDetail={this.toggle_fetchCartDetail}
                />
              </div>
            </Col>
            {/************  Search ****************/}
            {/************* Product Cards *********/}
            <Col lg={7} md={7} sm={7} xs={7}>
              <div className="productcards_main">
                <ProductCards updateCart={this.updateCart} />
              </div>
            </Col>
            {/************  Product Cards **********/}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
