import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    voteIncrement: 0
  }
  render() {
    return (
      <div>
        <button onClick={() => { this.changeVote(1) }}>upvote</button>
        <p>votes: {this.props.votes + this.state.voteIncrement}</p>
        <button onClick={() => { this.changeVote(-1) }}>downvote</button>
      </div>
    );
  }

  changeVote = (val) => {
    this.setState(({ voteIncrement }) => ({
      voteIncrement: voteIncrement += val
    }));
    api.changeVote(this.props.target, this.props.id, val)
  }
}

export default Votes;
