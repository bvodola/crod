import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import Search from '../components/Search.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad';
import { Helpers } from '../../helpers/Helpers.jsx';

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  //Checking what route was choose and subscribing according to it
  let handleAd = (props.match.params.type == 'ads' || props.match.params.type == 'all') ? Meteor.subscribe('ads'): undefined;
  let handleUsers = (props.match.params.type == 'users' || props.match.params.type == 'all') ? Meteor.subscribe('users'): undefined;
  let ads;
  let users;

  if(handleAd != undefined){
    if(handleAd.ready()){
      ads = Ad.find({'title': {$regex: props.match.params.word, $options: 'i'}}).fetch();
      console.log(ads)
    }
  }
  console.log(props.match.params.word)
  if(handleUsers != undefined){
    if(handleUsers.ready()){
      users = Meteor.users.find({'profile.name': {$regex: props.match.params.word, $options: 'i'}}).fetch();
      console.log(users)
    }
  }

  return {
    currentUser: props.currentUser,
    ads: ads,
    users: users,
    route: (props.match.params.type == 'all') ? 0 : (props.match.params.type == 'users') ? 1 : 2,
  }
}
export default MyAdsContainer = createContainer(container, Search);
