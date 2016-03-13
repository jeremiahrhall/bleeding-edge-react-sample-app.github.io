import React from 'react';
import {shallow, mount, render} from 'enzyme';

import Comments from '../Comments';
import Comment from '../Comment';

jest.unmock('../Comments');
jest.unmock('../Comment');

describe('molecules/Comments', () => {
  it('<Comments comments={comments}/>', () => {
    let comments = [{
        id: 1,
        replies: [],
        score: 1,
        score_hidden: 0,
        body: "Test Driven Development, yeah!",
        author: "Jeremiah Hall"
    }, {
        id: 2,
        score: 0.5,
        score_hidden: 0.25,
        body: "React is great!",
        author: "Jeremiah Hall"
    }];

    let wrapper = shallow(<Comments comments={comments} />);
    let childComments = wrapper.find(Comment);

    expect(childComments.length).toEqual(comments.length);
    expect(childComments.at(0).prop('comment')).toEqual(comments[0]);
    expect(childComments.at(1).prop('comment')).toEqual(comments[1]);
  });
});
