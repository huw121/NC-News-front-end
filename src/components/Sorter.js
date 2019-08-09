import React from 'react';
import styles from './Sorter.module.css';

const Sorter = ({updateQueries, includeCommentCount}) => {
  return (
    <div className={styles.sorter}>
      <label htmlFor="sort_by">
        Sort by:
      </label>
        <select name="sort_by" onChange={updateQueries}>
          <option value="votes">Votes</option>
          <option value="created_at">Created at</option>
          {includeCommentCount && <option value="comment_count">Comment Count</option>}
        </select>
      <label htmlFor="order">
        Order:
      </label>
        <select name="order" onChange={updateQueries}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
    </div>
  );
};

export default Sorter;