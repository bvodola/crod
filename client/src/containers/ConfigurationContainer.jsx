import Meteor, { createContainer } from 'react-meteor-client';
import AccountConfiguration from '../components/AccountConfiguration.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

export default ConfigurationContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");

  return {
    loading: !handle.ready(),
    currentUser: Meteor.user(),

  };
}, AccountConfiguration);
