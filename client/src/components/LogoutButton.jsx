import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';
import {List, ListItem} from 'material-ui/List';

import ExitApp from 'material-ui/svg-icons/action/exit-to-app';

/*
  - Component to translate the others according
  to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

class LogoutButton extends Component {
	componentDidMount() {

			Helpers.defineLanguage();

	}

	handleLogout() {
		console.log('handleLogout');
		console.log(this.props);
		let self = this;
		Meteor.logout(() => {
			console.log('logout!');
			console.log(self.props.router);
			self.props.router.push('/login');
		});
	}

	render() {
		return(
			<ListItem
				primaryText={<T>common.LogoutButton.logout</T>}
				leftIcon={<ExitApp />}
				onClick={this.handleLogout.bind(this)}
				/>
			);
	}
}

export default LogoutButton;
