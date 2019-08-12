import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';
import ErrorComponent from './ErrorComponent';
import styles from './SignUpPage.module.css';

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
      <form onSubmit={this.postUser} className={`articles ${styles.signUp}`}>
        <label htmlFor="username">
          enter username:
        </label>
          <input name="username" value={username} onChange={this.handleFormChange} required />
        <label htmlFor="name">
          enter name:
        </label>
          <input name="name" value={name} onChange={this.handleFormChange} required />
        <label htmlFor="avatar_url">
          enter avatar url:
        </label>
          <input name="avatar_url" value={avatar_url} onChange={this.handleFormChange} />
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
    const {error, ...newUser } = this.state;
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