import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router'
import ErrorComponent from './ErrorComponent';
import styles from './UserProfile.module.css';

class UserProfile extends Component {
  state = {
    user: null,
    isLoading: true,
    error: null
  }

  render() {
    const { user, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    const { username, name, avatar_url } = user;
    return (
      <article className={`articles ${styles.userProfile}`}>
        <h2>username: {" " + username}</h2>
        <h2>name: {" " + name}</h2>
        <img src={avatar_url} alt="profile pic" />
        <Link to={`/users/${username}`}><button>See all {username}'s articles</button></Link>
      </article>
    );
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate({ user }) {
    if (user !== this.props.user) this.fetchUser();
    
  }

  fetchUser = () => {
    api.getData(`users/${this.props.user  }`)
      .then(({ user }) => {
        this.setState({ user, isLoading: false });
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default UserProfile;