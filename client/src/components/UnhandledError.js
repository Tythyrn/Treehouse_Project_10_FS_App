import React, { Component } from 'react';

//Renders the header of the app
export default class NotFound extends Component {
  render() {
    return (
      <div className="bounds">
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    );
  }
}