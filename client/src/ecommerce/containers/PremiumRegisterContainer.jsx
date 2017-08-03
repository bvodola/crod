import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad.js';
import { BuyerInfo } from '../../../../api/buyer_info.js';
import PremiumRegister from '../components/PremiumRegister.jsx';


let container = (props) => {

  // var handleAds = Meteor.subscribe("ads");

  // var handleBuyerInfo = Meteor.subscribe("buyer_info", props.route.currentUser._id);
  // let data;

  // console.log(Ad.findOne({ '_id': props.params.adId }))
  // if (handleBuyerInfo.ready()) {
  //   data = BuyerInfo.findOne({ '_user_id': props.route.currentUser._id })

  return {
    currentUser: props.currentUser,
    // loading: !handleBuyerInfo.ready(),
    // ad: Ad.findOne({ '_id': props.params.adId }),
    // buyerInfo: data
  };
};

export default PremiumRegisterContainer = createContainer(container, PremiumRegister);
