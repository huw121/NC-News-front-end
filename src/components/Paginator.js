import React from 'react';

const Paginator = ({ fetchMethod, p, pMax }) => {
  return (
    <>
      <button disabled={p === 1} onClick={() => { fetchMethod(p - 1) }}>&lt; prev</button>
      <p>Page {p}</p>
      <button disabled={p + 1 > pMax} onClick={() => { fetchMethod(p + 1) }}>next &gt;</button>
    </>
  );
}

export default Paginator;