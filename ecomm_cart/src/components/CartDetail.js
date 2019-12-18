import React, { Component } from "react";
import axios from "axios";
// import { DropdownButton } from "react-bootstrap";
// import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SingleCartItem from "./SingleCartItem.js";

import "../css/custom.css";

class CartDetail extends Component {
  constructor() {
    super();
    this.state = {
      highScoringUser: "",
      highScore: 0,
      items: [],
      totalprice: 0
    };
    //     this.saveLeaderboardScores = this.saveLeaderboardScores.bind(this);
    //     this.handleClick = this.handleClick.bind(this);
    //     this.callLeaderboardAPI = this.callLeaderboardAPI.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.getCartDetails = this.getCartDetails.bind(this);
  }

  //   handleClick(event) {
  //     event.preventDefault();
  //     this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  //     console.log(event.currentTarget.name, ":", event.currentTarget.value);
  //   }

  //   saveLeaderboardScores(response) {
  //     console.log("api request:", response.data[0]);
  //     console.log("username:", response.data[0].username);
  //     console.log("highscore:", response.data[0].highScore);

  //     const quizSet = response.data.results;

  //     this.setState({
  //       highScoringUser: response.data[0].username,
  //       highScore: response.data[0].highScore
  //     });

  //     questionsArray: quizSet
  //   },
  //   () => {
  //     this.props.addQuestionsToArray(
  //       response.data.results,
  //       this.state.difficultyOfQuestions
  //     );
  //   }
  // );

  //     this.props.updateLeadUserStatus(
  //       this.state.highScoringUser,
  //       this.state.highScore
  //     );
  //   }

  async getCartDetails() {
    try {
      axios.get(`http://localhost:3000/users/1`).then(response => {
        console.log(response);
        // this.saveLeaderboardScores(response);
        this.setState({
          items: response.data.user.cartitems
        });
        let tprice = 0;
        this.state.items.map(function(item, index) {
          tprice = tprice + item.price * item.user_quantity;
        });
        this.setState({
          totalprice: tprice
        });
      });
    } catch (error) {
      console.log("api fail", error);
    }
  }

  toggleState() {
    console.log("Toggle to CONTINUE shopping");
    this.props.toggle_fetchCartDetail();
  }

  componentDidMount() {
    console.log(" In Cart Detail");
    this.getCartDetails();
  }

  render() {
    const { toggle_fetchCartDetail, modifyCart, removeFromCart } = this.props;
    return (
      <div className="cartdetailmain textcenter ">
        <button
          className="bkcoral"
          onClick={this.toggleState}
          variant="info"
          size="lg"
        >
          Back to Shopping
        </button>
        <div className="cartitemslist">
          {this.state.items.map(function(item, index) {
            // return <li key={index}> name {item.name} </li>;

            return (
              <SingleCartItem
                key={index}
                item={item}
                modifyCart={modifyCart}
                removeFromCart={removeFromCart}
              />
            );

            // params.require(:product).permit(:name, :description, :category, :keyword, :price, :quantity_instock)
          })}
          Total Price: {this.state.totalprice}
        </div>
      </div>
    );
  }
}
export default CartDetail;
