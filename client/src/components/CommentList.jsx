import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import Comment from './Comment.jsx';

const CommentList = ({comments}) => {

    return (Array.isArray(comments)?
      <div className="feed">
          <div className="padded-full">
              {comments.map((comment, i) => (
                  <Comment comment={comment} key={i} />
              ))}
          </div>
      </div>
    :<div></div>);

}


export default CommentList;
