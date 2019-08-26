import React, { Component } from 'react';
import * as api from '../../api';
import ArticleCard from './ArticleCard';
import Sorter from '../Sorter';
import Paginator from '../Paginator';
import ArticleForm from './ArticleForm';
import ErrorComponent from '../ErrorComponent';
import styles from './ArticleList.module.css';
import LoaderSpinner from '../Loader';

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
    const { location: { state: locationState }, user, topics, topic, author } = this.props;
    const articleDeleted = locationState ? locationState.articleDeleted : null;
    if (error) return <ErrorComponent error={error} />
    return (
      <main className={`articles ${styles.articleList}`}>
        {articleDeleted && <p>article successfully deleted!</p>}
        <input className={styles.postButton} type="button" onClick={this.toggleForm} value={showForm ? "Hide Form" : "New Article"} />
        {showForm
          ? <ArticleForm user={user} topics={topics} addNewArticle={this.addNewArticle} />
          : (
            <>
              <h1>Articles: {author ? author : topic ? topic : ''}</h1>
              <div>
                <Sorter updateQueries={this.updateQueries} includeCommentCount={true} />
              </div>
              <div>
                <Paginator fetchMethod={this.fetchArticles} p={page} pMax={maxPage} />
              </div>
              {isLoading ? <LoaderSpinner /> : articles.map(article => {
                return <ArticleCard key={article.article_id} {...article} path={this.props.uri} />
              })}
            </>
          )
        }
      </main>
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
    const articleDeleted = locationState ? locationState.articleDeleted ? locationState.articleDeleted : null : null;
    if (articleDeleted) this.articleDeletion(articleDeleted);

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
    const { articles } = this.state;
    if (articles) {
      if (articles.some(({ article_id }) => article_id === +id)) {
        this.setState(({ articles }) => ({
          articles: articles.filter(article => article.article_id !== +id),
        }))
      }
    }
  }

  fetchArticles = (p) => {
    this.setState({ isLoading: true }, () => {
      const { topic, author } = this.props;
      api.getData('articles', { ...this.state.queries, p, topic, author })
        .then(({ articles, totalCount }) => {
          this.setState({ articles, showForm: false, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 5), error: null });
        })
        .catch(({ response: { data: { message }, status } }) => {
          this.setState({
            error: { message, status },
            isLoading: false
          })
        })
    })
  }
}

export default ArticleList;