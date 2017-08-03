import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad.js';
import { BuyerInfo } from '../../../../api/buyer_info.js';
import Checkout from '../components/Checkout.jsx';


let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handleAds = Meteor.subscribe("ads");
  var handleBuyerInfo = Meteor.subscribe("buyer_info", props.currentUser._id);
  let data
  console.log(props.params);
  console.log(Ad.findOne({ '_id': props.match.params.adId }))
  if (handleBuyerInfo.ready()) {
    data = BuyerInfo.findOne({ '_user_id': props.currentUser._id })
  }

  return {
    currentUser: props.currentUser,
    loading: !(handleAds.ready() || handleBuyerInfo.ready()),
    ad: Ad.findOne({ '_id': props.match.params.adId }),
    buyerInfo: data
  };
};

export default CheckoutContainer = createContainer(container, Checkout);
