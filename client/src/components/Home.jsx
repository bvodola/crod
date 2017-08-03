import React, { Component, PropTypes } from 'react';
import LoadingLayout from '../layouts/LoadingLayout.jsx';
import { Button } from 'framework7-react';
import FeedContainer from '../containers/FeedContainer.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';
import NewPost from '../components/NewPost.jsx';

class Home extends Component {
	render() {
		let { currentUser } = this.props;
			return (
				<div>
					<NewPost currentUser={currentUser} />
					<FeedContainer feedType='home' />
				</div>
			);
	}
}

Home.contextTypes = {
	framework7AppContext: PropTypes.object,
	toggleDrawer: PropTypes.func,
	router: PropTypes.object
};

export default Home;
