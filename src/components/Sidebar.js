import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import ErrorComponent from './ErrorComponent';

class Sidebar extends Component {
  state = {
    topics: null,
    isLoading: true,
    error: null
  }

  render() {
    const { topics, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    return (
      <nav className="sidebar">
        {topics.map(topic => {
          return <li key={topic.slug}><Link to={`topics/${topic.slug}`}>{topic.slug}</Link></li>
        })}
        <Link to="/topics"><button>See all topics</button></Link>
      </nav>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  componentDidUpdate() {
    const {newTopics, handleNewTopics} = this.props;
    if (newTopics) {
      this.fetchTopics();
      handleNewTopics();
    }
  }

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false })
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default Sidebar;