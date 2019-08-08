import React, { Component } from 'react';
import * as api from '../../api';

class TopicForm extends Component {
  state = {
    slug: '',
    description: ''
  }

  render() {
    const { slug, description } = this.state;
    return (
      <form onSubmit={this.handleTopicSubmit}>
        <label>
          enter topic title:
          <input name="slug" onChange={this.handleFormChange} value={slug} required></input>
        </label>
        <label>
          enter topic description:
          <textarea name="description" onChange={this.handleFormChange} value={description} required></textarea>
        </label>
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
  }
}

export default TopicForm;