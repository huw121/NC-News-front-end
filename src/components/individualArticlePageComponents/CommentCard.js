import React from 'react';
import Votes from '../Votes';
import { Link } from '@reach/router';
import * as api from '../../api';
import styles from '../articlesListComponents/ArticleCard.module.css';

const CommentCard = ({ author, body, comment_id, created_at, votes, user, commentDeletion }) => {
  const handleDelete = () => {
    commentDeletion(comment_id);
    api.deleteComment(comment_id)
      .catch(() => {
        commentDeletion(null)
      })
  }

  return (
    <article className={`article-card ${styles.articleCard}`} >
      <Votes votes={votes} id={comment_id} target="comments" />
      <div className={styles.articleCardContent}>
      <Link to={`/users/${author}`} className={styles.articleCardLinks}><p>created by: {author}</p></Link>
      <p>created at: {created_at}</p>
      <p className={styles.body}>{body}</p>
      {user === author && <button onClick={handleDelete} className={styles.deleteButton}>delete comment</button>}
      </div>
    </article >
  );
};

export default CommentCard;