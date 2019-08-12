import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './CommentForm.module.css';
import LoaderSpinner from '../Loader';


class CommentForm extends Component {
  state = {
    body: '',
    error: null,
    isLoading: false
  }

  render() {
    const { error, isLoading } = this.state;
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.handleCommentSubmit} className={styles.commentForm}>
        <textarea onChange={this.handleBodyChange} value={this.state.body} required></textarea>
        {isLoading ? <LoaderSpinner /> : <button type="submit">submit comment</button>}
      </form>
    );
  }

  handleBodyChange = ({ target: { value } }) => {
    this.setState({ body: value });
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
      const { id, user, addNewComment } = this.props;
      api.postComment(id, user, this.state.body)
        .then(comment => {
          addNewComment(comment);
        })
        .catch(({ response: { data: { message }, status } }) => {
          this.setState({
            error: { message, status }
          })
        })
    })
  }
}

export default CommentForm;