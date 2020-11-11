import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';

//Signs user out, deletes cookie and redirects user to root page
export default function UserSignOut ({context}) {
  useEffect(() => context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}