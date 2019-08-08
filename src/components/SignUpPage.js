import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class SignUpPage extends Component {
  state = {
    username: '',
    name: '',
    avatar_url: ''
  }
  render() {
    const { username, name, avatar_url } = this.state;
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
    api.postUser(this.state)
      .then(({ username }) => {
        this.props.handleUserChange(username);
        navigate('/');
      })
  }
}

export default SignUpPage;