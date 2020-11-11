import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//Honestly don't entirely understand this code still.
//Basically it checks if a user is signed in.  If not they get rerouted to sign in
//This was used after taking the React Auth course on Treehouse
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location },
            }} />
          )
          }
        />
      )}
    </Consumer>
  );
};