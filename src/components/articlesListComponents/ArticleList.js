import React, { Component } from 'react';
import * as api from '../../api';
import ArticleCard from './ArticleCard';
import Sorter from './Sorter';

class ArticleList extends Component {
  state = {
    page: 1,
    maxPage: 1,
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
        <Sorter updateQueries={this.updateQueries} includeCommentCount={true}/>
        <button name="down" onClick={this.handlePagination}>&lt;</button>
        <p>Page {page}</p>
        <button name="up" onClick={this.handlePagination}>&gt;</button>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />
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

  handlePagination = ({ target: { name } }) => {
    const p = this.state.page;
    const pMax = this.state.maxPage;
    if (name === "up" && p + 1 <= pMax) this.fetchArticles(p + 1);
    if (name === "down" && p - 1 >= 1) this.fetchArticles(p - 1);
  }

  fetchArticles = (p) => {
    const { topic, author } = this.props;
    api.getData('articles', { ...this.state.queries, p, topic, author })
      .then(({ articles, totalCount }) => {
        this.setState({ articles, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 10) });
      })
  }
}

export default ArticleList;