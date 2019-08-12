import React, { Component } from 'react';
import TopicsCard from './TopicsCard';
import { Link } from '@reach/router';
import TopicForm from './TopicForm';
import styles from './TopicList.module.css';

class TopicsList extends Component {
  state = {
    showForm: false,
  }

  render() {
    const { showForm } = this.state;
    const { topics } = this.props;
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

  toggleForm = () => {
    this.setState(currentState => ({
      showForm: !currentState.showForm
    }))
  }

  addNewTopic = (topic) => {
    this.props.handleNewTopics(topic);
    this.setState({showForm: false})
  }
}

export default TopicsList;