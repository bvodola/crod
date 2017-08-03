import Meteor, { createContainer } from 'react-meteor-client';
import AppBar from '../components/AppBar.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handleAds = Meteor.subscribe("ads");
  let ads;

  if(handleAds.ready()){
    ads = Meteor.collection('ad').find({});
  }

  return {
    handleDrawerState : props.handleDrawerState,
    screenWidth : props.screenWidth,
    handleTogglePlayer : props.handleTogglePlayer,
    currentUser : props.currentUser,
    loadingAds: !handleAds.ready(),
    ads: ads
  };
};

export default AppContainer = createContainer(container, AppBar);
