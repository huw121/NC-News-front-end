import React, { Component } from 'react';
import * as api from '../../api';
import ArticleCard from './ArticleCard';
import Sorter from '../Sorter';
import Paginator from '../Paginator';

class ArticleList extends Component {
  state = {
    page: 1,
    maxPage: 1,
    articles: null,
    isLoading: true,
    queries: {
      limit: 5,
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { isLoading, articles, page, maxPage } = this.state;
    const {location: {state: locationState}} = this.props;
    const articleDeleted = locationState ? locationState.articleDeleted : null;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
      {articleDeleted && <p>article successfully deleted!</p>}
        <Sorter updateQueries={this.updateQueries} includeCommentCount={true} />
        <Paginator fetchMethod={this.fetchArticles} p={page} pMax={maxPage} />
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} path={this.props.uri} />
        })}
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
    if (this.props.topic !== prevProps.topic || this.props.author !== prevProps.author) check = true;
    if (check) this.fetchArticles(1)
  }

  updateQueries = ({ target: { value, name } }) => {
    this.setState(currentState => ({
      queries: {
        ...currentState.queries,
        [name]: value
      }
    }))
  }

  fetchArticles = (p) => {
    const { topic, author } = this.props;
    api.getData('articles', { ...this.state.queries, p, topic, author })
      .then(({ articles, totalCount }) => {
        this.setState({ articles, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 5) });
      })
  }
}

export default ArticleList;