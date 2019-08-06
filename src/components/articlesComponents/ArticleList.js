import React, { Component } from 'react';
import * as api from '../../api';
import ArticleCard from './ArticleCard';
import Sorter from './Sorter';

class ArticleList extends Component {
  state = {
    page: 1,
    articles: null,
    isLoading: true,
    queries: {
      topic: null,
      author: null,
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
        <button onClick={() => { this.fetchArticles(page - 1 <= 0 ? 1 : page - 1) }}>&lt;</button>
        <p>Page {page}</p>
        <button onClick={() => { this.fetchArticles(page + 1) }}>&gt;</button>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />
        })}
      </section>
    );
  }

  componentDidUpdate(prevProps, { queries }) {
    let check = false;
    for (let prop in queries) {
      if (this.state.queries[prop] !== queries[prop]) { check = true; }
    }
    if (check) this.fetchArticles(1)
    else if (this.props.topic !== prevProps.topic) {
      this.updateTopicOrAuthor(); 
    }
  }

  componentDidMount() {
    if (this.props.topic) {
      this.updateTopicOrAuthor();
    }
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

  updateTopicOrAuthor = () => {
    this.setState(currentState => ({
      queries: { ...currentState.queries, topic: this.props.topic, author: this.props.author }
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