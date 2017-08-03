import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';

/*
  - Component to translate the others according
  to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

class EmailField extends Component {
	componentDidMount() {
			
			Helpers.defineLanguage();

	}

	handleSubmit() {
		Meteor.call('addRegisteredEmail', this.refs.email.value, function(e,r){
			console.log(r);
		});
	}

	render() {
		return(
			<div className="email-field-component">
				<p><T>common.EmailField.textConfirmEmail</T></p>
				<input ref='email' type="email" placeholder="email" />
				<button onClick={this.handleSubmit.bind(this)} ><T>common.Form_actions.confirm</T></button>
			</div>
		);
	}
}

export default EmailField;
