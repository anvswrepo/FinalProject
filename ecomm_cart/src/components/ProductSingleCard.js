import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../css/custom.css";
import book from "../book.svg";

class ProductSingleCard extends Component {
  constructor() {
    super();
    this.state = {
      productid: null,
      price: null,
      quantity_instock: null,
      userquantity: 1
    };
    this.callAddToCart = this.callAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleChange_qty = this.handleChange_qty.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
    console.log(event.currentTarget.name, ":", event.currentTarget.value);
  }

  //   handleChange_qty(event) {
  //     event.preventDefault();
  //     this.setState(
  //       {
  //         [event.currentTarget.name]: event.currentTarget.value
  //       },
  //       () => {
  //         console.log(event.currentTarget.name, ":", event.currentTarget.value);
  //         console.log(
  //           "stock: ",
  //           this.props.item.quantity_instock,
  //           " user: ",
  //           parseInt(this.state.userquantity)
  //         );
  //         if (
  //           this.props.item.quantity_instock < parseInt(this.state.userquantity)
  //         )
  //           this.setState({ userquantity: this.props.quantity_instock });
  //       }
  //     );
  //   }

  //   handleClick(event) {
  //     event.preventDefault();
  //     this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  //     console.log(event.currentTarget.name, ":", event.currentTarget.value);
  //   }

  //   saveProducts(response) {
  //     console.log("api request:", response.data[0]);
  //     this.setState({
  //       products: response.data
  //     });
  //   }

  //   async getProductsAPI() {
  //     try {
  //       axios.get(`http://localhost:3000/products/`).then(response => {
  //         console.log(response);
  //         this.saveProducts(response);
  //       });
  //     } catch (error) {
  //       console.log("api fail", error);
  //     }
  //   }

  callAddToCart() {
    // console.log(
    //   "Add to cart",
    //   this.props,
    //   this.props.item.name,
    //   " ",
    //   this.props.item.id
    // );

    this.props.updateCart(
      this.props.item.id,
      this.state.userquantity,
      this.props.item
    );
    // this.setState({ userquantity: 0 });
  }
  componentDidMount() {
    // console.log(" In Product Single Card", this.props);
    // console.log(this.props.item.name);
    // this.getProductsAPI();
  }

  render() {
    return (
      <div className="singleproductcard flexparent_row_leftalign">
        <div className="singleproductcard_innerdiv">
          <img src={book} className="booklogo" alt="logo" />

          <p className="booktitle"> {this.props.item.name.toLowerCase()} </p>
          {/* <p> {this.props.item.category} </p> */}
          <p className="bookprice"> ${this.props.item.price} </p>
          <p className="bookstock">
            {" "}
            In-stock: {this.props.item.quantity_instock}{" "}
          </p>
          <input
            className="form-input"
            type="integer"
            id="userquantity"
            name="userquantity"
            placeholder="1"
            value={this.state.userquantity}
            onChange={this.handleChange}
            disabled={this.props.item.quantity_instock > 0 ? false : true}
          />
          <button
            className="bkcoral buybutton"
            onClick={this.callAddToCart}
            variant="info"
            size="lg"
          >
            BUY
          </button>
        </div>{" "}
      </div>
    );
  }
}
export default ProductSingleCard;
