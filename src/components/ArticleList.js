import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  state = {
    page: 1,
    articles: null,
    isLoading: true,
    queries: {
      sort_by: 'votes'
    }
  }
  render() {
    const { isLoading, articles, page } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
        
        <button onClick={() => { this.fetchArticles(page - 1) }}>&lt;</button>
        <button onClick={() => { this.fetchArticles(page + 1) }}>&gt;</button>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles(1);
  }

  fetchArticles = (p) => {
    api.getData('articles', { ...this.state.queries, p })
      .then(({ articles }) => {
        if (articles.length) this.setState({ articles, isLoading: false, page: p });
      })
  }
}

export default ArticleList;