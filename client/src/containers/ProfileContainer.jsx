import React, { Component } from 'react';
import Profile from '../components/Profile.jsx';
import Meteor, { createContainer } from 'react-meteor-client';


class ProfileService extends Component {

  constructor(props) {
    super(props);
    this.state = {
      instagram: [],
      twitter: [],
      facebook: []
    }
  }

  setNumberOfFollowers() {
    ///////////////////////////////////////////////////
    //Meteor methods get connections in Social Network:
    ///////////////////////////////////////////////////

    let user = this.props.profileUser;

    if(typeof user.services.instagram !== 'undefined')
      Meteor.call('getInstagramFollowedByList', (e, response) => {
        if (!e) {
          console.log('OK!');
          this.setState({
            instagram: response
          });
        }
        else console.log(e);
      });

    if(typeof user.services.twitter !== 'undefined')
      Meteor.call('getTwitterFollowersList', (e, response) => {
        if (!e) {
          console.log('OK!');
          this.setState({
            twitter: response
          })
        }
        else console.log(e);
      });

    if(typeof user.services.facebook !== 'undefined')
      Meteor.call('getFacebookFriendsList', (e, response) => {
        if (!e) {
          console.log('OK!');
          this.setState({
            facebook: response
          })
        }
        else console.log(e);
      });
  }

  componentDidMount() {
    this.setNumberOfFollowers();
  }

  componentDidUpdate() {
    this.setNumberOfFollowers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const arePropsTheSame = JSON.stringify(this.props) === JSON.stringify(nextProps);
    const isStateTheSame = JSON.stringify(this.state) === JSON.stringify(nextState);

    if(arePropsTheSame && isStateTheSame) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    return (<Profile {...this.props}
      instagram={this.state.instagram}
      twitter={this.state.twitter}
      facebook={this.state.facebook} />);
    }
  }

  let container = (props) => {
    var handleRelationships = Meteor.subscribe("relationships");
    var handleUsers = Meteor.subscribe("users");

    let { currentUser, match } = props;
    let { userId } = match.params;

    return {
      currentUser: currentUser,
      profileUser: (userId) ? Meteor.collection('users').findOne(userId) : currentUser,
      loading: !handleRelationships.ready() || !handleUsers.ready(),
      relationships: Meteor.collection('relationships').find({}),
      statusRelationship: (userId) ? Meteor.collection('relationships').findOne(
        {
          $and:
          [
            {'follower': currentUser._id},
            {'followed': userId}
          ]
        }
      ): undefined
    };
  };

  export default ProfileContainer = createContainer(container, ProfileService);
