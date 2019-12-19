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
import axios from "axios";

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
      products: [],
      useritemsquantity: 0,
      totalprice: 0,
      userId: null,
      userCartId: null,
      fetchCartDetail: false,
      currentDate: null
    };

    this.updateUserStatus = this.updateUserStatus.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.modifyCart = this.modifyCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.toggle_fetchCartDetail = this.toggle_fetchCartDetail.bind(this);
    this.updateuserCartId = this.updateuserCartId.bind(this);
    this.updateuseritemsquantity = this.updateuseritemsquantity.bind(this);
    this.updateProductCart = this.updateProductCart.bind(this);
  }

  // Reducer functions
  totalQuantity = () =>
    this.state.products.reduce((sum, product) => sum + product.quantity, 0);

  totalPrice = () =>
    this.state.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );

  //updateProductCart
  updateProductCart(cart) {
    this.setState({
      products: cart
    });
    console.log("products in cart : ", this.state.products);
    this.setState({
      totalprice: this.totalPrice(),
      useritemsquantity: this.totalQuantity()
    });
  }

  //  updateCart
  updateuseritemsquantity(quantity, tprice) {
    console.log(quantity);
    this.setState({
      useritemsquantity: quantity,
      totalprice: tprice
    });
  }

  //  updateCart
  updateCart(productid, userquantity, product) {
    console.log(
      "add to cart  product id : ",
      productid,
      " qty: ",
      userquantity
    );

    this.setState({
      products: [...this.state.products, { ...product, quantity: userquantity }]
    });
    console.log("updated products ", this.state.products);
    //localhost:3000/users/1/usercarts/1/cartitems
    // curl -i -X POST -H 'Content-Type: application/json' -d '{"quantity": "20","product_id": "12"}' http://localhost:3000/users/1/usercarts/1/cartitems

    let cartpayloadobj = {
      quantity: userquantity,
      product_id: productid
    };

    console.log(cartpayloadobj);
    // DB  HERE CALL TO UPDATE IN DB
    if (this.state.loggedIn) {
      axios
        .post(
          `http://localhost:3000/users/${this.state.userId}/usercarts/${this.state.userCartId}/cartitems`,
          cartpayloadobj
        )
        .then(response => {
          console.log(response);
        });
    }
    var newqty = 0;
    newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    this.setState({
      useritemsquantity: newqty
    });
  }

  modifyCart(cartitemid, userquantity, qtychange, newprice) {
    console.log(
      "add to cart item id : ",
      cartitemid,
      " qty: ",
      userquantity,
      "change",
      qtychange,
      "newprice",
      newprice
    );
    var newqty = 0;
    newqty = parseInt(this.state.useritemsquantity) + parseInt(userquantity);
    this.setState({
      useritemsquantity: newqty,
      totalprice: newprice
    });

    // DB  HERE CALL TO UPDATE IN DB
    // curl -i -X PUT -H 'Content-Type: application/json' -d '{"quantity": "20"}' http://localhost:3000/users/40/usercarts/17/cartitems/41

    let url = `http://localhost:3000/users/${this.state.userId}/usercarts/${this.state.userCartId}/cartitems/${cartitemid}`;
    let payloadobj = {
      quantity: userquantity
    };
    axios.put(url, payloadobj).then(response => {
      console.log(response);
    });

    //
  }

  removeFromCart(cartitemid, productid, userquantity) {
    console.log(
      "remove from  cart productid : ",
      productid,
      "cartitemid",
      cartitemid,
      " qty: ",
      userquantity
    );

    // DB  HERE CALL TO REMOVE IN DB
    let url = `http://localhost:3000/users/${this.state.userId}/usercarts/${this.state.userCartId}/cartitems/${cartitemid}`;
    console.log(url);
    axios.delete(url).then(response => {
      console.log(response);
    });
  }

  // updateUserStatus
  updateUserStatus(username) {
    this.setState({ username: username, loggedIn: true });
    console.log(username);
  }

  // updateUserId
  updateUserId(userId) {
    console.log("Userid to update: ", userId);
    this.setState({
      userId: userId
    });
  }
  // updateUsercartid
  updateuserCartId(cartId) {
    console.log("Cart id to update: ", cartId);
    this.setState({
      userCartId: cartId
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
    this.setState({
      username: "",
      loggedIn: false,
      cart: [],
      useritemsquantity: 0,
      userId: null,
      userCartId: null
    });
    // console.log(username);
    this.updateuseritemsquantity(0);
    this.toggle_fetchCartDetail();
  }

  componentDidMount() {
    console.log(" In App.js");

    let today = new Date();
    let date1 =
      today.getFullYear() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date1);

    this.setState({ currentDate: date1 });
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
                  <h5>{this.state.currentDate}</h5>
                  {/* <h5>UserID {this.state.userId}</h5>
                  <h5>CartID {this.state.userCartId}</h5> */}
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
                  currentDate={this.state.currentDate}
                  loggedIn={this.state.loggedIn}
                  updateUserStatus={this.updateUserStatus}
                  updateUserId={this.updateUserId}
                  updateuserCartId={this.updateuserCartId}
                  fetchCartDetail={this.fetchCartDetail}
                  toggle_fetchCartDetail={this.toggle_fetchCartDetail}
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
                    userCartId={this.state.userCartId}
                    userId={this.state.userId}
                    updateuseritemsquantity={this.updateuseritemsquantity}
                    useritemsquantity={this.state.useritemsquantity}
                    totalprice={this.state.totalprice}
                    updateProductCart={this.updateProductCart}
                    products={this.state.products}
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
                  <ProductCards
                    updateCart={this.updateCart}
                    userCartId={this.state.userCartId}
                  />
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
