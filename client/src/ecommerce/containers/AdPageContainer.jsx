import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';
import { Ad } from '../../../../api/ad.js';
import Product from '../components/Product.jsx';


let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("ads");
  let seller;
  let ad = Ad.findOne({ '_id': props.match.params.adId });
  if (handle.ready()) {
    seller = Meteor.users.findOne(ad.seller_id)
  }

  return {
    currentUser: props.match.params.currentUser,
    loading: !handle.ready(),
    ad: Ad.findOne({ '_id': props.match.params.adId }),
    seller: seller,
    rev: false,
    qty: 1,
    paymentMethod: function () { },
  };
};

export default AdPageContainer = createContainer(container, Product);
