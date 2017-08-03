import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';
import { BuyerInfo } from '../../../../api/buyer_info.js';
import CreditCard from '../components/CreditCard.jsx';


let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handleBuyerInfo = Meteor.subscribe("buyer_info", props.currentUser._id);
  let data
  console.log(props.match.params, '<-- PROPS CARDS');
  
  if (handleBuyerInfo.ready()) {
    data = BuyerInfo.findOne({ '_user_id': props.currentUser._id })
  }

  return {
    currentUser: props.currentUser,
    loading: !(handleBuyerInfo.ready()),
    buyerInfo: data, 
    rev: false
  };
};

export default CardsContainer = createContainer(container, CreditCard);
