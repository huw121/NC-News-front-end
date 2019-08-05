import React from 'react';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Sidebar from './components/Sidebar';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Router>
        <ArticleList path="/"/>
        <ArticleList path="/articles"/>
      </Router>
    </div>
  );
}

export default App;
