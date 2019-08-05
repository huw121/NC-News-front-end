import React from 'react';

const Sorter = (props) => {
  return (
    <>
      <label>
        Sort by:
        <select name="sort_by" onChange={props.updateQueries}>
          <option value="votes">Votes</option>
          <option value="created_at">Created at</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </label>
      <label>
        Order:
        <select name="order" onChange={props.updateQueries}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </>
  );
};

export default Sorter;