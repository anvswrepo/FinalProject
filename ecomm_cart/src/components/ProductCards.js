import React, { Component } from "react";
import axios from "axios";
// import { DropdownButton } from "react-bootstrap";
// import { Dropdown } from "react-bootstrap";
import "../css/custom.css";
import ProductSingleCard from "./ProductSingleCard.js";

class ProductCards extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.getProductsAPI = this.getProductsAPI.bind(this);
    this.saveProducts = this.saveProducts.bind(this);
    //     this.handleClick = this.handleClick.bind(this);
    //     this.callLeaderboardAPI = this.callLeaderboardAPI.bind(this);
  }

  //   handleClick(event) {
  //     event.preventDefault();
  //     this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  //     console.log(event.currentTarget.name, ":", event.currentTarget.value);
  //   }

  saveProducts(response) {
    console.log("api request:", response.data[0]);
    this.setState({
      products: response.data
    });
  }

  async getProductsAPI() {
    try {
      axios.get(`http://localhost:3000/products/`).then(response => {
        console.log(response);
        this.saveProducts(response);
      });
    } catch (error) {
      console.log("api fail", error);
    }
  }

  componentDidMount() {
    console.log(" In Product Cards", this.props);
    this.getProductsAPI();
  }

  render() {
    const { updateCart } = this.props;
    return (
      <div className="textcenter textcoral">
        <ul>
          {this.state.products.map(function(item, index) {
            // return <li key={index}> name {item.name} </li>;

            return (
              <ProductSingleCard
                key={index}
                item={item}
                updateCart={updateCart}
              />
            );

            // params.require(:product).permit(:name, :description, :category, :keyword, :price, :quantity_instock)
          })}
        </ul>
      </div>
    );
  }
}
export default ProductCards;
