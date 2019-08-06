import React, { Component } from 'react';
import * as api from '../../api';
import CommentCard from './CommentCard';
import Sorter from '../articlesListComponents/Sorter';

class Comments extends Component {
  state = {
    comments: null,
    isLoading: true,
    page: 1,
    maxPage: 1,
    queries: {
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { comments, isLoading, page } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <section>
        <Sorter updateQueries={this.updateQueries} includeCommentCount={false} />
        <button name="down" onClick={this.handlePagination}>&lt;</button>
        <p>Page {page}</p>
        <button name="up" onClick={this.handlePagination}>&gt;</button>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} />
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchComments(1)
  }

  componentDidUpdate(prevProps, { queries }) {
    let check = false;
    for (let prop in queries) {
      if (this.state.queries[prop] !== queries[prop]) check = true;
    }
    if (check) this.fetchComments(1);
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
    if (name === "up" && p + 1 <= pMax) this.fetchComments(p + 1);
    if (name === "down" && p - 1 >= 1) this.fetchComments(p - 1);
  }

  fetchComments = (p) => {
    api.getData(`articles/${this.props.article_id}/comments`, { ...this.state.queries, p })
      .then(({ comments, totalCount }) => {
        this.setState({ comments, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 10) });
      })
  }
}

export default Comments;