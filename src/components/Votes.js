import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    voteIncrement: 0
  }
  render() {
    const { voteIncrement, error } = this.state;
    return (
      <div>
        {error && <p>oops! something went wrong...</p>}
        <button onClick={() => { this.changeVote(1) }} disabled={voteIncrement > 0}>upvote</button>
        <p>votes: {this.props.votes + this.state.voteIncrement}</p>
        <button onClick={() => { this.changeVote(-1) }} disabled={voteIncrement < 0}>downvote</button>
      </div>
    );
  }

  changeVote = (val) => {
    this.setState(({ voteIncrement }) => ({
      voteIncrement: voteIncrement += val
    }));
    api.changeVote(this.props.target, this.props.id, val)
      .catch(() => {
        this.setState(({ voteIncrement }) => ({
          voteIncrement: voteIncrement -= val,
          error: true
        }))
      })
  }
}

export default Votes;
