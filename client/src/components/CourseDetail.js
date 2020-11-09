import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {NavLink} from 'react-router-dom';

export default class CourseDetail extends Component {
  state = {
    course: {}
  }
  
  componentDidMount(){
    const { context } = this.props;

    context.data.getCourseDetail(this.props.match.params.id)
      .then(course => {this.setState({ course })})
      .catch(err => {
        this.props.history.push('/error');
      });
  }

  render() {
    const {course} = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><NavLink className="button" to={`/courses/${course.id}/update`}>Update Course</NavLink><NavLink className="button" to="/">Delete Course</NavLink></span><NavLink
                className="button button-secondary" to="/">Return to List</NavLink></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {course.owner?.firstName} {course.owner?.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown children={course.description}></ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown children={course.materialsNeeded}></ReactMarkdown>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}