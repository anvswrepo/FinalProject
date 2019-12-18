import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../css/custom.css";

class CartSummary extends Component {
  constructor() {
    super();
    this.state = {
      useritemsquantity: 0
    };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    console.log("Toggle to see cart");
    this.props.toggle_fetchCartDetail();
  }

  componentDidMount() {
    console.log(" In Cart Summary");
  }

  render() {
    return (
      <div>
        <p> ITEMS IN CART: {this.props.useritemsquantity} </p>
        <Button
          className="bkcoral"
          onClick={this.toggleState}
          variant="info"
          size="lg"
        >
          VIEW CART
        </Button>
      </div>
    );
  }
}
export default CartSummary;
