import React from 'react';

const Sorter = ({updateQueries, includeCommentCount}) => {
  return (
    <>
      <label>
        Sort by:
        <select name="sort_by" onChange={updateQueries}>
          <option value="votes">Votes</option>
          <option value="created_at">Created at</option>
          {includeCommentCount && <option value="comment_count">Comment Count</option>}
        </select>
      </label>
      <label>
        Order:
        <select name="order" onChange={updateQueries}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </>
  );
};

export default Sorter;