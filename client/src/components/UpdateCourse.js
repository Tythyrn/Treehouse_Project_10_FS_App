import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
  state = {
    id: '',
    owner: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  //gets course details for the course being updated
  componentDidMount(){
    const { context } = this.props;

    context.data.getCourseDetail(this.props.match.params.id)
      .then(course => {

        //Checks if owner and authenticated user matches.  If not, then sent to forbidden
        //I feel like there is a better way to handle this
        const owner = {...course.owner};
        if(owner.emailAddress !== context.authenticatedUser.emailAddress){
          return this.props.history.push('/forbidden');
        }

        this.setState({ 
          id: course.id,
          owner: {...course.owner},
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
        })
      })
      .catch(err => {
        if(!this.course) {
          this.props.history.push('/notfound');
        } else {
          this.props.history.push('/error');
        }
      });
  }

  //renders the page with the course details in the fields
  render() {
    const {
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input 
                        id="title" 
                        name="title" 
                        type="text"
                        className="input-title course--title--input"
                        value={title} 
                        onChange={this.change} 
                        placeholder="Course title..." />
                    </div>
                    <p>By {owner.firstName} {owner.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description" 
                        name="description" 
                        className="" 
                        value={description}
                        onChange={this.change}
                        placeholder="Course description..."
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            className="course--time--input"
                            placeholder="Hours" 
                            value={estimatedTime}
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            className=""
                            value={materialsNeeded}
                            onChange={this.change}
                            placeholder="List materials..."
                          >
                          </textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
      </div>
    );
  }

  //updates state of properties as changes are made in the fields
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //this takes all the states and creates a course object which is then sent to updateCourse
  submit = () => {
    const { context } = this.props;
    const  authUser  = context.authenticatedUser;

    const {
      id,
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      id,
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data.updateCourse( course, authUser.emailAddress, authUser.password )
      .then( errors => {
        if(errors.length){
          this.setState( { errors } );
        } else {
          this.props.history.push(`/courses/${id}`);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}