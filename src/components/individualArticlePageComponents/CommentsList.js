import React, { Component } from 'react';
import * as api from '../../api';
import CommentCard from './CommentCard';
import Sorter from '../Sorter';
import Paginator from '../Paginator';
import CommentForm from './CommentForm';
import ErrorComponent from '../ErrorComponent';
import styles from '../articlesListComponents/ArticleList.module.css';
import LoaderSpinner from '../Loader';

class CommentsList extends Component {
  state = {
    comments: null,
    isLoading: true,
    error: null,
    showForm: false,
    deletedComment: null,
    page: 1,
    maxPage: 1,
    queries: {
      limit: 5,
      order: 'desc',
      sort_by: 'votes'
    }
  }

  render() {
    const { comments, isLoading, page, maxPage, showForm, deletedComment, error } = this.state;
    const { article_id, user } = this.props;
    if (error) return <ErrorComponent error={error} />
    return (
      <section className={`articles ${styles.articleList}`}>
        <input type="button" onClick={this.toggleForm} value={showForm ? "Hide Form" : "Post Comment"} className={styles.postButton} />
        {showForm && <CommentForm addNewComment={this.addNewComment} id={article_id} user={user} />}
        <Sorter updateQueries={this.updateQueries} includeCommentCount={false} />
        <Paginator fetchMethod={this.fetchComments} p={page} pMax={maxPage} />
        {deletedComment === "success" && <p>comment successfully deleted!</p>}
        {deletedComment === "failed" && <p>oops! something went wrong...</p>}
        {isLoading && <LoaderSpinner />}
        {!isLoading && comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} user={user} commentDeletion={this.commentDeletion} />
        })}
      </section>
    );
  }

  componentDidMount() {
    this.fetchComments(1);
  }

  componentDidUpdate(prevProps, { queries }) {
    const { queries: newQueries } = this.state;
    let check = false;
    for (let prop in queries) {
      if (newQueries[prop] !== queries[prop]) check = true;
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

  toggleForm = () => {
    this.setState(currentState => ({
      showForm: !currentState.showForm
    }))
  }

  addNewComment = (comment) => {
    this.props.updateCommentCount(1);
    this.setState(({ comments }) => ({
      comments: [comment, ...comments],
      showForm: false,
      isLoading: false
    }))
  }

  commentDeletion = (id) => {
    if (id) this.props.updateCommentCount(-1);
    this.setState(({ comments }) => {
      if (!id) return { deletedComment: "failed" }
      return {
        comments: comments.filter(comment => comment.comment_id !== id),
        deletedComment: "success"
      }
    })
  }

  fetchComments = (p) => {
    api.getData(`articles/${this.props.article_id}/comments`, { ...this.state.queries, p })
      .then(({ comments, totalCount }) => {
        this.setState({ comments, isLoading: false, page: p, maxPage: Math.ceil(totalCount / 5), deletedComment: null });
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default CommentsList;