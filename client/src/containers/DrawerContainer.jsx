import Meteor, { createContainer } from 'react-meteor-client';
import MainDrawer from '../components/Drawer.jsx';
import Profile from '../components/Profile.jsx'

/*
- This function receives the information by server and pass to the presentation component
*/

export default DrawerContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");

  return {
    loading: !handle.ready(),
    currentUser: Meteor.user(),
  };
}, MainDrawer);
