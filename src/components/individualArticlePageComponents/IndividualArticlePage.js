import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from '@reach/router';
import Votes from '../Votes';
import Comments from './CommentsList';

class IndividualArticlePage extends Component {
  state = {
    article: null,
    isLoading: true,
    showComments: false
  }

  render() {
    const { isLoading, article, showComments } = this.state;
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
        <input type="button" onClick={this.toggleComments} value={showComments ? "hide comments" : "show comments"} />
        {showComments && <Comments article_id={article_id} />}
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

  toggleComments = () => {
    this.setState(currentState => ({
      showComments: !currentState.showComments
    }))
  }

}

export default IndividualArticlePage;