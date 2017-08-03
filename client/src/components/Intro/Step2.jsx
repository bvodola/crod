import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import { ButtonsLoginDrawer } from '../LoginButtons.jsx';

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
    background: '#3b5998',
    color: '#fff',
    padding: '8px 11px',
    borderRadius: '100%',
    fontSize: '16px',
  },

  name: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
}

class Step2 extends Component {

  handleSubmit() {
    let { history } = this.props;
    Meteor.call('updateUserIntroStep', 3, () => {
      history.push('/intro/3');
    });
  }


  render() {
    let { currentUser } = this.props;

      return(
        <div>

          <p style={style.wrapper}>
            Crodity une suas redes sociais em um único lugar.
            Conecte em suas redes sociais abaixo.
          </p>

          <ButtonsLoginDrawer currentUser={currentUser} />

          <RaisedButton onTouchTap={() => this.handleSubmit()} label="Avançar" primary={true} fullWidth={true} />
        </div>
      );

  }
}

export default Step2;
