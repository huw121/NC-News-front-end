import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router'

class UserProfile extends Component {
  state = {
    user: null,
    isLoading: true
  }

  render() {
    const { user, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    const { username, name, avatar_url } = user;
    return (
      <article>
        <h3>username: {username}</h3>
        <h4>name: {name}</h4>
        <img src={avatar_url} alt="profile pic" />
        <Link to={`/users/${username}`}><button>See all {username}'s articles</button></Link>
      </article>
    );
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate({ username }) {
    if (username !== this.props.username) this.fetchUser();
  }

  fetchUser = () => {
    api.getData(`users/${this.props.username}`)
      .then(({ user }) => {
        this.setState({ user, isLoading: false });
      })
  }
}

export default UserProfile;