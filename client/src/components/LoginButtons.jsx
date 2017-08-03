import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';

import RaisedButton from 'material-ui/RaisedButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Public from 'material-ui/svg-icons/social/public';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const style = {
  opacity: 0.5
}

const loginStyle = (Meteor.isCordova ? 'redirect' : 'popup');

//This class handles accounts logins
class LoginWith {

  loginWithFacebook

  //This method makes login with Facebook
  static Facebook() {

    if (Meteor.user()) {
      Meteor.call('permissionsServicesController', 'facebook');
    }

    Meteor.loginWithFacebook({
      loginStyle: loginStyle,
      requestPermissions: ['email', 'publish_actions', 'user_about_me', 'user_birthday', 'user_education_history', 'user_friends', 'user_likes', 'user_location',
        'user_photos', 'user_posts', 'user_relationships', 'user_religion_politics', 'user_videos', 'user_website', 'user_work_history',
        'manage_pages', 'publish_pages']
    }, function (e) {

      if (e) console.log('Error at loginWithFacebook', e);
    })
  }

  //This method makes login with Twitter
  static Twitter() {
    if (Meteor.user()) {
      Meteor.call('permissionsServicesController', 'twitter');
      Meteor.call('addCoverImage', 'twitter');
    }
    Meteor.loginWithTwitter({ loginStyle: loginStyle }, function (e) {
    });
  }


  //this method makes login with pinterest
  static Pinterest() {
    if (Meteor.user()) {
      Meteor.call('permissionsServicesController', 'pinterest');
    }
    Meteor.loginWithPinterest({ loginStyle: loginStyle }, function (e) {

    });
  }

  //This method makes login with google
  static Google() {
    Meteor.call('permissionsServicesController', 'google');
    Meteor.loginWithGoogle({
      loginStyle: loginStyle,
      requestPermissions: ['https://www.googleapis.com/auth/youtube'],
      requestOfflineToken: true,
      loginUrlParameters: {
        access_type: 'offline',
        approval_prompt: 'force'
      }
    },
      function (e) {
        if (e)
          console.log(e);
      }
    );
  }

  //This method makes login with linkedin
  static Linkedin() {
    Meteor.call('permissionsServicesController', 'linkedin');
    Meteor.loginWithLinkedin({ loginStyle: loginStyle }, function (e) {
      if (e)
        console.log(e);
    });
  }

  static Instagram() {
    Meteor.call('permissionsServicesController', 'instagram');
    Meteor.loginWithInstagram(function (e) {

      if (e) {
        console.log('login failed', e);
      } else {
        console.log('login success', Meteor.user());
      }
    });
  }
}

class ButtonsLoginLogin extends Component {


  componentDidMount() {
    // Helpers.defineLanguage();
  }

  render() {
    return (
      <div className='login-buttons'>
        <div className="login-button">
          <RaisedButton
            label={<span><T>common.LoginButtons.loginWith</T> Facebook</span>}
            onClick={LoginWith.Facebook}
            icon={<i style={{ color: '#fff' }} className="fa fa-facebook-square left fa-lg"></i>}
            style={{
              lineHeight: 'normal',
              width: '94%',
              marginLeft: '3%',
              marginBottom: '7px'
            }}
            buttonStyle={{ backgroundColor: '#3b5998' }}
            labelStyle={{ color: '#fff' }}
          />
        </div>
        <div className="login-button">
          <RaisedButton
            label={<span><T>common.LoginButtons.loginWith</T> Twitter</span>}
            onClick={LoginWith.Twitter}
            icon={<i style={{ color: '#fff' }} className="fa fa-twitter-square left fa-lg"></i>}
            style={{
              lineHeight: 'normal',
              width: '94%',
              marginLeft: '3%',
              marginBottom: '7px'
            }}
            buttonStyle={{ backgroundColor: '#00aced' }}
            labelStyle={{ color: '#fff' }}
          />
        </div>
      </div>
    );
  }
}

class ButtonsLoginDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facebook: Helpers.get(this.props, 'currentUser.services.facebook'),
      twitter: Helpers.get(this.props, 'currentUser.services.twitter'),
      instagram: Helpers.get(this.props, 'currentUser.services.instagram'),
      google: Helpers.get(this.props, 'currentUser.services.google'),
      pinterest: Helpers.get(this.props, 'currentUser.services.pinterest'),
      size: $(window).width(), // returns height of browser viewport
      open: false
    };
  }

  componentDidMount() {
    Helpers.defineLanguage();
  }

  handleClose() {
    this.setState({ open: false })
  }

  disconectFrom() {
    let self = this
    Meteor.call('disconnectFrom', this.state.service, function (error, response) {
      console.log('error = ', error)
      console.log('response = ', response)
      console.log(self.props.currentUser.services)
      self.handleClose()
    })
  }

  loginLogout(service) {
    console.log('service = ', service)
    console.log('services = ', this.props.currentUser.services)
    if (typeof this.props.currentUser.services[service] !== 'undefined') {
      this.setState({ open: true, service: service }, () =>
        console.log('open = ', this.state.open, 'service = ', this.state.service)
      )
    }
    else {
      switch (service) {
        case 'facebook':
          console.log('facebook')
          LoginWith.Facebook()
          break;
        case 'twitter':
          console.log('twitter')
          LoginWith.Twitter()
          break;
      }
    }
  }

  render() {
    console.log('ButtonsLoginDrawer render');
    return (
      <div>
        <div>
          <Dialog
            title="Deseja desconectar dessa rede?"
            modal={false}
            open={this.state.open}
          //onRequestClose={this.handlePublishClose()}
          >
            <div>
              <RaisedButton
                label="Sim"
                disableTouchRipple={true}
                disableFocusRipple={true}
                primary={true}
                onTouchTap={() => this.disconectFrom()}
                style={{ marginRight: 12, float: 'left' }}
              />
              <RaisedButton
                label="Não"
                disableTouchRipple={true}
                disableFocusRipple={true}
                primary={true}
                onTouchTap={() => this.handleClose()}
                style={{ marginRight: 12, float: 'right' }}
              />

            </div>
          </Dialog>
        </div>
        <List>
          <ListItem
            key={1}
            primaryText="Facebook"
            leftIcon={<i className="facebook-color fa fa-facebook-square fa-lg drawer-icons" aria-hidden="true"></i>}
            rightIcon={
              this.props.currentUser.services.facebook ?
                <i className="fa fa-check-circle fa-lg green-checked drawer-icons" aria-hidden="true"></i> : <span></span>
            }
            onClick={() => this.loginLogout('facebook')}
            style={
              this.props.currentUser.services.facebook ?
                style : {}
            }
          />

          <ListItem
            key={2}
            primaryText="Twitter"
            leftIcon={<i className="twitter-color fa fa-twitter-square fa-lg drawer-icons" aria-hidden="true"></i>}
            rightIcon={
              this.props.currentUser.services.twitter ?
                <i className="fa fa-check-circle fa-lg green-checked drawer-icons" aria-hidden="true"></i> : <span></span>
            }
            disabled={false}
            onClick={() => this.loginLogout('twitter')}
            style={
              this.props.currentUser.services.twitter ?
                style : {}
            }
          />

          <ListItem
            key={3}
            primaryText="Instagram"
            leftIcon={<i className="instagram-color fa fa-instagram fa-lg drawer-icons" aria-hidden="true"></i>}
            rightIcon={
              this.props.currentUser.services.instagram ?
                <i className="fa fa-check-circle fa-lg green-checked drawer-icons" aria-hidden="true"></i> : <span></span>
            } disabled={false}
            onClick={() => LoginWith.Instagram}
            style={
              this.props.currentUser.services.instagram ?
                style : {}
            }
          />

          <ListItem
            key={4}
            primaryText="Google"
            leftIcon={<i className="googleplus-color fa fa-google fa-lg drawer-icons" aria-hidden="true"></i>}
            rightIcon={
              this.props.currentUser.services.google ?
                <i className="fa fa-check-circle fa-lg green-checked drawer-icons" aria-hidden="true"></i> : <span></span>
            } disabled={false}
            onClick={() => LoginWith.Google}
            style={
              this.props.currentUser.services.google ?
                style : {}
            }
          />

          <ListItem
            key={5}
            primaryText="Pinterest"
            leftIcon={<i className="pinterest-color fa fa-pinterest-square fa-lg drawer-icons" aria-hidden="true"></i>}
            rightIcon={
              this.props.currentUser.services.pinterest ?
                <i className="fa fa-check-circle fa-lg green-checked drawer-icons" aria-hidden="true"></i> : <span></span>
            } disabled={false}
            onClick={() => LoginWith.Pinterest}
            style={
              this.props.currentUser.services.pinterest ?
                style : {}
            }
          />
        </List>
      </div>
    );
  }
}

const GoogleLoginButton = () => (
  <a href="#!" style={{ color: '#fff' }} className='button button-raised button-fill color-red' onClick={LoginWith.Google}>
    <i className="fa fa-google fa-lg" aria-hidden="true"></i>
    <T>common.LoginButtons.loginWith</T> Google
    </a>
);

export { LoginWith, ButtonsLoginDrawer, ButtonsLoginLogin, GoogleLoginButton }
