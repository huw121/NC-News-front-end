import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';
import ErrorComponent from './ErrorComponent';

class SignUpPage extends Component {
  state = {
    username: '',
    name: '',
    avatar_url: '',
    error: null
  }
  render() {
    const { username, name, avatar_url, error } = this.state;
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.postUser}>
        <label>
          enter username:
          <input name="username" value={username} onChange={this.handleFormChange} required />
        </label>
        <label>
          enter name:
          <input name="name" value={name} onChange={this.handleFormChange} required />
        </label>
        <label>
          enter avatar url:
          <input name="avatar_url" value={avatar_url} onChange={this.handleFormChange} />
        </label>
        <button type="submit">add new user</button>
      </form>
    );
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  postUser = (e) => {
    e.preventDefault();
    const { error, ...newUser } = this.state;
    api.postUser(newUser)
      .then(({ username }) => {
        this.props.handleUserChange(username);
        navigate('/');
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status }
        })
      })
  }
}

export default SignUpPage;