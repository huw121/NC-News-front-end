import React, { Component } from 'react';
import * as api from '../../api';
import CommentCard from './CommentCard';
import Sorter from '../Sorter';
import Paginator from '../Paginator';
import CommentForm from './CommentForm';

class CommentsList extends Component {
  state = {
    comments: null,
    isLoading: false,
    showComments: false,
    showForm: false,
    deletedComment: null,
    page: 1,
    maxPage: 1,
    queries: {
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { comments, isLoading, page, showComments, maxPage, showForm, deletedComment } = this.state;
    const { article_id, user } = this.props;
    return (
      <section>
        <input type="button" onClick={this.toggleComments} value={showComments ? "hide comments" : "show comments"} />
        {showComments && (
          <>
            <input type="button" onClick={this.toggleForm} value={showForm ? "hide form" : "post comment"} />
            {showForm && <CommentForm addNewComment={this.addNewComment} id={article_id} user={user} />}
            <Sorter updateQueries={this.updateQueries} includeCommentCount={false} />
            <Paginator fetchMethod={this.fetchComments} p={page} pMax={maxPage} />
            {deletedComment && <p>comment {deletedComment} successfully deleted!</p>}
            {!isLoading && comments.map(comment => {
              return <CommentCard key={comment.comment_id} {...comment} user={user} commentDeletion={this.commentDeletion}/>
            })}
          </>
        )
        }
      </section>
    );
  }

  componentDidUpdate(prevProps, { queries, showComments }) {
    const { queries: newQueries, showComments: newShowComments } = this.state;
    let check = false;
    for (let prop in queries) {
      if (newQueries[prop] !== queries[prop]) check = true;
    }
    if (newShowComments && newShowComments !== showComments) check = true;
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

  toggleComments = () => {
    this.setState(({ showComments }) => ({
      showComments: !showComments,
      isLoading: !showComments ? true : false
    }))
  }

  toggleForm = () => {
    this.setState(currentState => ({
      showForm: !currentState.showForm
    }))
  }

  addNewComment = (comment) => {
    this.setState(({ comments }) => ({
      comments: [comment, ...comments],
      showForm: false
    }))
  }

  commentDeletion = (id) => {
    this.setState(({comments}) => ({
      comments: comments.filter(comment => comment.comment_id !== id),
      deletedComment: id
    }))
  }

  fetchComments = (p) => {
    this.setState({ isLoading: true }, () => {
      api.getData(`articles/${this.props.article_id}/comments`, { ...this.state.queries, })
        .then(({ comments, totalCount }) => {
          this.setState({ comments, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 10), deletedComment: null });
        })
    })
  }
}

export default CommentsList;