import Meteor, { createContainer } from 'react-meteor-client';
import Main from '../components/Main.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

let container = () => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("users");

  return {
    currentUser: Meteor.user(),
    loading: !handle.ready()
  };
};

export const MainContainer = createContainer(container, Main);
