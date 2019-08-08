import React, { Component } from 'react';
import * as api from '../../api';
import ArticleCard from './ArticleCard';
import Sorter from '../Sorter';
import Paginator from '../Paginator';
import ArticleForm from './ArticleForm';
import ErrorComponent from '../ErrorComponent';

class ArticleList extends Component {
  state = {
    page: 1,
    maxPage: 1,
    articles: null,
    isLoading: true,
    showForm: false,
    error: null,
    queries: {
      limit: 5,
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { isLoading, articles, page, maxPage, showForm, error } = this.state;
    const { location: { state: locationState }, user } = this.props;
    const articleDeleted = locationState ? locationState.articleDeleted : null;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    return (
      <section className="articles">
        {articleDeleted && <p>article successfully deleted!</p>}
        <input type="button" onClick={this.toggleForm} value={showForm ? "hide form" : "post article"} />
        {showForm
          ? <ArticleForm user={user} addNewArticle={this.addNewArticle} />
          : (
            <>
              <Sorter updateQueries={this.updateQueries} includeCommentCount={true} />
              <Paginator fetchMethod={this.fetchArticles} p={page} pMax={maxPage} />
              {articles.map(article => {
                return <ArticleCard key={article.article_id} {...article} path={this.props.uri} />
              })}
            </>
          )
        }
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles(1);
  }

  componentDidUpdate(prevProps, { queries }) {
    let check = false;
    for (let prop in queries) {
      if (this.state.queries[prop] !== queries[prop]) check = true;
    }
    const { location: { state: locationState }, topic, author } = this.props;
    if (topic !== prevProps.topic || author !== prevProps.author) check = true;
    if (check) this.fetchArticles(1)
    if (locationState) this.articleDeletion(locationState.articleDeleted);
  }

  toggleForm = () => {
    this.setState(currentState => ({
      showForm: !currentState.showForm
    }))
  }

  addNewArticle = (article) => {
    this.setState(({ articles }) => ({
      articles: [article, ...articles],
      showForm: false
    }))
  }

  updateQueries = ({ target: { value, name } }) => {
    this.setState(currentState => ({
      queries: {
        ...currentState.queries,
        [name]: value
      }
    }))
  }

  articleDeletion = (id) => {
    if (this.state.articles.some(({ article_id }) => article_id === +id)) {
      this.setState(({ articles }) => ({
        articles: articles.filter(article => article.article_id !== +id),
      }))
    }
  }

  fetchArticles = (p) => {
    const { topic, author } = this.props;
    api.getData('articles', { ...this.state.queries, p, topic, author })
      .then(({ articles, totalCount }) => {
        this.setState({ articles, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 5) });
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default ArticleList;