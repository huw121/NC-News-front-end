import React, { Component } from 'react';
import * as api from '../../api';

class IndividualArticlePage extends Component {
  state = {
    article: null
  }

  render() {
    return (
      <div>
        <h1>hey</h1>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    api.getData(`articles/${this.props.article_id}`)
      .then(({ article }) => {
        this.setState({ article })
      })
  }
}

export default IndividualArticlePage;