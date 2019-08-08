import React from 'react';

const ErrorComponent = ({error: {status, message}}) => {
  return (
    <h1>Oh no somthing went wrong! {status} {message}</h1>
  );
};

export default ErrorComponent;