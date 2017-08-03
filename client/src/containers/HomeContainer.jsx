import Meteor, { createContainer } from 'react-meteor-client';
import Home from '../components/Home.jsx';

let container = () => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("users");

  return {
    currentUser: Meteor.user(),
    loading: !handle.ready()
  };
};

export default HomeContainer = createContainer(container, Home);
