import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './CommentForm.module.css';


class CommentForm extends Component {
  state = {
    body: '',
    error: null
  }

  render() {
    const {error} = this.state;
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.handleCommentSubmit} className={styles.commentForm}>
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
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status }
        })
      })
  }
}

export default CommentForm;