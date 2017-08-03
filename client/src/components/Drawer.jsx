import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton.jsx';
import { Helpers } from '../helpers/Helpers.jsx';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { ButtonsLoginDrawer } from './LoginButtons';
import i18n from 'meteor/universe:i18n';

import Toggle from 'material-ui/Toggle';
import { List, ListItem } from 'material-ui/List';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

const T = i18n.createComponent();

let styleDrawer = {
	position: 'inherit',
	zIndex: "1",
}

class MainDrawer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			backgroundImage: 'url(' + Helpers.get(this.props, 'currentUser.profile.cover') + ')',
			profileImage: Helpers.get(this.props, 'currentUser.profile.image'),
			openSocialNetwork: false,
			openMyStore: false,
			premiumClient: true
		};
	}

	handleToggle() {
		this.setState({
			openSocialNetwork: !this.state.openSocialNetwork,
		});
	};

	componentDidMount() {
		Helpers.defineLanguage();
	}

	render() {

		let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let is_mobile = screen_width < 600 ? true : false;

		return (
			<Drawer
				docked={is_mobile?false:true}
				width={250}
				openSecondary={is_mobile?true:false}
				open={is_mobile?this.props.isDrawerOpened:true}
				onRequestChange={this.props.handleDrawerState}
				containerStyle={is_mobile?null:styleDrawer}
				containerClassName={is_mobile?null:'drawer'}
			>
				<List onTouchTap={() => this.props.handleDrawerState(false)}>
					<Link to="/">
						<ListItem primaryText="Home" leftIcon={<FontIcon className="material-icons nav-icon">home</FontIcon>} />
					</Link>
					<Link to="/my-profile">
						<ListItem primaryText="Perfil" leftIcon={<FontIcon className="material-icons nav-icon">account_circle</FontIcon>} />
					</Link>
					<Link to="/dashboard/" >
						<ListItem primaryText="Dashboard" leftIcon={<TrendingUp />} />
					</Link>
					<Link to="/chat">
						<ListItem primaryText="Chat" leftIcon={<FontIcon className="material-icons">question_answer</FontIcon>} />
					</Link>
					<Link to="/premium-register">
							<ListItem primaryText="Torne-se Premium!"
								leftIcon={<FontIcon className="material-icons" style={{color: '#ffca43'}}>star</FontIcon>}/>
						</Link>
					<ListItem primaryText="Mais Redes"
						leftIcon={<FontIcon className="material-icons">add</FontIcon>}
						initiallyOpen={false}
						primaryTogglesNestedList={true}
						nestedItems={[
							<ButtonsLoginDrawer currentUser={this.props.currentUser} />
						]}
					/>
					<Divider />

					<ListItem primaryText="Loja"
						leftIcon={<FontIcon className="material-icons">store</FontIcon>}
						initiallyOpen={false}
						primaryTogglesNestedList={true}
						nestedItems={[
							<Link to="/shopping/" >
								<ListItem primaryText='Comprar' leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>} />
							</Link>,
							<Link to="/orders/buyer">
								<ListItem primaryText="Minhas Compras" key={2} leftIcon={<FontIcon className="material-icons">business_center</FontIcon>} />
							</Link>,
							<Link to="/orders/seller">
								<ListItem primaryText="Minhas vendas" key={2} leftIcon={<FontIcon className="material-icons">shop_two</FontIcon>} />
							</Link>,
							<Link to="/new-ad">
								<ListItem primaryText="Anunciar" key={1} leftIcon={<FontIcon className="material-icons">add</FontIcon>} />
							</Link>,
							<Link to="/my-ads">
								<ListItem primaryText="Meus Anúncios" key={3} leftIcon={<FontIcon className="material-icons">shop</FontIcon>} />
							</Link>
						]}
					/>
				</List>
				<Divider />
				<LogoutButton />
			</Drawer>
		)

	}
}

export default MainDrawer;
