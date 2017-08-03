import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import { get, set, update } from 'lodash'
import { Page, ContentBlock, Navbar, ListItem, Popup, Button, FormInput, FormLabel } from 'framework7-react';
import Toggle from 'material-ui/Toggle';



class AccountConfiguration extends Component {


  constructor(props) {
    super(props);

    let permissions = props.currentUser.permissions;
    // let checkedService = [];

    // Object.keys(permissions).map((service,i) => {
    //   checkedService.push({
    //     name: service,
    //     view: permissions[i].view
    //   })
    // });

    this.state = {
      checkedService: permissions
    };
  }

  handleSubmitEmail() {
    event.preventDefault();
    let self = this;
    Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
      console.log(r);
      self.props.router.push('/');
    });
  }

  componenDidMount() {

    // Object.keys(this.props.currentUser.permissions).map((service, i) => {

    // });
    // this.setState({})
  }


  getPermissionServices() {
    Meteor.call('getPermissionsServices', (e, response) => {
      if (!e) this.services = response;
      else console.log(e);
    });

    //typeof this.props.currentUser.services !== 'undefined'

    return this.services;
  }


  handleChange(service) {
    event.preventDefault();

    this.state.service = service;

    console.log(this.state.service)
    console.log('to aqui:')

    let data = this.state.checkedService;
    set(data, service + '.view', !this.state.checkedService[service].view);

    this.setState({ checkedService: data }, () => {
      console.log(this.state.checkedService[service].view)
      Meteor.call('setPermissionsServices', service, this.state.checkedService[service].view, function (e, response) {
        if (!e) console.log('ok');
        else console.log(e);
      });
    });
  }



  servicesController() {

    let services = [];
    let service;
    services = this.getPermissionServices();
    let render = [];
    let social_name;

    if (typeof services !== 'undefined') {

      Object.keys(services).map((service, i) => {

      render[i] = (
          <div key={i}>
            <div className="item-media"></div>
            <div className="item-inner">
              <div className="toogle-config ">{Helpers.socialIcon(service, 2)}
                <Toggle
                  label="View"
                  defaultToggled={this.state.checkedService[service].view}
                  onToggle={() => this.handleChange(service)}
                />
              </div>
            </div>
          </div >

        );

      });

    }
    // this.forceUpdate();
    return render;
  }

  render() {
    console.log(this.props);
    console.log('helpers,', Helpers.get(this.props, 'currentUser.profile.name'));
    return (
      <div>

        {/*<div className="content-block-title">Full Layout</div>*/}
        <div className="list-block">
          <ul>
            {/*{<!-- Text inputs -->}*/}
            <li>
              <div className="item-content">
                <div className="item-media"><i className="fa fa-user-circle fa-2x" /></div>
                <div className="item-inner">
                  <div className="item-title label font-app">Name</div>
                  <lable className="font-app">{Helpers.get(this.props, 'currentUser.profile.name')} </lable>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="fa fa-envelope-o fa-2x" /></div>
                <div className="item-inner">
                  <div className="item-title label font-app">E-mail</div>
                  <label className="font-app" htmlFor="email">{this.props.currentUser.registered_emails[0].address}</label>
                </div>
              </div>
            </li>
            {/*{...
            {/*{<!-- Date -->}*/}
            <li>
              <div className="item-content">
                <div className="item-media"><i className="fa fa-calendar fa-2x" /></div>
                <div className="item-inner">
                  <div className="item-title label font-app">Birth date</div>
                  <lable className="font-app" placeholder="Birth day"> {Helpers.get(this.props, 'currentUser.profile.birthday')} </lable>
                </div>
              </div>
            </li>
            {this.servicesController()}
            {/*{<!-- Textarea -->}*/}
            {/*<li className="align-top">
              <div className="item-content">
                <div className="item-media"><i className="icon f7-icons">chat</i></div>
                <div className="item-inner">
                  <div className="item-title label">Textarea</div>
                  <div className="item-input">
                    <textarea></textarea>
                  </div>
                </div>
              </div>
            </li>*/}
          </ul>
        </div>

      </div>
    );
  }
}

export default AccountConfiguration; 