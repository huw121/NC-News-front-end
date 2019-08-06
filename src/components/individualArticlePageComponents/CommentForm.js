import React, { Component } from 'react';
import * as api from '../../api';

class CommentForm extends Component {
  state = {
    body: ''
  }

  render() {
    return (
      <form onSubmit={this.handleCommentSubmit}>
        <textarea onChange={this.handleBodyChange} value={this.state.body}></textarea>
        <button type="submit">submit comment</button>
      </form>
    );
  }

  handleBodyChange = ({ target: { value } }) => {
    this.setState({ body: value });
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    api.postComment(this.props.id, this.state.body)
      .then(comment => {
        // this.postComment(comment);
        console.log(comment);
      })
  }
}

export default CommentForm;