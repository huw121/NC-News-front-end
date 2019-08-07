import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from '@reach/router';
import Votes from '../Votes';
import CommentsList from './CommentsList';

class IndividualArticlePage extends Component {
  state = {
    article: null,
    isLoading: true,
  }

  render() {
    const { isLoading, article } = this.state;
    if (isLoading) return <p>Loading...</p>
    const { author, body, comment_count, created_at, title, topic, votes, article_id } = article;
    return (
      <article className="articles">
        <Votes votes={votes} id={article_id} target="articles" />
        <Link to={`/topics/${topic}`}><p>{topic}</p></Link>
        <h1>{title}</h1>
        <p>Created at: {created_at}</p>
        <Link to={`/users/${author}`}><p>created by: {author}</p></Link>
        <p>{body}</p>
        <p>comments: {comment_count}</p>
        <CommentsList article_id={article_id} user={this.props.user}/>
      </article>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    api.getData(`articles/${this.props.article_id}`)
      .then(({ article }) => {
        this.setState({ article, isLoading: false })
      })
  }
}

export default IndividualArticlePage;