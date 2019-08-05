import React, { Component } from 'react';
import * as api from '../../api'
import TopicsCard from './TopicsCard';

class TopicsList extends Component {
  state = {
    topics: null,
    isLoading: true
  }

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
        {topics.map(topic => {
          return <TopicsCard key={topic.slug} {...topic}/>
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
  }
}

export default TopicsList;