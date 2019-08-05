import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import Sorter from './Sorter';

class ArticleList extends Component {
  state = {
    page: 1,
    articles: null,
    isLoading: true,
    queries: {
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { isLoading, articles, page } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
        <Sorter updateQueries={this.updateQueries} />
        <button onClick={() => { this.fetchArticles(page - 1) }}>&lt;</button>
        <p>Page {page}</p>
        <button onClick={() => { this.fetchArticles(page + 1) }}>&gt;</button>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />
        })}
      </section>
    );
  }

  componentDidUpdate(prevProps, {queries: {sort_by, order}}) {
    const {sort_by: newSort, order: newOrder} = this.state.queries;
    if(newSort !== sort_by || newOrder !== order) this.fetchArticles(1);
  }

  componentDidMount() {
    this.fetchArticles(1);
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
    api.getData('articles', { ...this.state.queries, p })
      .then(({ articles }) => {
        if (articles.length) this.setState({ articles, isLoading: false, page: p });
      })
  }
}

export default ArticleList;