import React from 'react';
import { Link } from '@reach/router';
import styles from './Sidebar.module.css';

const Sidebar = ({ topics }) => {
  return (
    <nav className="sidebar">
      <Link to="/topics"><button className={styles.sidebar}>All</button></Link>
      {topics.map(topic => {
        return <li key={topic.slug}><Link to={`topics/${topic.slug}`}><p className={styles.sidebar}>{topic.slug}</p></Link></li>
      })}
    </nav>
  );
}

export default Sidebar;