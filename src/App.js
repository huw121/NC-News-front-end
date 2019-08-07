import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/articlesListComponents/ArticleList';
import Sidebar from './components/Sidebar';
import { Router } from '@reach/router';
import TopicsList from './components/topicsComponents/TopicsList';
import IndividualArticlePage from './components/individualArticlePageComponents/IndividualArticlePage';

class App extends Component {
  state = {
    user: 'jessjelly'
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/articles" />
          <TopicsList path="/topics" />
          <ArticleList path="/topics/:topic" />
          <ArticleList path="/users/:author" />
          <IndividualArticlePage path="/articles/:article_id" user={user} />
        </Router>
      </div>
    );
  }
}

export default App;
