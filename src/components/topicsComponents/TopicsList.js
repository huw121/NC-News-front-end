import React, { Component } from 'react';
import * as api from '../../api'
import TopicsCard from './TopicsCard';
import { Link } from '@reach/router';
import TopicForm from './TopicForm';
import ErrorComponent from '../ErrorComponent';
import styles from './TopicList.module.css';

class TopicsList extends Component {
  state = {
    topics: null,
    isLoading: true,
    showForm: false,
    error: null
  }

  render() {
    const { topics, isLoading, showForm, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    return (
      <section className={`articles ${styles.topicList}`}>
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
    this.props.handleNewTopics();
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
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default TopicsList;