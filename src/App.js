import React, { Component } from 'react';
import './App.css';
import Header from './components/HeaderComponents/Header';
import ArticleList from './components/articlesListComponents/ArticleList';
import Sidebar from './components/Sidebar';
import { Router } from '@reach/router';
import TopicsList from './components/topicsComponents/TopicsList';
import IndividualArticlePage from './components/individualArticlePageComponents/IndividualArticlePage';
import UserProfile from './components/UserProfile';
import SignUpPage from './components/SignUpPage';

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
          <ArticleList path="/" user={user}/>
          <ArticleList path="/articles" user={user}/>
          <ArticleList path="/topics/:topic" user={user}/>
          <ArticleList path="/users/:author" user={user}/>
          <TopicsList path="/topics" />
          <IndividualArticlePage path="/articles/:article_id" user={user} />
          <UserProfile path="/:username/profile" />
          <SignUpPage path="/signup" handleUserChange={this.handleUserChange}/>
        </Router>
      </div>
    );
  }

  handleUserChange = (user) => {
    this.setState({ user });
  }
}

export default App;
