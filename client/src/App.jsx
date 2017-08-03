import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import './helpers/LocalStorage.jsx';

// Social Components
import MainLayout from './layouts/MainLayout.jsx';
import LoadingLayout from './layouts/LoadingLayout.jsx';

import ProfileContainer from './containers/ProfileContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import ConfigurationContainer from './containers/ConfigurationContainer.jsx';

import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import RegisterConfirmation from './components/RegisterConfirmation';
import Login from './components/Login.jsx';
import Intro from './components/Intro/Intro.jsx';
import ChatContainer from './containers/ChatContainer.jsx';

//Ecommerce Components
import AdListContainer from './ecommerce/containers/AdListContainer';
import AdPageContainer from './ecommerce/containers/AdPageContainer';
import CheckoutContainer from './ecommerce/containers/CheckoutContainer';
import StatusOrderContainer from './ecommerce/containers/StatusOrderContainer';
import Checkout from './ecommerce/components/Checkout.jsx';
import Product from './ecommerce/components/Product.jsx';
import ConfirmationOrder from './ecommerce/components/ConfirmationOrder.jsx';
import TypeAd from './ecommerce/components/TypeAd.jsx';
import ProductTitle from './ecommerce/components/ProductTitle.jsx';
import ProductStatus from './ecommerce/components/ProductStatus.jsx';
import ProductPrice from './ecommerce/components/ProductPrice.jsx';
import DeliveryOptions from './ecommerce/components/DeliveryOptions.jsx';
import ProductReview from './ecommerce//components/ProductReview.jsx';
import CreditCard from './ecommerce//components/CreditCard.jsx';
import ProductAd from './ecommerce/components/ProductAd.jsx';
import Tracker from './ecommerce/components/Tracker.jsx';
import AdSubCategory from './ecommerce/components/AdSubCategory.jsx';
import InsertCategories from './ecommerce/components/InsertCategories.jsx';
import OrdersContainer from './ecommerce/containers/OrdersContainer.jsx';
import OrderContainer from './ecommerce/containers/OrderContainer.jsx';
import MyAdsContainer from './ecommerce/containers/MyAdsContainer.jsx';
import CardsContainer from './ecommerce/containers/CardsContainer.jsx';
import SearchContainer from './ecommerce/containers/SearchContainer.jsx';
import PremiumRegisterContainer from './ecommerce/containers/PremiumRegisterContainer.jsx';
import NewPost from './ecommerce/components/NewPost.jsx';
import PhotoUploader from './ecommerce/components/PhotoUploader.jsx';

import { default as Theme } from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecoverPassword from './components/RecoverPassword.jsx';
import { ButtonsLoginDrawer } from './components/LoginButtons.jsx';
import Meteor from  'react-meteor-client';
import { createContainer } from 'meteor/react-meteor-data';

const muiTheme = getMuiTheme({
	slider: {
		trackColor: 'black',
		selectionColor: '#FF8C00'
	},
	palette: {
		primary1Color: '#FFCA43',
		accent1Color: '#FFA500',
		disabledColor: '#CCCCCC'
	},
	appBar: {
		height: 50,
	}
});

// =============
// App Component
// =============
class App extends Component {

	componentDidMount(){
		Meteor.call("getToken", (e, s) => {
			console.log(e, s);
		});

		// Meteor.call('getEncriptKey', function(e, r){
		// 	if(!e){
		// 		Meteor.call('openSession');
		// 	}
		// 	else console.log(e);
		// });


	}

	render() {

		if (this.props.loadingUsers) {
			return (
				<Theme muiTheme={muiTheme}>
					<LoadingLayout />
				</Theme>
			);
		}

		else {
			if (this.props.currentUser) {
				let { currentUser } = this.props;

				if (currentUser.intro.show) {
					return (
						<Theme muiTheme={muiTheme}>
							<Intro currentUser={currentUser} />
						</Theme>
					);

				} else {
					return (
						<Theme muiTheme={muiTheme}>
							<Router>
								<Switch>
									<MainLayout currentUser={currentUser}>
										<Route exact path='/'  render={(props) => <Home {...props} currentUser={currentUser} />} />
										<Route path='/my-profile'  render={(props)  => <ProfileContainer {...props} currentUser={currentUser} />}   />
										<Route path='/profile/:userId'  render={(props)  => <ProfileContainer {...props} currentUser={currentUser} />}   />
										<Route path='/config'  render={(props)  => <ConfigurationContainer {...props} currentUser={currentUser} />}   />
										<Route path='/shopping/'  render={(props)  => <AdListContainer {...props} currentUser={currentUser} />}   />
										<Route path='/adPage/:adId'  render={(props)  => <AdPageContainer {...props} currentUser={currentUser} />}   />
										<Route path='/checkout/:adId'  render={(props)  => <CheckoutContainer {...props} currentUser={currentUser} />}   />
										<Route path='/confirmationOrder/:orderId'  render={(props)  => <StatusOrderContainer {...props} currentUser={currentUser} />}   />
										<Route path='/new-ad'  render={(props)  => <ProductAd {...props} currentUser={currentUser} />}   />
										<Route path='/newPost'  render={(props)  => <NewPost {...props} currentUser={currentUser} />}   />
										<Route path='/AdSubCategory'  render={(props)  => <AdSubCategory {...props} currentUser={currentUser} />}   />
										<Route exact path='/InsertCategories/'  render={(props)  => <InsertCategories {...props} currentUser={currentUser} />}   />
										<Route path='/CreditCard'  render={(props)  => <CardsContainer {...props} currentUser={currentUser} />}   />
										<Route path='/orders/:user_type'  render={(props)  => <OrdersContainer {...props} currentUser={currentUser} />}   />
										<Route path='/order/:user_type/:orderId'  render={(props)  => <OrderContainer {...props} currentUser={currentUser} />}   />
										<Route path='/my-ads'  render={(props)  => <MyAdsContainer {...props} currentUser={currentUser} />}   />
										<Route path='/premium-register/' render={(props) => <PremiumRegisterContainer {...props} currentUser={currentUser} />} />
										<Route path='/search/:type/:word'  render={(props)  => <SearchContainer {...props} currentUser={currentUser} />}   />
										<Route path='/tracker'  render={(props)  => <Tracker {...props} currentUser={currentUser} />} />
										<Route path='/chat'  render={(props)  => <ChatContainer {...props} currentUser={currentUser} />} />
										<Route path='/dashboard'  render={(props)  => <DashboardContainer {...props} currentUser={currentUser} />}   />
										<Redirect from='/intro' to='/' />
									</MainLayout>
								</Switch>
							</Router>
						</Theme>
					);
				}
			}

			else {
				return (
					<Theme muiTheme={muiTheme}>
						<Router>
							<Switch>
								<Route exact path='/' render={(props)=> <Login {...props}/>} />
								<Route path='/affiliate/' render={(props)=> <Login {...props}/>} />
								<Route exact path='/register' render={(props)=> <Register {...props} />} />
								<Route exact path='/recover-password' render={(props)=>  <RecoverPassword {...props}/>} />
								<Redirect to='/' />
							</Switch>
						</Router>
					</Theme>
				)
			}

		}
	}
}

App.childContextTypes = {
	toggleDrawer: React.PropTypes.func
};

export default App;
