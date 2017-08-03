import Meteor, { createContainer } from 'react-meteor-client';
import Dashboard from '../components/Dashboard.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

let container = (props) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handleUsers = Meteor.subscribe("users-my-affiliates", props.currentUser._id);
  let myAffiliates = [];

if(handleUsers.ready()){
    myAffiliates = Meteor.collection('users').find({'affiliate._id': props.currentUser._id})
}
    console.log(myAffiliates, '<-- Props no container')

  return {
      myAffiliates: myAffiliates,
      loading: !handleUsers.ready()
  };
};

export default DashboardContainer = createContainer(container, Dashboard);
