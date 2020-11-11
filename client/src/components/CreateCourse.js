import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  //sets initial state for each property needed to create a new course
  state = {
    owner: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  componentDidMount(){
    const { context } = this.props;

    //sets the owner to the logged in user
    this.setState({owner: context.authenticatedUser});
  }

  render() {
    const {
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    //renders the page
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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

  /**
   * change() triggers evertime the field has a change and updates the value of the state for that field
   */
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  /**
   * submit() takes the current state of all the properties and calls createCourse to create a new course
   */
  submit = () => {
    const { context } = this.props;

    const {
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      owner,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data.createCourse(course, owner.emailAddress, owner.password )
      .then( errors => {
        if(errors.length){
          this.setState( { errors } );
        } else {
          this.props.history.push(`/`);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  //returns you to the root page
  cancel = () => {
    this.props.history.push('/');
  }
}