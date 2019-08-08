import React, { Component } from 'react';
import * as api from '../../api'
import TopicsCard from './TopicsCard';
import { Link } from '@reach/router';
import TopicForm from './TopicForm';

class TopicsList extends Component {
  state = {
    topics: null,
    isLoading: true,
    showForm: false
  }

  render() {
    const { topics, isLoading, showForm } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
        <input type="button" onClick={this.toggleForm} value={showForm ? "hide form" : "post topic"} />
        {showForm && <TopicForm addNewTopic={this.addNewTopic} />}
        {topics.map(topic => {
          return <Link to={`/topics/${topic.slug}`} key={topic.slug}><TopicsCard {...topic} /></Link>
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  toggleForm = () => {
    this.setState(currentState => ({
      showForm: !currentState.showForm
    }))
  }

  addNewTopic = (topic) => {
    this.setState(({ topics }) => ({
      topics: [topic, ...topics],
      showForm: false
    }))
  }

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
  }
}

export default TopicsList;