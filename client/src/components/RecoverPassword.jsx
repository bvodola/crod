import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import {Page, ContentBlock, Navbar, ListItem} from 'framework7-react';
import ReactDOM from 'react-dom';
import i18n from 'meteor/universe:i18n';

/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

class RecoverPassword extends Component {

  handleSubmitEmail(event) {
    event.preventDefault();
    console.log('E-mail sent to your personal account with the passowrd');
    //     let self = this;
    // this.props.router.push('/');
    // Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
    //   console.log(r);
    //       self.props.router.push('/');
    // });
  }
  componentDidMount() {
    event.preventDefault();
    Helpers.defineLanguage();

    /*	Calling the method do define the language */
    // Helpers.defineLanguage();
  }

  render() {
    return (
      <div className="page">
        <div className="page-content login-screen-content">

          <div className="login-screen-title"><img src="/img/CrodityLogo.jpg" alt="Crodity Logo" /></div>

          <form onSubmit={this.handleSubmitEmail.bind(this)}>

            <div className="list-block">
              <ul>
                <T>common.RecoverPassword.insertEmail</T>
                <li className="item-content">

                  <div className="item-media">
                      <i className="fa fa-envelope-o fa-lg" aria-hidden="true"></i>
                    </div>
                    <div className="item-inner">

                      <div className="item-input">
                        <input ref="email" type="email" placeholder="E-mail"/>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div className="col-10"></div>
                      <div className="col-80">
                        <p>
                          <a href="#" className="item-link button button-fill crodity-color">
                            <T>common.Form_actions.send</T>
                          </a>
                        </p>
                      </div>
                      <div className="col-10"></div>
                    </div>

                  </li>
                </ul>
              </div>

            </form>
          </div>
        </div>

      );
    }
  }
  export default RecoverPassword;
