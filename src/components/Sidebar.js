import React from 'react';
import { Link } from '@reach/router';
import styles from './Sidebar.module.css';

const Sidebar = ({ topics }) => {
  return (
    <nav className="sidebar">
      <li className={styles.sidebar}><Link to="/topics">all topics</Link></li>
      {topics.map(topic => {
        return <li key={topic.slug}><Link to={`topics/${topic.slug}`}><p className={styles.sidebar}>{topic.slug}</p></Link></li>
      })}
    </nav>
  );
}

export default Sidebar;