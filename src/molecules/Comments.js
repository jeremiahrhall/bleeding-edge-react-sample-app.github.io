import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Heading from '../atoms/Heading';
import Link from '../atoms/Link';
import Markdown from '../atoms/Markdown';
import {State} from '../utils/actions';
import Comment from './Comment';

export default
class Comments extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    goodScoreThreshold: PropTypes.number,
  };

  getGoodScoreThreshold(){
    if (this.props.goodScoreThreshold) {
      return this.props.goodScoreThreshold;
    }

    // recursively get the comment scores
    const getScores = (comments) => {
      if (!comments) return [];

      var scores = comments
        .filter((x) => !x.score_hidden)
        .map((x) => [
          x.score,
          getScores(x.replies),
        ])
        .reduce((as, bs) => as.concat(bs), [])
      return scores;
    }
    var commentScores = getScores(this.props.comments)
      .sort((a, b) => a - b);

    // find a good threshold
    var goal = 0.6, good = 0;

    while (goal < 1 && good <= 3) {
      good = commentScores[Math.floor(commentScores.length * goal)];
      goal += 0.05;
    }
    return good > 3 ? good : Infinity;
  }

  render(){
    // find the average comment score
    var targetScore = this.getGoodScoreThreshold();

    return (
      <Box>
        {this.props.comments.map((comment) => <Comment key={comment.id} comment={comment} targetScore={targetScore} />)}
      </Box>
    );
  }
}
