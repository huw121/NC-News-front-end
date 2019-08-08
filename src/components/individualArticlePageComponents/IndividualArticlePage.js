import React, { Component } from 'react';
import * as api from '../../api';
import { Link, navigate } from '@reach/router';
import Votes from '../Votes';
import CommentsList from './CommentsList';
import ErrorComponent from '../ErrorComponent';

class IndividualArticlePage extends Component {
  state = {
    article: null,
    isLoading: true,
    showComments: false,
    error: null,
    disableDelete: null
  }

  render() {
    const { isLoading, article, showComments, error, disableDelete } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    const { author, body, comment_count, created_at, title, topic, votes, article_id } = article;
    const { user } = this.props;
    return (
      <article className="articles">
        <Votes votes={votes} id={article_id} target="articles" />
        <Link to={`/topics/${topic}`}><p>{topic}</p></Link>
        <h1>{title}</h1>
        <p>Created at: {created_at}</p>
        <Link to={`/users/${author}`}><p>created by: {author}</p></Link>
        <p>{body}</p>
        <p>comments: {comment_count}</p>
        {user === author && <button disabled={disableDelete} onClick={this.handleArticleDelete}>delete article</button>}
        <input type="button" onClick={this.toggleComments} value={showComments ? "hide comments" : "show comments"} />
        {showComments && <CommentsList article_id={article_id} user={user} />}
      </article>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  toggleComments = () => {
    this.setState(({ showComments }) => ({
      showComments: !showComments
    }))
  }

  handleArticleDelete = () => {
    const { article_id, location: { state: { prevPath } } } = this.props;
    this.setState({ disableDelete: true }, () => {
      api.deleteArticle(article_id)
        .then(() => {
          navigate(prevPath, { state: { articleDeleted: article_id } });
        })
        .catch(({ response: { data: { message }, status } }) => {
          this.setState({
            error: { message, status },
          })
        })
    })
  }

  fetchArticle() {
    api.getData(`articles/${this.props.article_id}`)
      .then(({ article }) => {
        this.setState({ article, isLoading: false })
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default IndividualArticlePage;