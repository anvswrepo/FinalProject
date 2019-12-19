import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../css/custom.css";

class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      productid: null,
      price: null,
      quantity_instock: null,
      userquantity: 0
    };
    // this.callAddToCart = this.callAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.callModifyCart = this.callModifyCart.bind(this);
    this.callRemoveFromCart = this.callRemoveFromCart.bind(this);

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

  callModifyCart() {
    console.log(
      "Modify ",
      this.props.item.name,
      " id:",
      this.props.item.id,
      " qty:",
      this.state.userquantity
    );
    let qty_change =
      parseInt(this.state.userquantity) -
      parseInt(this.props.item.user_quantity);
    console.log(qty_change);

    // let newqty = this.props.useritemsquantity - this.state.userquantity;
    let newprice = this.props.totalprice + qty_change * this.props.item.price;

    console.log(
      "new qty",
      this.state.userquantity,
      "old qty",
      this.props.item.user_quantity,
      "new price",
      newprice,
      "old price",
      this.props.totalprice
    );

    // sending request to modifyCart(cartitemid, userquantity, qtychange, newprice) {
    this.props.modifyCart(
      this.props.item.id,
      this.state.userquantity,
      qty_change,
      newprice
    );
  }

  callRemoveFromCart() {
    console.log(
      "Remove ",
      this.props.item,
      this.props.item.name,
      " ",
      this.props.item.id
    );

    // this removes from the database
    this.props.removeFromCart(
      this.props.item.id,
      this.props.item.product_id,
      this.state.userquantity
    );
    let newqty = this.props.useritemsquantity - this.state.userquantity;
    let newprice =
      this.props.totalprice - this.state.userquantity * this.props.item.price;

    this.props.updateuseritemsquantity(newqty, newprice);

    this.setState({ userquantity: 0 });
    // this.props.toggle_fetchCartDetail();
  }

  componentDidMount() {
    console.log(" In Product Single Card", this.props);
    // console.log(this.props.item.name);
    // this.getProductsAPI();
    this.setState({ userquantity: this.props.item.user_quantity });
  }

  render() {
    if (this.state.userquantity === 0) return null;
    else
      return (
        <div className="singlecartitem flexparent_row_leftalign">
          <div className="booktitleincart">
            {" "}
            {this.props.item.name.toLowerCase()}{" "}
          </div>
          <div className="bookprice"> ${this.props.item.price} </div>
          <div>
            <input
              className="form-input form-input-incart "
              type="integer"
              id="userquantity"
              name="userquantity"
              placeholder="1"
              value={this.state.userquantity}
              onChange={this.handleChange}
              //   disabled={this.props.item.quantity_instock > 0 ? false : true}
            />

            <button
              className="updatebutton"
              onClick={this.callModifyCart}
              variant="info"
              size="lg"
            >
              Update
            </button>
            <button
              className="removebutton"
              onClick={this.callRemoveFromCart}
              variant="info"
              size="lg"
            >
              Remove
            </button>
          </div>
        </div>
      );
  }
}
export default SingleCartItem;
