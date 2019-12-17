import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// Components
import Signup from "./components/NewUser";
import SearchBox from "./components/SearchBox";
import ProductCards from "./components/ProductCards";
// import LoginForm from "./components/Login_ph.js";
import CartSummary from "./components/CartSummary";
import CartDetail from "./components/CartDetail";

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
      username: ""
    };
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
              <div className="login_signup">
                <Signup />
              </div>
            </Col>
            {/************  Product Cards **********/}

            {/************  Header ****************/}

            {/************* Search ****************/}
            <Col lg={5} md={5} sm={5} xs={5}>
              <div className="search_main">
                <h2>Search</h2>
              </div>
            </Col>
            {/************  Search ****************/}
            {/************* Product Cards *********/}
            <Col lg={7} md={7} sm={7} xs={7}>
              <div className="productcards_main">
                <h2>Product Cards</h2>
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
