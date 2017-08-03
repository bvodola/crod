import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../../helpers/Helpers.jsx';
import Meteor from  'react-meteor-client';

import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { Ad } from '../../../../api/ad';

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

class MyAds extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slideIndex: 0
		};
	}

	componentDidMount() {
		Helpers.defineLanguage();
	}

	handleChange(value) {
		this.setState({
			slideIndex: value,
		});
	};

	changeAdStatus(objAd) {


		let obj = {
			id: objAd._id,
			is_active: true
		}

		if (objAd.is_active) {
			obj = {
				id: objAd._id,
				is_active: false
			}
		} else {
			obj = {
				id: objAd._id,
				is_active: true
			}
		}


		Meteor.call('finishAd', obj, (error, success) => {
			if (!error) {
				console.log("Success!")
			} else {
				console.log(error)
			}
		})
	}

	renderActiveAds(event) {

		let adOnDiv = [];
		let foreignUser;
		let ads = this.props.myAds;
		for (let i = 0; i < Helpers.get(ads, 'length'); i++) {
			if (ads[i].is_active) {
				adOnDiv[i] = <div key={i}>
					<List>
						<ListItem
							leftAvatar={<Avatar src={ads[i].images[0]} />}
							primaryText={<Link to={"/adPage/" + ads[i]._id}>{ads[i].title}</Link>}
							secondaryText={"R$ " + ads[i].price}
							rightIconButton={  <IconButton iconClassName="material-icons" 
							onTouchTap={()=> this.changeAdStatus(ads[i])}>pause_circle_outline</IconButton>}
							 />
					</List>
					<Divider />
				</div>;

			}
		}
		// this.setState({adsPaused: adOnDiv});
		// console.log(adOnDiv);
		return adOnDiv;
	}

	renderPausedAds(event) {

		let adOnDiv = [];
		let foreignUser;
		let ads = this.props.myAds;
		for (let i = 0; i < Helpers.get(ads, 'length'); i++) {
			//Checking if the ad is paused
			if (ads[i].is_active == false) {
				adOnDiv[i] = <div key={i}>
					<List>
						<ListItem
							leftAvatar={<Avatar src={ads[i].images[0]} />}
							primaryText={<Link to={"/adPage/" + ads[i]._id}>{ads[i].title}</Link>}
							secondaryText={"R$ " + ads[i].price}
							rightIconButton={  <IconButton iconClassName="material-icons" 
							onTouchTap={()=> this.changeAdStatus(ads[i])}>play_circle_outline</IconButton>}
							/>
							
					</List>
					<Divider />
				</div>;
			}
		}

		// console.log(adOnDiv);
		return adOnDiv;
	}

	renderFinishedAds(event) {

		let adOnDiv = [];
		let foreignUser;
		let ads = this.props.myAds;



		for (let i = 0; i < ads.length; i++) {
			let dateFinished = new Date();
			dateFinished.setDate(dateFinished.getDate() + 10);
			dateFinished = moment(dateFinished).format('YYYY-MM-DD HH:mm:ss')

			if (dateFinished < ads[i].created) {
				console.log(ads[i].created, '<-- Data Criada ', dateFinished, '<--- Data de finalização')
				console.log('VERDADEIRO')
			}
			if (dateFinished < ads[i].created) {
				if (typeof this.props.myAds !== 'undefined') {
					adOnDiv[i] = <div key={i}>
						<List>
							<ListItem
								leftAvatar={<Avatar src={ads[i].images[0]} />}
								primaryText={ads[i].title}
								secondaryText={"R$ " + ads[i].price}
								containerElement={<Link to={"/adPage/" + ads[i]._id}></Link>}
							/>

						</List>
						<Divider />
					</div>;
				}
			}
		}
		// this.setState({adsPaused: adOnDiv});
		// console.log(adOnDiv);
		return adOnDiv;
	}

	render() {
		console.log(this.props.myAds);
		return (
			<div>
				<Tabs
					onChange={(event) => this.handleChange(event)}
					value={this.state.slideIndex}
				>
					<Tab label="Actives" value={0} style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }} />
					<Tab label="Paused" value={1} style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }} />
					<Tab label="Finished" value={2} style={{ backgroundColor: 'white', color: 'black', zIndex: 0 }} />
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
					onChangeIndex={(event) => this.handleChange(event)}
				>
					<div>
						{this.renderActiveAds()}
					</div>
					<div style={styles.slide}>
						{this.renderPausedAds()}
					</div>
					<div style={styles.slide}>
						{this.renderFinishedAds()}
					</div>
				</SwipeableViews>
			</div>
		)
	}
}

export default MyAds;
