import React, { Component } from 'react';
import * as api from '../../api';
import ErrorComponent from '../ErrorComponent';
import styles from './ArticleForm.module.css';
import LoaderSpinner from '../Loader';

class ArticleForm extends Component {
  state = {
    body: '',
    title: '',
    topic: null,
    error: null,
    isLoading: false
  }
  render() {
    const { body, title, error, isLoading } = this.state;
    const { topics } = this.props;
    if (error) return <ErrorComponent error={error} />
    return (
      <form onSubmit={this.postArticle} className={styles.articleForm}>
        <label htmlFor="topic">
          choose a topic:
        </label>
        <select name="topic" onChange={this.handleFormChange} defaultValue="" required>
          <option disabled value=""> -- select a topic -- </option>
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
        {isLoading ? <LoaderSpinner /> : <button type="submit">Post Article</button>}
      </form>
    );
  }

  handleFormChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }

  postArticle = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }, () => {
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
    })
  }
}

export default ArticleForm;