import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import MyAds from '../components/MyAds.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad';
import { Helpers } from '../../helpers/Helpers.jsx';

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  let handleAds = Meteor.subscribe('my-ads', props.currentUser._id);
  let myAds;
  if (handleAds.ready()) {
    myAds = Ad.find().fetch();
  }
  myAds = Ad.find({}).fetch();
  console.log (myAds)
  return {
    currentUser: props.currentUser,
    loadingAds: !handleAds.ready(),
    myAds: myAds
  }
}
export default MyAdsContainer = createContainer(container, MyAds);
