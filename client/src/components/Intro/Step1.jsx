import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import Cookie from 'js-cookie'
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
  componentWrapper: {
    padding: '16px'
  },

  wrapper: {
    textAlign: 'center'
  },

  logo: {
    width: '180px',
    margin: '10px 0 30px 0'
  },

  avatarIconWrapper: {
    marginTop: '-20px',
    textAlign: 'center'
  },

  avatarIcon: {
    color: '#fff',
    padding: '8px 11px',
    borderRadius: '100%',
    fontSize: '16px',
  },

  avatarIconTwitter: {
    background: '#00aced'
  },

  avatarIconFacebook: {
    background: '#3b5998'
  },

  name: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}

class Step1 extends Component {

  constructor(props){
    super(props);
    this.state ={
      _id: '',
    }
  }

  handleSubmit() {
    let phone = this.phone.getValue();
    let email = typeof this.email !== 'undefined' ? this.email.getValue() : false;
    let { history } = this.props;

    Meteor.call('setAffiliated', this.state._id, (e, res)=> {
        if(e)
          console.log(e);
        else
          console.log(res);
    });

    Meteor.call('addRegisteredPhone', phone, (e,res) => {
      if(e) console.log(e);
      else {
        Meteor.call('addRegisteredEmail', email, (e, res) => {
          if(e) console.log(e);
          else console.log(res);
        });
        Meteor.call('updateUserIntroStep', 2, (e, res) => {
          history.push('/intro/2');
        });
      }
    });

  }

  componentDidMount(){
    let cookie = Cookie.get('_id')
    let index = cookie.indexOf("_id");
		let _id = this.state._id;
    _id = cookie.substring(index);
    this.setState({_id })
  }

  render() {
    let { currentUser } = this.props;
    let service = typeof currentUser.services.facebook !== 'undefined' ? 'facebook' : 'twitter';

    let socialIcon = () => {
      if(service === 'facebook')
        return <FontIcon style={{ ...style.avatarIcon , ...style.avatarIconFacebook }} className={'fa fa-facebook'} />
      else
        return <FontIcon style={{ ...style.avatarIcon , ...style.avatarIconTwitter }} className={'fa fa-twitter'} />
    }

      return(
        <div>

          <div style={style.wrapper}>
            <Avatar size={100} src={currentUser.profile.image}></Avatar>
          </div>
          <div style={style.avatarIconWrapper}>
            {socialIcon()}
          </div>
          <p style={style.name}>
            {currentUser.profile.firstName} {currentUser.profile.lastName}
          </p>


          <p style={style.wrapper}>Bem vindo(a) ao Crodity. Para continuar, complete seu cadastro</p>
          {service === 'twitter' ?
            <TextField ref={(el) => { this.email = el; }} type='email' floatingLabelText='E-mail' fullWidth={true} />
            :
            null
          }

          <TextField ref={(el) => { this.phone = el; }} type='number' floatingLabelText='DDD + Celular' fullWidth={true} />
          <RaisedButton onTouchTap={() => this.handleSubmit()} label="Avançar" primary={true} fullWidth={true} />
        </div>
      );

  }
}

export default Step1;
