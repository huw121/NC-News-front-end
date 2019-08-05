import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  state = {
    articles: null,
    isLoading: true
  }
  render() {
    const { isLoading, articles } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section className="articles">
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article}/>
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api.getData('articles', { sort_by: 'votes' })
      .then(({ articles }) => {
        this.setState({ articles, isLoading: false });
      })
  }
}

export default ArticleList;