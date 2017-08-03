import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';
import TextField from 'material-ui/TextField';


/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();


class LoginCrodityAccount extends Component {


  handleSubmit(event) {
    event.preventDefault();

    let login = {
      user: this.refs.user.input.value,
      pass: this.refs.password.input.value
    }

    Meteor.loginWithPassword(login.user, login.pass,
      function (e) {
        if(e) console.log(e);
        else console.log('Login Successful');
      });

    }

    componentDidMount() {

      Helpers.defineLanguage();

    }


    render() {

      return (
        <div className="login-form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <TextField fullWidth ref='user' floatingLabelText={<T>common.LoginCrodityAccount.user</T>} />
            <TextField fullWidth ref='password' floatingLabelText={<T>common.LoginCrodityAccount.password</T>} />
            <button type='submit' className="item-link full button button-fill crodity-background-color">
              <T>common.Form_actions.enter</T>
            </button>
          </form>
        </div>
      );
    }
  }

  export default LoginCrodityAccount;
