import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseswithContext = withContext(Courses);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailwithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CourseswithContext} />
        <Route path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailwithContext} />
        <Route path="/sign-in" component={UserSignInWithContext} />
        <Route path="/sign-up" component={UserSignUpWithContext} />
        <Route path="/sign-out" component={UserSignOutWithContext} />
      </Switch>
    </div>
  </Router>
)