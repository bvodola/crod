import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import Orders from '../components/Orders.jsx';
import { OrdersCollection } from '../../../../api/orders.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad';
import { Helpers } from '../../helpers/Helpers.jsx';

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  let handleOrders, handleAds;
  let myOrders;
  let isBuyer;
  let myAds;

  // === Checking which route was used and defining the subscription type ===
  if (props.match.params.user_type == "buyer") {
    handleOrders = Meteor.subscribe("orders-buyer", props.currentUser._id);
    handleAds = Meteor.subscribe("ads");
    isBuyer = true;
  } if (props.match.params.user_type == "seller") {
    handleOrders = Meteor.subscribe("orders-seller", props.currentUser._id);
    handleAds = Meteor.subscribe("my-ads", props.currentUser._id);
    isBuyer = false
  }

  if (handleOrders.ready() && handleAds.ready()) {
    myOrders = OrdersCollection.find().fetch();
    console.log('MYORDERS', myOrders)
    myAds = Ad.find({}).fetch()
  }

  return {
    currentUser: props.currentUser,
    loadingOrders: !handleOrders.ready(),
    loadingAds: !handleAds.ready(),
    myOrders: myOrders,
    myAds: myAds,
    isBuyer: isBuyer,
    user_type: props.match.params.user_type
  };
};

export default OrdersContainer = createContainer(container, Orders);
