import {config} from './config';

export default class Data {

  /**
   * api() is a general purpose function that allows many different api calls instead of needing to create this every time
   * @param {string} path - path name of the API call
   * @param {string} method - method for call such as GET or POST
   * @param {object} body - body of the API request
   * @param {boolean} requiresAuth - check if authorization is required for API call
   * @param {object} credentials - user credentials used for API call
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * getCourses() calls the /courses API url to pull back courses
   */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

    /**
   * getCourseDetail() calls the /courses:id API url to pull back courses
   */
  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * createCourse() calls the api to create a new course
   * @param {object} course - details of course to be created
   * @param {string} emailAddress - email address of user
   * @param {string} password - password of user
   */
  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });        
    } else {
      throw new Error();
    }
  }

  /**
   * updateCourse() calls the api to update an existing course
   * @param {object} course - details of course to be updated
   * @param {string} emailAddress - email address of user
   * @param {string} password - password of user
   */
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});

    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401) {
      return null;
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });        
    } else {
      throw new Error();
    }
  }

  /**
   * deleteCourse() calls the api to delete a course
   * @param {string} emailAddress - email address of user
   * @param {string} password - password of user
   * @param {*} id - ID of course to be deleted
   */
  async deleteCourse(emailAddress, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * getUser() gets the user from the API based on the entered credentials
   * @param {string} emailAddress - email address of user
   * @param {string} password - password of user
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  /**
   * createUser() creates a new user
   * @param {object} user - details of user to be created
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
