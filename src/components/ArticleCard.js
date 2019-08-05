import React, { Component } from 'react';
import { Link } from '@reach/router';
import Votes from './Votes';

class ArticleCard extends Component {
  state = {
    votes: this.props.votes
  }
  render() {
    const { article_id, author, comment_count, created_at, title, topic, votes } = this.props
    return (
      <article className="article-card">
          <Votes votes={votes} id={article_id} target="articles"/>
        <div>
          <Link to={`/topics/${topic}`}><p>{topic}</p></Link>
          <p>created: {created_at}</p>
          <Link to={`/articles/${article_id}`}><h2>{title}</h2></Link>
          <Link to={`/users/${author}`}><p>created by: {author}</p></Link>
          <p>comments: {comment_count}</p>
        </div>
      </article >
    );
  }
};

export default ArticleCard;