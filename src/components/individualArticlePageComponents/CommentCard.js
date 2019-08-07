import React from 'react';
import Votes from '../Votes';
import { Link } from '@reach/router';
import * as api from '../../api';

const CommentCard = ({ author, body, comment_id, created_at, votes, user, commentDeletion }) => {

  const handleDelete = () => {
    commentDeletion(comment_id);
    api.deleteComment(comment_id);
  }

  return (
    <article className="article-card" >
      <Votes votes={votes} id={comment_id} target="comments" />
      <Link to={`/users/${author}`}><p>created by: {author}</p></Link>
      <p>created at: {created_at}</p>
      <p>{body}</p>
      {user === author && <button onClick={handleDelete}>delete comment</button>}
    </article >
  );
};

export default CommentCard;