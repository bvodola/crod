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

let widthTextFieldChat = (window.innerWidth >= 600) ? '85%':'65%';

const styles = {
	divList: {
		padding: '0px 0px 0px 0px',
		backgroundColor: "#F5F5F5"
	},
	actions: {
		textAlign: 'left',
		marginLeft: '10px'
	},
	list:{
		padding: '0px'
	},
	textFieldChat: {
		textAlign: 'left',
		width: widthTextFieldChat
	},
	sendIcon: {
		fill: 'white',
		lineHeight: '0px'
	},
	sendButton: {
		marginLeft: '36px',
		minWidth: '58px'
	},
	tab: {
		backgroundColor: 'white',
		color: 'black',
		zIndex: 0
	}
};

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slideIndexTab: 1,
			chatUnit: false,
			interlocutor: props.currentUser,
			message: '',
			messages: props.messages,
			messagesInDiv: null,
			buttonSendDisable: true,
			isMobile: (window.innerWidth <= 600) ? true:false
		};
	}

	componentDidMount() {
		Helpers.defineLanguage();
	}

	componentWillReceiveProps(nextProps) {

		let messages = this.state.messages;

		if(Helpers.get(this.state.messages, 'length') != Helpers.get(nextProps.messages, 'length')){
			// console.log('State messages set')
			this.setState({messages: nextProps.messages});
			this.renderMessages();
		}
	}



	//============================
	//=== Handle/change methods ==
	//============================

	handleChangeTabs(value) {
		this.setState({
			slideIndexTab: value,
		});
	};

	handleChatUnit(){

		this.setState({
			chatUnit: !this.state.chatUnit,
		},() => {
			this.renderMessages();
		});

	};

	handleInterlocutor(interlocutor){

		this.setState({
			interlocutor: interlocutor,
		}, () => {
			this.handleChatUnit();
		});

	}

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
		}else{
			alert('Digite alguma mensagem!');
			console.log('Necessário mensagem');
		}

	}

	scrollToBottom(){
		let node = ReactDOM.findDOMNode(this.refs.lastMessage);
		node.scrollIntoView({ behavior: "smooth" });

		node = ReactDOM.findDOMNode(this.refs.textFieldSendMessage);
		console.log(node);
		node.focus();
	}

	//============================
	//=== Render methods =========
	//============================

	renderMessages(){

		let messagesSentToDiv = [];

		let messagesSent = this.getSentMessages();
		let messagesReceived = this.getReceivedMessages();
		let conversation = messagesSent.concat(messagesReceived);

		//Sorting by time
		conversation.sort(function (a, b) {
			return a.timestamp - b.timestamp;
		});

		for (let i = 0; i < Helpers.get(conversation, 'length'); i++) {

			let isMe = (Helpers.get(conversation[i], 'owner') == this.props.currentUser._id) ?
			true: false;

			let hour = moment(Helpers.get(conversation[i], 'timestamp')).calendar();

			messagesSentToDiv[i] = 	<div key={i}>

				<MessageUnit
					hour={hour}
					isMe={isMe}>
					{Helpers.get(conversation[i], 'message')}
				</MessageUnit>

			</div>;

		};

		this.setState({messagesInDiv: messagesSentToDiv}, () => {
			if(this.state.chatUnit){
				this.scrollToBottom();
			}
		});

		// return messagesSentToDiv;
	}

	getSentMessages(){
		let messagesSent = Messages.find({
			$and:[
				{
					owner: this.props.currentUser._id
				},
				{
					to: this.state.interlocutor._id
				}
			]
		}).fetch();

		return messagesSent;
	}

	getReceivedMessages(){
		let messagesReceived = Messages.find({
			$and:[
				{
					owner: this.state.interlocutor._id
				},
				{
					to: this.props.currentUser._id
				}
			]
		}).fetch();

		return messagesReceived;
	}

	//Waiting fixing bugs on Ads
	renderEcommerceContacts(users){

		return true;
	}

	renderFollowedContacts(followedUsers){

		let usersInDiv = [];

		if (followedUsers != undefined) {

			for (let i = 0; i < followedUsers.length; i++) {

				usersInDiv[i] = <div key={Math.random().toString()}>
					<ListItem
						leftAvatar={<Avatar src={followedUsers[i].profile.image} />}
						rightIcon={<CommunicationChatBubble />}
						primaryText={followedUsers[i].profile.name}
						secondaryText={followedUsers[i].profile.birthday}
						onTouchTap={() => this.handleInterlocutor(followedUsers[i])}
						/>
					<Divider />
				</div>;
			}
		}

		return usersInDiv;
	}

	render() {

		let interlocutorProfile = this.state.interlocutor.profile;
		let muiltiLine = this.state.isMobile;

		const actions = [
			<form onSubmit={(event) => this.sendMessage(event)}>

					<TextField
							hintText="Digite uma mensagem"
							onChange={(event) => this.setMessage(event)}
							style={styles.textFieldChat}
							underlineShow={false}
							ref="textFieldSendMessage"
							multiLine={muiltiLine}
							/>

					<FlatButton
							icon={<Send style={styles.sendIcon}/>}
							hoverColor="#ffcd4f"
							backgroundColor="#FFCA43"
							style={styles.sendButton}
							primary={true}
							disabled={this.state.buttonSendDisable}
							keyboardFocused={true}
							onTouchTap={(event) => this.sendMessage(event)}
							/>

			</form>,
		];

		return (

			<div>
				<Tabs
					onChange={(event) => this.handleChangeTabs(event)}
					value={this.state.slideIndexTab}
					>
					<Tab
						style={styles.tab}
						label="Ecommerce"
						value={0}
						/>

					<Tab
						style={styles.tab}
						label="Rede social"
						value={1}
						/>

				</Tabs>

				<SwipeableViews
					index={this.state.slideIndexTab}
					onChangeIndex={(event) => this.handleChangeTabs(event)}
					>
					<div>
						<List>
							{this.renderEcommerceContacts(this.props.followedUsers)}
						</List>
					</div>
					<div>
						<List>
							<Subheader>Seguidos</Subheader>
							{this.renderFollowedContacts(this.props.followedUsers)}
						</List>
					</div>

				</SwipeableViews>

				{(this.state.isMobile) ?

					<FullscreenDialog
						open={this.state.chatUnit}
						onRequestClose={() => this.handleChatUnit()}
						title={interlocutorProfile.name}
						titleStyle={{color: 'black'}}
						appBarStyle={{backgroundColor: 'white', color: 'black'}}
						actionButton={
							<FlatButton
								icon={<Clear style={{fill: 'black'}}/>}
								onTouchTap={() => this.handleChatUnit()}
								hoverColor="#f5f5f5"
								/>
						}
						closeIcon={
							<Avatar style={{padding: '0px'}} src={interlocutorProfile.image} />
						}>

						<List style={{marginBottom: '25px'}}>
							{this.state.messagesInDiv}
						</List>

						<div style={{ position: 'absolute', bottom: '0', marginLeft:'10px', width: '100%', backgroundColor: 'white'}}>
							{actions}
						</div>

						<div ref="lastMessage"/>

					</FullscreenDialog>
					:
				<Dialog
					title={
						<div
							style={styles.divList}>
							<List style={styles.list}>
								<div>
									<ListItem
										primaryText={interlocutorProfile.name}
										leftAvatar={
											<Avatar src={interlocutorProfile.image} />
										}
										hoverColor={"#F5F5F5"}
										rightIconButton={
											<FlatButton
												icon={<Clear style={{fill: 'black'}}/>}
												onTouchTap={() => this.handleChatUnit()}
												hoverColor="#f5f5f5"
												/>
										}
										>
									</ListItem>
								</div>
							</List>
						</div>
					}
					actions={actions}
					actionsContainerStyle={styles.actions}
					modal={false}
					open={this.state.chatUnit}
					onRequestClose={() => this.handleChatUnit()}
					autoScrollBodyContent={true}
					>

					<List>
						{this.state.messagesInDiv}
					</List>

					<div ref="lastMessage"/>
				</Dialog>

			}

		</div>
	)
}
}

export default Chat;
