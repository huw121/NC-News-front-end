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
import ErrorComponent from './components/ErrorComponent';

class App extends Component {
  state = {
    user: 'jessjelly',
    newTopics: false
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header handleUserChange={this.handleUserChange} user={user} />
        <Sidebar handleNewTopics={this.handleNewTopics} newTopics={this.state.newTopics} />
        <Router>
          <ArticleList path="/" user={user} />
          <ArticleList path="/articles" user={user} />
          <ArticleList path="/topics/:topic" user={user} />
          <ArticleList path="/users/:author" user={user} />
          <TopicsList path="/topics" handleNewTopics={this.handleNewTopics}/>
          <IndividualArticlePage path="/articles/:article_id" user={user} />
          <UserProfile path="/:username/profile" />
          <SignUpPage path="/signup" handleUserChange={this.handleUserChange} />
          <ErrorComponent default error={{ message: "route not found", status: 404 }} />
        </Router>
      </div>
    );
  }

  handleUserChange = (user) => {
    this.setState({ user });
  }

  handleNewTopics = () => {
    this.setState(({newTopics}) => ({
      newTopics: !newTopics
    }))
  }
}

export default App;
