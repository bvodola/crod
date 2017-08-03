import React, { Component } from 'react';

class Main extends Component {
	
	redirectToLogin() {
    if(!this.props.currentUser) {
      this.props.router.push('/login');
    }
  }

  componentWillMount() {
    this.redirectToLogin();
  }

  componentWillReceiveProps() {
    this.redirectToLogin();
  }

	render() {
		return(<div className="main-component">{this.props.children}</div>);
	}
}

export default Main;
