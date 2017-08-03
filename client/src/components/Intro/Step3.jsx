import React, { Component } from 'react';
import Meteor from  'react-meteor-client';


import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const style = {

  wrapper: {
    textAlign: 'center'
  },

  inviteButton: {
    marginBottom: '20px'
  }
}

class Step3 extends Component {

  handleSubmit() {
    let { history } = this.props;
    Meteor.call('toggleUserIntro', false, (e, res) => {
      if(e) console.log(e);
      else {
        history.push('/');
      }
    });
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '943741645643957',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  handleClickInvite() {
    let displayType = (innerWidth<620?'popup':'dialog');
    let _id = this.props.currentUser._id
    FB.getLoginStatus(function(response) {
      if (response.authResponse) {
        FB.ui(
         {
          method: 'send',
          link: 'http://www.crodity.com/affiliate/'+_id,
          display: displayType,
        }, function(response){});
      }
    });

  }


  render() {
    let { currentUser } = this.props;
    console.log(this.props)
      return(
        <div>

          <p style={style.wrapper}>
            Nós premiamos usuários que indicam outras pessoas para participar do Crodity.
          </p>
          <RaisedButton style={style.inviteButton} onTouchTap={() => this.handleClickInvite()} label="Convidar amigos" primary={true} fullWidth={true} />
          <RaisedButton onTouchTap={() => this.handleSubmit()} label="Avançar" fullWidth={true} />
        </div>
      );

  }
}

export default Step3;
