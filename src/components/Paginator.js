import React, { Component } from 'react';

class Paginator extends Component {
  render() {
    return (
      <>
        <button name="down" onClick={this.handlePagination}>&lt;</button>
        <p>Page {this.props.p}</p>
        <button name="up" onClick={this.handlePagination}>&gt;</button>
      </>
    );
  }

  handlePagination = ({ target: { name } }) => {
    const { p, pMax } = this.props;
    if (name === "up" && p + 1 <= pMax) this.props.fetchMethod(p + 1);
    if (name === "down" && p - 1 >= 1) this.props.fetchMethod(p - 1);
  }
}

export default Paginator;