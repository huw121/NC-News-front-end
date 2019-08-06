import React, { Component } from 'react';
import * as api from '../../api';
import CommentCard from './CommentCard';

class Comments extends Component {
  state = {
    comments: null,
    isLoading: true
  }

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} />
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments = () => {
    api.getData(`articles/${this.props.article_id}/comments`)
      .then(({ comments }) => {
        this.setState({ comments, isLoading: false });
      })
  }
}

export default Comments;