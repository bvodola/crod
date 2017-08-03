import Meteor, { createContainer } from 'react-meteor-client';
import App from '../App.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

let container = () => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handleUsers = Meteor.subscribe("users");
  var handleRelationships = Meteor.subscribe("relationships");

  return {
    currentUser: Meteor.user(),
    loadingUsers: !handleUsers.ready(),
    loadingRelationships: !handleRelationships.ready()
  };
};

export const AppContainer = createContainer(container, App);
