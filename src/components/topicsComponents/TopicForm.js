import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './topicForm.module.css';
import LoaderSpinner from '../Loader';

class TopicForm extends Component {
  state = {
    slug: '',
    description: '',
    error: null,
    isLoading: false
  }

  render() {
    const { slug, description, error, isLoading } = this.state;
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
        {isLoading ? <LoaderSpinner /> : <button type="submit">submit topic</button>}
      </form>
    );
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  handleTopicSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      const { addNewTopic } = this.props;
      const { error, isLoading, ...newTopic } = this.state;
      api.postTopic(newTopic)
        .then(topic => {
          addNewTopic(topic);
        })
        .catch(({ response: { data: { message }, status } }) => {
          this.setState({
            error: { message, status }
          })
        })
    })
  }
}

export default TopicForm;