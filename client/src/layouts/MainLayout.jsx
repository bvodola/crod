import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AppBarContainer from '../containers/AppBarContainer.jsx';
import MainDrawer from '../components/Drawer.jsx';
import Player from '../components/Player.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpened: false,
      playerActive: false,
      width: $(window).width()
    };
  }

  componentWillMount() {
    let { currentUser, history } = this.props;
    if(currentUser.intro.show) {
      history.push('/intro/'+currentUser.intro.step);
    }
  }

  handleDrawerState(open, reason) {
    if(typeof open === 'undefined') {
      open = !this.state.isDrawerOpened;
    }
    this.setState({
      isDrawerOpened: open
    });
  }

  handleTogglePlayer() {
    this.setState({
      playerActive: !this.state.playerActive
    });
  }

  render() {

    let { currentUser } = this.props;

    return (
      <div className="main-layout" style={{ 'background': 'White', minHeight: '100%' }}>
        <AppBarContainer
          handleDrawerState={this.handleDrawerState.bind(this)}
          screenWidth={this.state.width}
          handleTogglePlayer={(event) => this.handleTogglePlayer(event)} />

        <div className="main container">
          <div className="row">
            <div className="col s12 m12 l3 offset-l1">

              <MainDrawer currentUser={currentUser}
                isDrawerOpened={this.state.isDrawerOpened}
                handleDrawerState={this.handleDrawerState.bind(this)}
              />
            </div>

            <div className="col s12 m12 l7">
              {this.props.children}
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(MainLayout);

React.propTypes = {
  currentUser: React.PropTypes.object
}
