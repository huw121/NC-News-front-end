import React, { Component } from 'react';
import Votes from '../Votes';
import { Link } from '@reach/router';
import * as api from '../../api';

class CommentCard extends Component {
  render() {
    const { author, body, comment_id, created_at, votes, user } = this.props;
    return (
      <article className="article-card" >
        <Votes votes={votes} id={comment_id} target="comments" />
        <Link to={`/users/${author}`}><p>created by: {author}</p></Link>
        <p>created at: {created_at}</p>
        <p>{body}</p>
        {user === author && <button onClick={this.handleDelete}>delete comment</button>}
      </article >
    );
  }

  handleDelete = () => {
    const { comment_id, commentDeletion } = this.props;
    commentDeletion(comment_id);
    api.deleteComment(comment_id);
  }
};

export default CommentCard;