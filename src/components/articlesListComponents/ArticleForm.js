import React, { Component } from 'react';
import * as api from '../../api';

class ArticleForm extends Component {
  state = {
    topics: null,
    isLoading: true,
    body: '',
    title: '',
    topic: null,
  }
  render() {
    const { topics, body, title, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>
    return (
      <form onSubmit={this.postArticle}>
        <label>
          enter title:
          <input name="title" value={title} onChange={this.handleFormChange} required />
        </label>
        <label>
          enter body:
          <textarea name="body" onChange={this.handleFormChange} value={body} required></textarea>
        </label>
        <label>
          choose a topic:
          <select name="topic" onChange={this.handleFormChange} defaultValue=" -- select a topic -- ">
            <option disabled value=" -- select a topic -- "> -- select a topic -- </option>
            {topics.map(({ slug }) => (
              <option key={slug} >{slug}</option>
            ))}
          </select>
        </label>
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
      .then(({article}) => {
        addNewArticle(article);
      })
      .catch(err => { console.dir(err) })
  }

  fetchTopics = () => {
    api.getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
  }
}

export default ArticleForm;