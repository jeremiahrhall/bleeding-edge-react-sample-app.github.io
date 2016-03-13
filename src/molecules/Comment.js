import React, {PropTypes} from 'react';
import Box from '../atoms/Box';
import Heading from '../atoms/Heading';
import Markdown from '../atoms/Markdown';
import Link from '../atoms/Link';
import {State} from '../utils/actions';

export default
class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    targetScore: PropTypes.number.isRequired
  };

  render(){
      let comment = this.props.comment;
      let targetScore = this.props.targetScore;
      let replies = comment.replies || [];
      return (
        <Box
          key={comment.id}
          padding="0.5em"
          margin="0.5em"
          style={{
            background: comment.score >= targetScore ? '#ffffaa' : '#efefef'
          }}
        >
          <Box direction="row">
            <Heading level="title">{comment.score_hidden ? '?' : comment.score}</Heading>
            <Box margin={{right: "1em"}} />
            <Box style={{maxWidth: '80em', lineHeight: '1.5'}}>
              <Markdown content={comment.body} />
            </Box>
          </Box>
          <Box margin={{top: '0.5em'}} direction="row">
            <span>
              by <Link to={`/user/${comment.author}`}>{comment.author}</Link>
            </span>
            <Box
              id="replyBox"
              margin="0 1em"
              onClick={() => {
                State.setEditing({
                  type: 'comment',
                  id: comment.id,
                })
              }}
              style={{cursor: 'pointer'}}
            >
              Reply
            </Box>
          </Box>
          {replies.map((reply) => <Comment comment={reply} targetScore={targetScore} />)}
        </Box>
      );
  }
}
