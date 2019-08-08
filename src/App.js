import React, { Component } from 'react';
import './App.css';
import Header from './components/HeaderComponents/Header';
import ArticleList from './components/articlesListComponents/ArticleList';
import Sidebar from './components/Sidebar';
import { Router } from '@reach/router';
import TopicsList from './components/topicsComponents/TopicsList';
import IndividualArticlePage from './components/individualArticlePageComponents/IndividualArticlePage';
import UserProfile from './components/UserProfile';

class App extends Component {
  state = {
    user: 'jessjelly'
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header handleUserChange={this.handleUserChange} user={user} />
        <Sidebar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/articles" />
          <TopicsList path="/topics" />
          <ArticleList path="/topics/:topic" />
          <ArticleList path="/users/:author" />
          <IndividualArticlePage path="/articles/:article_id" user={user} />
          <UserProfile path="/:username/profile" />
        </Router>
      </div>
    );
  }

  handleUserChange = ({ target: { value: user } }) => {
    this.setState({ user });
  }
}

export default App;
