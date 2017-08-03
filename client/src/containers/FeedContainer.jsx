import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import Twit from 'twit';

import Feed from '../components/Feed.jsx';
import CommentList from '../components/CommentList.jsx';
import Profile from '../components/Profile.jsx'
import { Helpers } from '../helpers/Helpers.jsx'

/*
  FeedSorter
  Sorts the feeds from the various social networks in chronological order
*/

const FeedSorter = ({facebookFeed, twitterFeed, instagramFeed, pinterestFeed,
	youtubeFeed, feedType, pagination, getAllFeeds, updatePage, pageFeed}) => {

	let feed = []
		.concat(facebookFeed)
		.concat(twitterFeed)
		.concat(instagramFeed)
		.concat(youtubeFeed)
		.concat(pinterestFeed)
		.sort(function (a, b) { return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0); });

	return (
		<Feed cacheFeed={feed} feed={feed} feedType={feedType} page={pagination}
			getAllFeeds={getAllFeeds} pageFeed={pageFeed} updatePage={updatePage} />
	);

}

/*
 	FeedContainer
*/

class FeedContainer extends Component {

	// =============
	// constructor()
	// =============
	constructor(props) {
		super(props);

		// Set the social network feeds as new state arrays
		this.state = {
			facebookFeed: new Array(),
			twitterFeed: new Array(),
			instagramFeed: new Array(),
			pinterestFeed: new Array(),
			youtubeFeed: new Array(),
			facebookPage: false,
			twitterPage: false,
			pageFeed: 0,
			pagination: false,
		};
	}

	// ==========================================
	// getFeed()
	// Get the Feed of a specific social network,
	// defined by the @service parameter
	// ==========================================

	getFeed(service) {
		let self = this;

		if (Meteor.user()) {

			// Capitalize the service string (Ex: 'facebook' becomes 'Facebook')
			serviceCapitalized = service.charAt(0).toUpperCase() + service.slice(1);

			let u = Meteor.user();
			let methodName;
			let pageName;

			if (typeof Helpers.get(this.props, 'route.feedType') === 'undefined') {
				methodName = (this.props.feedType == 'home' ? 'get' + serviceCapitalized + 'HomeFeed' : 'get' + serviceCapitalized + 'ProfileFeed');
			}
			else {
				// Setting the method name that we are going to call from the server, using Meteor.call()
				methodName = (this.props.route.feedType == 'home' ? 'get' + serviceCapitalized + 'HomeFeed' : 'get' + serviceCapitalized + 'ProfileFeed');
			}

			pageName = this.state[service + 'Page'];

			console.log(methodName,pageName);

			// Async calling the method whose name was set above
			Meteor.call(methodName, pageName, function (error, result) {

				if (typeof result != 'undefined') {
					let stateObject = [];
					let pageName = {};
					let page;
					console.log(result);


					if (Array.isArray(result)) {

						stateObject[service + 'Feed'] = result;
						console.log(stateObject);
						self.setState(stateObject)

					}

					else {

						stateObject[service + 'Feed'] = result.data;
						pageName[service + 'Page'] = result.page;
						console.log(stateObject);
						self.setState(stateObject);
						self.setState(pageName)

					}

				}

				else {
					console.log(error)
				}

				return true;
			});

		}
	}


	//////////////////////////////////////////
	// Update pagination on feed of Crodity
	//////////////////////////////////////////

	updatePage() {
		let pageFeed = this.state.pageFeed;
		this.setState({ pageFeed: pageFeed + 1 });
	}


	// ===========================================
	// getAllFeeds()
	// Calls the APIs for the social networks that
	// are implemented by Crodity system
	// ===========================================
	getAllFeeds() {
		let user = Meteor.user();
		let services = user.services || [];

		let service;
		let page = '';
		let self = this;
		delete services.resume;

		Object.keys(services).map((service, i) => {
			if (user.permissions[service].view == true) {
				if (service == 'google') {
					self.getFeed('youtube');
				} else {
					self.getFeed(service);
				}
			}

				//////////////////////////////////////////
				// Update pagination on feed of Crodity
				//////////////////////////////////////////
				self.updatePage.bind(self)();

		})

	}

	// ===================
	// componentDidMount()
	// ===================
	componentDidMount() {
		clearTimeout();
		// Configures long polling to make live updates possible
		(this.getAllFeeds.bind(this))();
	}


	// ======================
	// componentWillUnmount()
	// ======================
	componentWillUnmount() {
		// Clears the timoeout that was set inside the getAllFeeds() method
		clearTimeout();
	}

	// ========
	// render()
	// ========
	render() {

		if (this.state.facebookFeed.length > 0 || this.state.twitterFeed.length > 0 ||
			this.state.instagramFeed.length > 0 || this.state.pinterestFeed.length > 0 ||
			this.state.youtubeFeed.length > 0) {


			return (
				<FeedSorter
					facebookFeed={this.state.facebookFeed}
					twitterFeed={this.state.twitterFeed}
					pinterestFeed={this.state.pinterestFeed}
					youtubeFeed={this.state.youtubeFeed}
					instagramFeed={this.state.instagramFeed}
					feedType={this.props.feedType}
					getAllFeeds={this.getAllFeeds.bind(this)}
					page={this.state.pagination}
					updatePage={this.updatePage.bind(this)}
					pageFeed={this.state.pageFeed} />
			);
		}
		else {
			return (
				<div className='center'>
					<img src="/img/preloader.gif" alt="Loading" />
				</div>
			);
		}
	}

}

export default FeedContainer;
