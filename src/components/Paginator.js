import React from 'react';

const Paginator = ({fetchMethod, p, pMax}) => {
  const handlePagination = ({ target: { name } }) => {
    if (name === "up" && p + 1 <= pMax) fetchMethod(p + 1);
    if (name === "down" && p - 1 >= 1) fetchMethod(p - 1);
  }

  return (
    <>
      <button name="down" onClick={handlePagination}>&lt;</button>
      <p>Page {p}</p>
      <button name="up" onClick={handlePagination}>&gt;</button>
    </>
  );
}

export default Paginator;