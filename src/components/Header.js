import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

class Header extends Component {
  state = {
    users: null,
    isLoading: true
  }
  render() {
    const { users, isLoading } = this.state;
    return (
      <header className="header">
        <Link to="/"><h1>NC News</h1></Link>
        {isLoading
          ? <p>Loading...</p>
          : (
            <label>
              User:
            <select onChange={this.props.handleUserChange}>
                {users.map(({ username }) => (
                  <option key={username}>{username}</option>
                ))}
              </select>
            </label>
          )
        }
      </header>
    );
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    api.getData('users')
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
  }
}

export default Header;