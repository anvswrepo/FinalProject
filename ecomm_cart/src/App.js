import React, { Component } from "react";
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
import logo from "./logo.svg";
import "./css/normalize.css";
import "./css/skeleton.css";
// import "./css/index.css";
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
    this.modifyCart = this.modifyCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.toggle_fetchCartDetail = this.toggle_fetchCartDetail.bind(this);
  }

  //  updateCart
  updateCart(productid, userquantity) {
    console.log("add to cart id : ", productid, " qty: ", userquantity);
    // DB  HERE CALL TO UPDATE IN DB
    var newqty = 0;
    newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    this.setState({
      useritemsquantity: newqty
    });
  }

  modifyCart(productid, userquantity, qtychange) {
    console.log(
      "add to cart id : ",
      productid,
      " qty: ",
      userquantity,
      "change",
      qtychange
    );
    var newqty = 0;
    newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    this.setState({
      useritemsquantity: newqty
    });
    // DB  HERE CALL TO UPDATE IN DB
  }

  removeFromCart(productid, userquantity) {
    console.log("add to cart id : ", productid, " qty: ", userquantity);
    // var newqty = 0;
    // newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    // this.setState({
    //   useritemsquantity: newqty
    // DB  HERE CALL TO REMOVE IN DB
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
          <Row className="booksheader">
            {/* <div className="booksheader"> */}
            {/************* Header ****************/}
            {/************* Logo  ****************/}
            <Col lg={4} md={4} sm={4} xs={4}>
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>Book-o-Radar</h1>
                </header>
              </div>

              {/* <span className="logo_main">
                <img className="logo_img" src={logo}></img>
                <h2>My Book Store</h2>
              </span> */}
            </Col>
            {/************  Logo ****************/}

            {/* <header className="App-header"> */}
            {/************* Login Signup *********/}

            <Col lg={8} md={8} sm={8} xs={8}>
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
              <div>
                <CartSummary
                  useritemsquantity={this.state.useritemsquantity}
                  toggle_fetchCartDetail={this.toggle_fetchCartDetail}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {/* </div> */}
            {/************* Cart Detail ****************/}
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="search_main">
                {this.state.fetchCartDetail && (
                  <CartDetail
                    toggle_fetchCartDetail={this.toggle_fetchCartDetail}
                    modifyCart={this.modifyCart}
                    removeFromCart={this.removeFromCart}
                  />
                )}
              </div>
            </Col>
            {/************  Cart Detail ****************/}

            {/************  END Header ****************/}

            {/************* Search ****************/}
            {!this.state.fetchCartDetail && (
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="search_main">
                  <SearchBox />
                </div>
              </Col>
            )}
            {/************  Search ****************/}
            {/************* Product Cards *********/}
            {!this.state.fetchCartDetail && (
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className=" flexparent_row_leftalign">
                  <ProductCards updateCart={this.updateCart} />
                </div>
              </Col>
            )}
            {/************  Product Cards **********/}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
