import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    votes: this.props.votes
  }
  render() {
    return (
      <div>
        <button onClick={() => { this.changeVote(1) }}>upvote</button>
        <p>votes: {this.state.votes}</p>
        <button onClick={() => { this.changeVote(-1) }}>downvote</button>
      </div>
    );
  }

  changeVote = (val) => {
    api.changeVote(this.props.target, this.props.id, val)
      .then(({ article: { votes } }) => {
        this.setState({ votes })
      })
  }
}

export default Votes;
