import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers.jsx';
import Meteor from  'react-meteor-client';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router';
import { Messages } from '../../../api/messages';
import Send from 'material-ui/svg-icons/content/send';
import Clear from 'material-ui/svg-icons/content/clear';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MessageUnit from './MessageUnit.jsx';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import FullscreenDialog from 'material-ui-fullscreen-dialog'

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const T = i18n.createComponent();

const styles = {
  box:{
    position: 'fixed',
    bottom: '0',
    height: '300px',
    backgroundColor: 'white',
    width: '250px',
    zIndex: '1000',
    right: '10%',
    border: 'solid 1px',
    borderColor: 'lightslategrey',
  },
  topBox: {
    position: 'fixed',
    height: '50px',
    backgroundColor: '#f5f5f5',
    width: '247px',
    marginTop: '-8px',
    zIndex: '100',
  },
  messagesBox:{
    marginTop: '34px',
    height: '200px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginBottom: '10px',
  },
  submit:{
    position: 'fixed',
    bottom: '0',
    paddingRight: '5px',
    paddingLeft: '5px',
    backgroundColor: 'white',
    width: '248px'
  }
}

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatUnit: false,
      interlocutor: props.interlocutor,
      message: '',
      conversation: props.conversation,
      messagesInDiv: null,
      buttonSendDisable: true,
      isMobile: (window.innerWidth <= 600) ? true:false
    };
  }

  componentDidMount() {
    Helpers.defineLanguage();
  }

  componentWillReceiveProps(nextProps) {

    let conversation = this.state.conversation;

    console.log('runned');
    console.log(nextProps.conversation)
    //First messages
    if(conversation){
      if(Helpers.get(conversation[conversation.length-1], 'timestamp') !=
      Helpers.get(nextProps.conversation[nextProps.conversation.length-1], 'timestamp')){
        this.setState({conversation: nextProps.conversation}, () => {
          this.renderMessages();
        });
      }
    }
    //Checking if there are new messages
    else{
      this.setState({conversation: nextProps.conversation}, () => {
        this.renderMessages();
      });
    }
  }




//============================
//=== Handle/change methods ==
//============================

setMessage(event){

  this.setState({
    message: event.target.value,
  });

  let regex = /\w/;

  if(regex.exec(event.target.value)){
    this.enableSendButton();
  }else{
    this.disableSendButton();
  }

};

enableSendButton(){

  this.setState({
    buttonSendDisable: false,
  });

}

disableSendButton(){

  this.setState({
    buttonSendDisable: true,
  });

}

//============================
//=== Actions methods ========
//============================

sendMessage(event){
  event.preventDefault();

  //Checking if there is letters
  let regex = /\w/;

  if(regex.exec(this.state.message)){

    let today = new Date();

    Messages.insert({
      'to':this.state.interlocutor._id,
      'owner': this.props.currentUser._id,
      'timestamp': today,
      'message': this.state.message
    });

    this.setState({message: ''});
    this.renderMessages();
  }else{
    alert('Digite alguma mensagem!');
    console.log('Necessário mensagem');
  }

}

scrollToBottom(){
  let node = ReactDOM.findDOMNode(this.refs.lastMessage);
  node.scrollIntoView({ behavior: "smooth" });
  console.log('Scrolled')

  // node = ReactDOM.findDOMNode(this.refs.textFieldSendMessage);
  // node.focus();
}

//============================
//=== Render methods =========
//============================

renderMessages(){

  let conversationToDiv = [];
  let conversation = this.state.conversation;

  for (let i = 0; i < Helpers.get(conversation, 'length'); i++) {

    let isMe = (Helpers.get(conversation[i], 'owner') == this.props.currentUser._id) ?
    true: false;

    let hour = moment(Helpers.get(conversation[i], 'timestamp')).calendar();

    conversationToDiv[i] = 	<div key={i}>

      <MessageUnit
        hour={hour}
        isMe={isMe}>
        {Helpers.get(conversation[i], 'message')}
      </MessageUnit>

    </div>;

  };

  this.setState({messagesInDiv: conversationToDiv}, () => {
      this.scrollToBottom();
  });

}

render() {

  let interlocutorProfile = this.state.interlocutor.profile;

  console.log(this.state.conversation)
  console.log(this.props);

  const actions = [
    <form onSubmit={(event) => this.sendMessage(event)} style={styles.submit}>

        <TextField
            hintText="Digite uma mensagem"
            onChange={(event) => this.setMessage(event)}
            underlineShow={false}
            ref="textFieldSendMessage"
            value={this.state.message}
            />

    </form>,
  ];

  return (
    <div style={styles.box}>
      <List>
    <ListItem
      disabled={true}
      style={styles.topBox}
      rightIconButton={
        <IconButton
          onTouchTap={this.props.handleChat}
          >
          <Clear style={{fill: 'black'}}/>
        </IconButton>
      }
      leftAvatar={
        <Avatar src={interlocutorProfile.image} />
      }>
      {interlocutorProfile.name}
    </ListItem>
    </List>
    <div style={styles.messagesBox}>
    {this.state.messagesInDiv}
    <div ref='lastMessage'></div>
    </div>
      {actions}
    </div>
  );
}
}

export default Chat;
