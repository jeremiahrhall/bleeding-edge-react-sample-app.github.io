import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {State} from '../../utils/actions';
import Comment from '../Comment';
jest.unmock('../Comment');

describe('molecules/Comment', () => {
  let comment = {
    id: 1,
    replies: [],
    score: 1,
    score_hidden: 1,
    body: "Test Driven Development, yeah!",
    author: "Jeremiah Hall"
  };

  it('<Comment comment={comment}/>', () => {
    let wrapper = render(<Comment comment={comment} targetScore={1} />);
    expect(wrapper.text()).toContain(comment.body);
    expect(wrapper.text()).toContain(comment.author);
  });

  it('should should call State.setEditing when the reply button is clicked', () => {
      let wrapper = mount(<Comment comment={comment} targetScore={1} />);
      let replyBox = wrapper.find('#replyBox');
      State.setEditing = jest.fn();
      replyBox.simulate('click');
      expect(State.setEditing).toBeCalledWith({
        type: 'comment',
        id: comment.id,
      });
  });
});
