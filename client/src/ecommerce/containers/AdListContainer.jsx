import Meteor, { createContainer } from  'react-meteor-client';
import AdList from '../components/AdList.jsx';


let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var adsHandle = Meteor.subscribe("ads");
  var usersHandle = Meteor.subscribe("users");

  let ad;
  let sellerHandle = false;
  if (adsHandle.ready() && usersHandle.ready()) {

    ad = Meteor.collection('ad').find({})

    ad.map((adMap, i) => {
      adMap.seller = Meteor.collection('users').findOne(adMap.seller_id)
      if (ad.length - 1 == i) {
        sellerHandle = true;
      }
    })

  }
   console.log(ad)

  return {
    currentUser: props.currentUser,
    loading: !adsHandle.ready() || !usersHandle.ready(),
    ad: ad
  };
};

export default AdContainer = createContainer(container, AdList);
