import React from 'react';
import styles from './Paginator.module.css';

const Paginator = ({ fetchMethod, p, pMax }) => {
  return (
    <div className={styles.paginator}>
      <button disabled={p === 1} onClick={() => { fetchMethod(p - 1) }}>&lt; prev</button>
      <p>Page {p}</p>
      <button disabled={p + 1 > pMax} onClick={() => { fetchMethod(p + 1) }}>next &gt;</button>
    </div>
  );
}

export default Paginator;