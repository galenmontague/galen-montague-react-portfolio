import React, { Component } from "react";

export default class Workflow extends Component {
  // First - this is always called initially
  // this one setes state
  // you can see the workflow in the browser console when moving through this website
  // state will only be found in class components, not functional components
  constructor() {
    super();
    this.state = {};
    console.log("constructor");
  }

  // Second
  // only used if passing props around
  static getDerivedStateFromProps() {
      //looking to see if any props or state available. Would need props as args in constructor.
    console.log("getDerivedStateFromProps");
  }

  // Fourth
  componentDidMount() {
    console.log("componentDidMount");
  }

  // Fifth (after update)
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  // Seventh (after update)
  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate");
    return true;
  }

  // Eighth (after update)
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  // Last
  componentWillUnmount() {
      // is depricated, but you will see it around
      // will happen when you leave the page. Stops any api calls or other processes that are running so they don't run in the background when you are on another page.
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    console.log("button clicked");
    this.setState({ pageTitle: "Workflow" });
  };

  handleKeyUp = e => {
    this.setState({ inputDetails: e.target.value });
  };

  // Third (occurs before the component DidMount mounting process)
        // - every class component has a render, and it will run third
        // called in mounting and rendering processes
  // Sixth (after update)
  render() {
    console.log("render");

    return (
      <div>
        <h1>Workflow</h1>

        <input type="text" onKeyUp={e => this.handleKeyUp(e)} />
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}
