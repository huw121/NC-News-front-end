import Loader from 'react-loader-spinner'
import React from 'react';
import styles from './LoaderSpinner.module.css';

const LoaderSpinner = () => {

  return (
    <div class={styles.loader}>
      <Loader type="TailSpin" color="#0b3c5d" height={80} width={80} />
    </div>
  );

}

export default LoaderSpinner;