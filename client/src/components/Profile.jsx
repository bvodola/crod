import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import FeedContainerProfile from '../containers/FeedContainerProfile.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';
import NewPost from './NewPost.jsx';
import i18n from 'meteor/universe:i18n';
import { Page, ContentBlock, Navbar, ListItem, Popup, Button } from 'framework7-react';
import { Relationships } from '../../../api/relationships.js';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FloatingChatContainer from '../containers/FloatingChatContainer.jsx';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const style = {
  coverWrapper: {
    overflow: 'hidden',
    width: 'auto',
    height: '250px',
    margin: '-25px -16px 0 -16px'
  }

}

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFriend: false,
      isFollower: false,
      statusRelationship: props.statusRelationship,
      buttons: false,
      floatChatActive: false,
      feedContainer: () => <FeedContainerProfile feedType="profile" currentUser={props.profileUser}/>
  };
}

componentDidMount() {
  Helpers.defineLanguage();
}

componentWillReceiveProps(nextProps) {
  console.log(nextProps)
  if(nextProps.profileUser._id !== this.props.profileUser._id){
    this.setState({
      feedContainer: () => <FeedContainerProfile feedType="profile" currentUser={nextProps.profileUser}/>,
  });
}

}

handleChat(event){
  this.setState({floatChatActive: !this.state.floatChatActive});
}

handleFollow(event){

  console.log('Status on the begin method',this.state.statusRelationship);
  console.log('stat', this.props.statusRelationship)

  //Inserting a relation request if there isn't relation
  if(!this.state.statusRelationship){

    console.log('Adding');

    Relationships.insert(
      {
        follower: this.props.currentUser._id,
        followed: this.props.profileUser._id,
      }
    );

    this.setState({statusRelationship : Relationships.findOne(
      {
        $and:
        [
          {'follower': this.props.currentUser._id},
          {'followed': this.props.profileUser._id}
        ]
      }
    )});

    //Remove request if there is a request made by myself
  }else if((this.state.statusRelationship &&
    Helpers.get(this.state.statusRelationship, 'follower') == this.props.currentUser._id)){

      //Syncronous Meteor call
      // We can just remove by id
      console.log('Removing');
      Relationships.remove({_id : this.state.statusRelationship._id});
      this.setState({statusRelationship: undefined});

    }

  }

  socialFriendsList(){
    let { profileUser } = this.props;
    console.log(profileUser);
    let services = Helpers.get(profileUser, 'permissions');
    let render = [];

    Object.keys(services).map((service, i) => {

      let followersName;

      switch(service) {
        case 'facebook':
        followersName = 'amigos';
        break;
        case 'twitter':
        followersName = 'seguidores'
        break;
        default:
        followersName = 'seguidores'
        break;
      }

      if(service !== 'google')
        render[i] = (
          <Chip key={i} style={{ display: 'inline-block', 'margin': '0 10px 10px 0'}}>
            <Avatar icon={Helpers.socialIcon(service, 2)} style={{backgroundColor: 'inherit', paddingLeft: '5px'}} />
            {this.props[service]} {followersName}
          </Chip>
        );
      });
      return render;
    }

    render() {

      let { currentUser, profileUser } = this.props;
      formattedDate = moment(Helpers.get(profileUser, 'profile.birthday')).calendar();
      let Feed = this.state.feedContainer;

      return (
        <div className="profile-component">
          <div className="card-header position-background">
            <div style={style.coverWrapper}>
              <img className="img-cover-responsive" src={Helpers.get(currentUser, 'profile.cover')} />
            </div>
        </div>
        <div className="position-profile-card card-content">
          <div className="div-align-imgProfile">
            <img className="img-profile " src={Helpers.get(profileUser, 'profile.image')} />
            <div className="div-name-profile"><b>{Helpers.get(profileUser, 'profile.name')} </b></div>
            <div className="card-content">
              <div className="card-content-inner">
                <p className="color-gray text-profile">Birthday: {formattedDate} </p>
              </div>
            </div>

            {(profileUser._id == currentUser._id) ? "":
                (this.state.statusRelationship ?
                  <RaisedButton
                    label="Following"
                    style={{margin: '10px'}}
                    onTouchTap={(event) => this.handleFollow(event)}
                    icon={<i className="fa fa-check" aria-hidden="true"></i>}
                  />:
                  <RaisedButton
                    label="Follow"
                    style={{margin: '10px'}}
                    onTouchTap={(event) => this.handleFollow(event)} />)
                  }

                  {(profileUser._id == currentUser._id) ? "":
                    <RaisedButton
                      icon={<CommunicationChatBubble/>}
                      label="Chat"
                      style={{margin: '10px'}}
                      onTouchTap={(event) => this.handleChat(event)} />}

                    </div>
                    <div style={{'margin': '20px 0'}}>
                      {this.socialFriendsList()}
                    </div>

                  </div>

                  <NewPost currentUser={profileUser}/>
                  <FeedContainerProfile
                    feedType="profile"
                    currentUser={profileUser}/>

                  {(this.state.floatChatActive) ?
                    <FloatingChatContainer
                      currentUser={currentUser}
                      interlocutor={profileUser}
                      handleChat={this.handleChat.bind(this)}
                      />
                    : ""}

                  </div>
                );
              }
            }

            export default Profile;
