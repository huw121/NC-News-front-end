import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './ArticleForm.module.css';

class ArticleForm extends Component {
  state = {
    topics: null,
    isLoading: true,
    body: '',
    title: '',
    topic: null,
    error: null
  }
  render() {
    const { topics, body, title, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.postArticle} className={styles.articleForm}>
        <label htmlFor="topic">
          choose a topic:
        </label>
        <select name="topic" onChange={this.handleFormChange} defaultValue=" -- select a topic -- ">
          <option disabled value=" -- select a topic -- "> -- select a topic -- </option>
          {topics.map(({ slug }) => (
            <option key={slug} >{slug}</option>
          ))}
        </select>
        <label htmlFor="title">
        enter title:
        </label>
          <input name="title" value={title} onChange={this.handleFormChange} required />
        <label htmlFor="body">
        enter body:
        </label>
          <textarea name="body" onChange={this.handleFormChange} value={body} required></textarea>
        <button type="submit">post article</button>
      </form>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  postArticle = (e) => {
    e.preventDefault();
    const { body, title, topic } = this.state;
    const { user: author, addNewArticle } = this.props;
    api.postArticle({ body, title, topic, author })
      .then(article => {
        addNewArticle(article);
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
        })
      })
  }

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response: { data: { message }, status } }) => {
        this.setState({
          error: { message, status },
          isLoading: false
        })
      })
  }
}

export default ArticleForm;