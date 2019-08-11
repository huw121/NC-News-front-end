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
import * as api from './api';

class App extends Component {
  state = {
    user: 'jessjelly',
    topics: null,
    error: null,
    isLoading: true
  }

  render() {
    const { user, topics, error, isLoading } = this.state;
    if (error) return <ErrorComponent error={error} />
    if (isLoading) return <p>Loading...</p>
    return (
      <div className="App">
        <Header handleUserChange={this.handleUserChange} user={user} />
        <Sidebar handleNewTopics={this.handleNewTopics} topics={topics} />
        <Router>
          <ArticleList path="/" user={user} topics={topics}/>
          <ArticleList path="/articles" user={user} topics={topics} />
          <ArticleList path="/topics/:topic" user={user} topics={topics}/>
          <ArticleList path="/users/:author" user={user} topics={topics}/>
          <TopicsList path="/topics" handleNewTopics={this.handleNewTopics} topics={topics}/>
          <IndividualArticlePage path="/articles/:article_id" user={user} />
          <UserProfile path="/:username/profile" user={user} />
          <SignUpPage path="/signup" handleUserChange={this.handleUserChange} />
          <ErrorComponent default error={{ message: "route not found", status: 404 }} />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  handleUserChange = (user) => {
    this.setState({ user });
  }

  handleNewTopics = (topic) => {
    this.setState(({topics}) => ({
      topics: [topic, ...topics] 
    }))
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

export default App;
