// @ts-nocheck
import React, { Component } from "react";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maker: "Ford",
      model: "Mustang",
      color: "red",
      year: "1964",
    };
  }
  changeColor = () => {
    this.setState({ color: "blue", maker: "Tesla", model: "Model Y" });
  };

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color} - {this.state.model} - from{" "}
          {this.state.year} <br />
          <button type="button" onClick={this.changeColor}>
            Change color
          </button>
        </p>
      </div>
    );
  }
}

export default Car;
