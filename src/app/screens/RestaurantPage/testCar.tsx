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
    console.log("running componentDidMount");
    this.setState({ color: "blue", maker: "Tesla", model: "Model Y" });
  };

  componentDidMount() {
    // it is invoked after first render, i.e when the component mounts for the first time = RETRIEVE DATA FROM BACKEND SERVER
  }

  componentWillMount() {
    console.log("running componentWillMount");
    // was executed just before the mounting of the component, meaning it ran before the initial render.
    // It was used for setup tasks like initial state setup or dispatching actions to fetch data.
  }

  componentDidUpdate() {
    // invoked immediately after updating occurs, meaning it's called after any rendered HTML has been updated.
    // This method is not called for the initial render.
    // If you previously used componentWillMount() to fetch data, move that logic to componentDidMount() or the useEffect hook in functional components with Hooks
  }

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
