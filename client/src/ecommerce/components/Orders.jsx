import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../../helpers/Helpers.jsx';
import Meteor from  'react-meteor-client';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { Ad } from '../../../../api/ad';


const T = i18n.createComponent();

let styleDrawer = {
	position: 'inherit',
	zIndex: "1",
}

class Orders extends Component {

	constructor(props) {
		super(props);
		this.state = {
			state: true,
			ads: [],
		};
	}

	handleToggle() {
		this.setState({
			openSocialNetwork: !this.state.openSocialNetwork,
		});
	};

	getAd(_id) {
		let ads = this.props.myAds
		let returnAd
		console.log(this.props.myAds)
		if (typeof _id !== 'undefined') {
			ads.forEach((ad) => {
				console.log(ad._id)
				if (ad._id === _id) {
					console.log('If ad')
					returnAd = ad;
				}
			});


		}
		return returnAd
	}

	componentDidMount() {
		Helpers.defineLanguage();
	}

	renderOrders() {

		let orderOnDiv = [];
		let foreignUser;
		let ad, adId;
		if (Helpers.get(this.props.myOrders, 'length') > 0) {
			for (let i = 0; i < Helpers.get(this.props.myOrders, 'length'); i++) {

				foreignUser = (this.props.isBuyer) ?
					Meteor.users.findOne(this.props.myOrders[i].buyer_id) : Meteor.users.findOne(this.props.myOrders[i].seller_id);
				console.log('HERE', this.props.myOrders[i])
				adId = this.props.myOrders[i].ads[0]._id
				let order = this.props.myOrders[i]

				ad = this.getAd(adId)


				let route
				this.props.isBuyer ? route = "/buyer/" : route = "/seller/"
				console.log(this.props.user_type)
				orderOnDiv[i] = <div key={i} >
					<List>
						<ListItem
							containerElement={<Link to={"/order/" + this.props.user_type + "/" + this.props.myOrders[i]._id}></Link>}
							primaryText={Helpers.get(ad, 'title')}
							secondaryText={Helpers.get(order, 'order_date')}
							leftAvatar={<Avatar src={ad.images[0]} />}
							rightAvatar={<Avatar src={foreignUser.profile.image} />} />
					</List>
					<Divider />
				</div>;

			}
			// console.log(orderOnDiv);
			return orderOnDiv;
		} else {
			let type_user = this.props.user_type;
			let type_transaction
			if (type_user == "buyer") {
				type_transaction = "compras"
			} else {
				type_transaction = "vendas"
			}

			return <div style={{
				width: '100%',
				textAlign: 'center',
				height: '100%',
				marginTop: '50px'
			}} >
				<FontIcon color="gray" style={{ fontSize: '10vw' }} className="material-icons">sentiment_very_dissatisfied</FontIcon>
				<div style={{ color: "gray" }}>Ops! Você não possui {type_transaction} ainda. </div>
			</div>

		}
	}

	render() {

		console.log('THIS.PROPS.MYADS', this.props)

		return (

			<div>
				{this.renderOrders()}
			</div>
		)
	}
}

export default Orders;
