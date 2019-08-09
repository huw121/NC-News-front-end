import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './topicForm.module.css';

class TopicForm extends Component {
  state = {
    slug: '',
    description: '',
    error: null
  }

  render() {
    const { slug, description, error } = this.state;
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.handleTopicSubmit} className={styles.topicForm}>
        <label htmlFor="slug">
          enter topic title:
        </label>
        <input name="slug" onChange={this.handleFormChange} value={slug} required></input>
        <label htmlFor="description">
          enter topic description:
        </label>
        <textarea name="description" onChange={this.handleFormChange} value={description} required></textarea>
        <button type="submit">submit topic</button>
      </form>
    );
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  handleTopicSubmit = (e) => {
    const { addNewTopic } = this.props;
    e.preventDefault();
    api.postTopic(this.state)
      .then(topic => {
        addNewTopic(topic);
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status }
        })
      })
  }
}

export default TopicForm;