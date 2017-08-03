import React, { Component } from 'react';
import Chat from '../components/Chat.jsx';
import { OrdersCollection } from '../../../api/orders.js';
import Meteor, { createContainer } from 'react-meteor-client';
import { Messages } from '../../../api/messages';
import { Relationships } from '../../../api/relationships';
import { PaymentInfo } from '../../../api/payment_info';
import { Helpers } from '../helpers/Helpers.jsx';

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  let currentUser = props.currentUser;
  let handleMessages = Meteor.subscribe("messages");
  let handleUsers = Meteor.subscribe('users');
  let handleRelatioships = Meteor.subscribe('my-relationships', currentUser._id);
  let followedUsers, messages, userFollowed, myRelationships, myRelationshipsIds;

  if(handleUsers.ready() && handleRelatioships.ready() && handleMessages.ready()){

    myRelationships = Relationships.find({}).fetch();

    myRelationshipsIds = myRelationships.map((value, index , array) =>
    {
      return value.followed;
    });

    //Defining the followed users
    followedUsers = Meteor.collection('users').find({
      _id:{
        $in: myRelationshipsIds
      }
    });

    //Getting the messages
    messages = Meteor.collection('messages').find({
      $or:[
				{
					owner: currentUser._id
				},
				{
					to: currentUser._id
				}
      ]
    });

  }

  return {
    currentUser: currentUser,
    loading: !handleMessages.ready() && !handleUsers.ready(),
    followedUsers: followedUsers,
    messages: messages
  };
};

export default ChatContainer = createContainer(container, Chat);
