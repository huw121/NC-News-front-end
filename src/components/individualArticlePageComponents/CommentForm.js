import React, { Component } from 'react';
import * as api from '../../api';

class CommentForm extends Component {
  state = {
    body: ''
  }

  render() {
    return (
      <form onSubmit={this.handleCommentSubmit}>
        <textarea onChange={this.handleBodyChange} value={this.state.body} required></textarea>
        <button type="submit">submit comment</button>
      </form>
    );
  }

  handleBodyChange = ({ target: { value } }) => {
    this.setState({ body: value });
  }

  handleCommentSubmit = (e) => {
    const { id, user, addNewComment } = this.props;
    e.preventDefault();
    api.postComment(id, user, this.state.body)
      .then(comment => {
        addNewComment(comment);
      })
  }
}

export default CommentForm;