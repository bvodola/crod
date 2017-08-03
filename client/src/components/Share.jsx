import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import Meteor from  'react-meteor-client';
import i18n from 'meteor/universe:i18n';

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const style = {
  margin: 12,
};

const styleClose = {
  float: 'right',
  color: '#ffca43',
  minWidth: '36px',
  margin:'-60px'
};

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported
class Share extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shareOpened: false,
    };
  }

  showShare(event){
    event.preventDefault();
    this.setState({ shareOpened: true });
    console.log('THIS.STATE.SHAREOPENED', this.state.shareOpened)
  }

  hideShare(){
    event.preventDefault();
    this.setState({ shareOpened: false });
    console.log('THIS.STATE.SHARE', this.state.shareOpened)
  }

  // =======================

  // Getting error:
  // XMLHttpRequest cannot load https://twitter.com/intent/tweet?text=hello.
  // No 'Access-Control-Allow-Origin' header is present on the requested resource.
  // Origin 'http://3b833ad8.ngrok.io' is therefore not allowed access.

  // =====================================

  render() {

    return (
      <div>

        <Dialog
          title={
            <div>Choose the social networks to share:
              <FlatButton
            icon={<i className="fa fa-times" aria-hidden="true"></i>}
            primary={true}
            onTouchTap={this.props.functionClose}
            style={styleClose}/>
            </div>
          }

          modal={false}
          open={this.props.opened}
          onRequestClose={this.props.functionClose}
          autoScrollBodyContent={true}
          >

          <FlatButton
            href="https://m.facebook.com/plugins/post/oembed.json/?url=http://stackoverflow.com/questions/43457172/cors-on-meteor-isnt-working-what-am-i-doing-wrong"
            icon={<i className="fa fa-facebook-square left fa-lg white-color"></i>}
            className="facebook-background-color white-color"
            label="Facebook"
            style={style}
            />

          <FlatButton
            href="https://twitter.com/intent/tweet?text=hello"
            icon={<i className="fa fa-twitter-square left fa-lg white-color"></i>}
            label="Twitter"
            className="twitter-background-color white-color"
            style={style}
            />

          <FlatButton
            href="whatsapp://send?text=Text to share!"
            className="whatsapp-background-color white-color"
            label="WhatsApp"
            icon={<i className="fa fa-whatsapp fa-lg white-color"></i>}
            style={style}
            />

        </Dialog>

      </div>
    );

  }

}

export default Share;
