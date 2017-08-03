import React, { Component } from 'react';
import FloatingChat from '../components/FloatingChat.jsx';
import Meteor, { createContainer } from 'react-meteor-client';
import { Messages } from '../../../api/messages';

let container = (props) => {

  let currentUser = props.currentUser;
  let interlocutor = props.interlocutor;
  let handleMessages = Meteor.subscribe("messages");
  let conversation;

  if(handleMessages.ready()){

    //Getting the Sent messages
    conversation = Meteor.collection('messages').find({
      $and: [
        {$or: [{owner: currentUser._id}, {owner: interlocutor._id}]},
        {$or: [{owner: interlocutor._id}, {owner: currentUser._id}]},
      ]
    });

    conversation.sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });

    console.log('CONVERSATION', conversation)

  }

  return {
    currentUser: currentUser,
    interlocutor: interlocutor,
    loading: !handleMessages.ready(),
    conversation: conversation
  };
};

export default ChatContainer = createContainer(container, FloatingChat);
