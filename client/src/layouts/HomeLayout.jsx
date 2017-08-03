import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Page, ContentBlock, Navbar, ListItem} from 'framework7-react';
class HomeLayout extends Component {

  componentDidMount() {
    let self = this;

    if (this.props.currentUser != null) {
      Meteor.call('getUserRegisteredEmails', function (error, result) {
        //console.log(result);
        Meteor.call('getUserRegisteredPhones', function (error2, result2) {
          // console.log(result2);
          // console.log("teste");
          //  console.log("result "+result.length);
          //  console.log("result2" + result2.length);
          //If the user has no email or cellphone registered then the page
          //RegisterConfirmation is show
          if (result.length == 0 || result2.length == 0) {
            self.props.router.push('/RegisterConfirmation');
          }
        });
      });
    }
  }

  render() {

    return (
      <Page>
      <div className="page">

          <div className='div-feed-post'>
            <div className="row no-gutter">
              <div className="col-50">
                <div className="content content-logged">{this.props.children}</div>
              </div>
              <div className="col-50">
              </div>
            </div>
          </div>

      </div>
      </Page>
    );
  }
}

export default withRouter(HomeLayout);
