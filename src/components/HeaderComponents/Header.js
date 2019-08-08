import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../../api';
import UserDropdown from './UserDropdown';
import ErrorComponent from '../ErrorComponent';

class Header extends Component {
  state = {
    users: null,
    isLoading: true,
    error: null
  }
  render() {
    const { users, isLoading, error } = this.state;
    const { user, handleUserChange } = this.props;
    if (error) return <ErrorComponent error={error} />
    return (
      <header className="header">
        <Link to="/"><h1>NC News</h1></Link>
        {isLoading
          ? <p>Loading...</p>
          : (
            <UserDropdown handleUserChange={handleUserChange} users={users} user={user} />
            )
        }
        <Link to={`/${user}/profile`}><button>see profile</button></Link>
        <Link to='/signup'><button>sign up</button></Link>
      </header>
    );
  };

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    api.getData('users')
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default Header;