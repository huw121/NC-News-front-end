import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from '../Votes';
import styles from './ArticleCard.module.css';
import convertCreatedAt from '../../utils/convertCreated';

class ArticleCard extends Component {
  state = {
    votes: this.props.votes
  }
  render() {
    const { article_id, author, comment_count, created_at, title, topic, votes, path } = this.props
    return (
      <article className={`article-card ${styles.articleCard}`}>
        <Votes votes={votes} id={article_id} target="articles" />
        <div className={styles.articleCardContent}>
          <Link to={`/topics/${topic}`}><p className={styles.articleCardLinks}>{topic}</p></Link>
          <p>created at: {convertCreatedAt(created_at)}</p>
          <Link to={`/articles/${article_id}`} state={{ prevPath: path }}><h2 className={styles.articleCardLinks}>{title}</h2></Link>
          <Link to={`/users/${author}`}><p className={styles.articleCardLinks}>created by: {author}</p></Link>
          <p>comments: {comment_count}</p>
        </div>
      </article >
    );
  }
};

export default ArticleCard;