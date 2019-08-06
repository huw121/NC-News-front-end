import React from 'react';
import Votes from '../Votes';

const CommentCard = ({ author, body, comment_id, created_at, votes }) => {
  return (
    <article className="article-card">
      <Votes votes={votes} id={comment_id} target="comments" />
      <p>created by: {author}</p>
      <p>created at: {created_at}</p>
      <p>{body}</p>
    </article>
  );
};

export default CommentCard;