import React, { Component } from 'react';
import moment from "moment";

// this is the parent component for our whole application
export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Galen Montague's Portfolio</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
    );
  }
}
