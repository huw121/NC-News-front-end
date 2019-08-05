import React from 'react';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/articlesComponents/ArticleList';
import Sidebar from './components/Sidebar';
import { Router } from '@reach/router';
import TopicsList from './components/topicsComponents/TopicsList';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Router>
        <ArticleList path="/"/>
        <ArticleList path="/articles"/>
        <TopicsList path = "/topics" />
      </Router>
    </div>
  );
}

export default App;
