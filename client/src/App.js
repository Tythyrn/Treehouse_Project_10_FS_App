import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CourseswithContext = withContext(Courses);
const CourseDetailwithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CourseswithContext} />
        <Route path="/courses/:id" component={CourseDetailwithContext} />
      </Switch>
    </div>
  </Router>
)