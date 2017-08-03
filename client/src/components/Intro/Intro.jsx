import React, { Component } from 'react';
import Meteor from  'react-meteor-client';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Step1 from  './Step1.jsx';
import Step2 from  './Step2.jsx';
import Step3 from  './Step3.jsx';

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

class Intro extends Component {

  render() {

    let { currentUser } = this.props;

    return(
      <div style={style.componentWrapper}>

        <div style={style.wrapper}>
          <img style={style.logo} src="/img/logo_crodity.png" alt="Crodity Logo"/>
        </div>
        <Router>
          <Switch>
            <Route path='/intro/1' render={({history}) => <Step1 history={history} currentUser={currentUser} />} />
            <Route path='/intro/2' render={({history}) => <Step2 history={history} currentUser={currentUser} />} />
            <Route path='/intro/3' render={({history}) => <Step3 history={history} currentUser={currentUser} />} />
            <Redirect to='/intro/1' />
          </Switch>
        </Router>
      </div>
    );

  }
}

export default Intro;
