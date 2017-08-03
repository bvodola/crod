import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import Order from '../components/Order.jsx';
import { OrdersCollection } from '../../../../api/orders.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad';
import { PaymentInfo } from '../../../../api/payment_info';
import { Helpers } from '../../helpers/Helpers.jsx';

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const { user_type, orderId } = props.match.params

  var handleOrders = Meteor.subscribe("order", orderId);
  let order, ad, payment_info

  //Fazer uma logica para buscar pelo userID e pelo OrderID na collection Payment_info vlw flw!
  
  if (handleOrders.ready()) {
    order = OrdersCollection.findOne({ '_id': orderId });
    var handleAd = Meteor.subscribe("ad", order.ads[0]._id);
    var handlePaymentInfo = Meteor.subscribe("payment_info", orderId, order.buyer_id);
    if (handleAd.ready() && handlePaymentInfo.ready()) {
      payment_info = PaymentInfo.findOne({ $and: [ {'order_id': orderId}, { 'userId': order.buyer_id } ] } )
      ad = Ad.findOne({ '_id': order.ads[0]._id })
    }
  }



  return {
    currentUser: props.currentUser,
    loading: !handleOrders.ready() ||  !handleAd.ready() || !handlePaymentInfo.ready(),
    order: order,
    ad: ad,
    payment: payment_info,
    seller: Meteor.users.findOne(Helpers.get(order, 'seller_id')),
    user_type: user_type
  };
};

export default OrdersContainer = createContainer(container, Order);
