import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';


/*
  - Component to translate the others according
  to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

class EmailVerification extends Component {

	componentDidMount() {

			Helpers.defineLanguage();

	}

	handleSubmit(event) {
		event.preventDefault();
		Meteor.call('addUser', Meteor.userId(), this.refs.email.value);
	}

	render() {
		return(
			<div>
				<T>common.EmailVerification.tittle</T>
				<input type="text" name="email" ref="email" placeholder="Email" />
				<ons-button onClick={this.handleSubmit.bind(this)}><T>common.Form_actions.send</T></ons-button>
			</div>
		);
	}
}

export default EmailVerification;
