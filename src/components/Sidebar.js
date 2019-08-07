import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class Sidebar extends Component {
  state = {
    topics: null,
    isLoading: true
  }

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
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

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false })
      })
  }
}

export default Sidebar;