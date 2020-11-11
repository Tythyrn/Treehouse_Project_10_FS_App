import React, { Component } from 'react';

//Renders the header of the app
export default class NotFound extends Component {
  render() {
    return (
      <div className="bounds">
        <h1>Forbidden</h1>
        <p>Oh oh! You can't access this page.</p>
      </div>
    );
  }
}