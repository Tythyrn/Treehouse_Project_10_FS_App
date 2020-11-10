import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
        <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.firstName}</span>
                <Link to="/sign-out">Sign Out</Link>
              </React.Fragment>
            :
              <React.Fragment>
                <Link className="signup" to="/sign-up">Sign Up</Link>
                <Link className="signin" to="/sign-in">Sign In</Link>
              </React.Fragment>
            }
          </nav>
        </div>
      </div>
    );
  }
}