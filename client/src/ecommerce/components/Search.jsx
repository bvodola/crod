import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../../helpers/Helpers.jsx';
import Meteor from  'react-meteor-client';

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { Ad } from '../../../../api/ad';
import Filter from './Filter.jsx'
import { browserHistory } from 'react-router';


const T = i18n.createComponent();

const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
	slide: {
		padding: 10,
	},
};

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// Setting the initial state
			reload: props,
			slideIndex: props.route,
			screenSize: $(window).width(),
			slideIndexOrdination: 0,
			buttonFreeShipping: false,
			buttonInterestFree: false,
			sliderPriceMaximum: 1000,
			sliderPriceMinimum: 0,
		};
	}

	componentDidMount() {
		Helpers.defineLanguage();
	}

	// === It's called before component receive the new props
	componentWillReceiveProps(nextProps) {

		if (nextProps.route != this.state.slideIndex) {
			this.handleChange(nextProps.route);
		}

	}

	handleChange(value) {
		this.setState({
			slideIndex: value,
		});
	};

	renderAll(users, ads) {

		let allInDiv = [];

		if (ads != undefined && users != undefined) {
			let usersInDiv = this.renderUsers(users);
			let adsInDiv = this.renderAds(ads);

			allInDiv = usersInDiv.concat(adsInDiv);

		}

		return allInDiv;
	}

	renderUsers(users) {

		let usersInDiv = [];
		let foreignUser;

		if (users != undefined) {
			for (let i = 0; i < users.length; i++) {

				usersInDiv[i] = <div key={Math.random().toString()}><List>
					<ListItem
						leftAvatar={<Avatar src={users[i].profile.image} />}
						primaryText={users[i].profile.name}
						secondaryText={users[i].profile.birthday}
						containerElement={<Link to={"/profile/" + users[i]._id}></Link>} />
				</List>
					<Divider />
				</div>;

			}
		}


		return usersInDiv;
	}

	renderAds(ads) {

		let adInDiv = [];

		if (ads != undefined) {

			//Checking if a ordenation method is defined
			(this.state.slideIndexOrdination != 0) ?
				this.orderAds(ads, this.state.slideIndexOrdination) : "";

			//Checking if is required free shipping
			ads = (this.state.buttonFreeShipping == true) ?
				this.selectFreeShipping(ads) : ads;

			//Checking if is required free interest
			ads = (this.state.buttonInterestFree == true) ?
				this.selectFreeInterest(ads) : ads;

			//Selecting ads with price bigger than ...
			ads = (this.state.sliderPriceMinimum > 0) ?
				this.selectPriceBiggerThan(this, ads) : ads;

			//Selecting ads with price bigger than ...
			ads = (this.state.sliderPriceMaximum < 1000) ?
				this.selectPriceLowerThan(this, ads) : ads;

			for (let i = 0; i < ads.length; i++) {

				// if(Helpers.get(ads[i], 'status') == 0){

				adInDiv[i] = <div key={Math.random().toString()}><List>
					<ListItem
						leftAvatar={<Avatar src={ads[i].images[0]} />}
						primaryText={ads[i].title}
						secondaryText={"R$ " + ads[i].price}
						containerElement={<Link to={"/adPage/" + ads[i]._id}
							key={i}></Link>} />
				</List>
					<Divider />
				</div>;

				// }

			}

		}

		return adInDiv;
	}

	// ==== Ordination for ads ===
	orderAds(ads, type) {

		if (type == 1) {
			ads.sort(function (a, b) {
				return a.price - b.price;
			});
		} else if (type == 2) {
			ads.sort(function (a, b) {
				return b.price - a.price;
			});
		}
	}

	// === Selecting only the ads with free shipping
	selectFreeShipping(ads) {
		ads = ads.filter(function (ad) {
			return ad.freeshipping == 1;
		})
		return ads;
	}

	// === Selecting only the ads with free interest
	selectFreeInterest(ads) {
		ads = ads.filter(function (ad) {
			return ad.freeinterest == 1;
		})
		return ads;
	}

	// === Selecting only the ads with a price bigger than
	selectPriceBiggerThan(self, ads) {
		ads = ads.filter(function (ad) {
			return ad.price >= self.state.sliderPriceMinimum;
		})
		return ads;
	}

	// === Selecting only the ads with a price lower than
	selectPriceLowerThan(self, ads) {
		ads = ads.filter(function (ad) {
			return ad.price <= self.state.sliderPriceMaximum;
		})
		return ads;
	}

	changeRoute(route) {
		browserHistory.push("/search/" + route + "/" + this.props.params.word);
	}

	defineFilters(filter, value) {
		//Property computed names
		this.setState({ [filter]: value });
	}

	render() {
		console.log(this.state)
		console.log(this.props.ads)
		return (
			<div>
				<Tabs
					onChange={(event) => this.handleChange(event)}
					value={this.state.slideIndex}
				>
					<Tab
						style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }}
						label="All"
						value={0}
						onActive={() => this.changeRoute('all')} />

					<Tab
						style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }}
						label="Users"
						value={1}
						onActive={() => this.changeRoute('users')} />

					<Tab
						style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }}
						label="Ads"
						value={2}
						onActive={() => this.changeRoute('ads')} />

				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={(event) => this.handleChange(event)}
				>
					<div>
						{this.renderAll(this.props.users, this.props.ads)}
					</div>
					<div style={styles.slide}>
						{this.renderUsers(this.props.users)}
					</div>
					<div style={styles.slide}>
						{this.renderAds(this.props.ads)}
					</div>

				</SwipeableViews>

				{(this.props.params.type == 'all' || this.props.params.type == 'ads') ?
					<Filter defineFilters={this.defineFilters.bind(this)} /> : ""}

			</div>
		)
	}
}

export default Search;
