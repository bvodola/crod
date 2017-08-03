import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import Meteor from  'react-meteor-client';
import i18n from 'meteor/universe:i18n';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import SwipeableViews from 'react-swipeable-views';
import { Page, ContentBlock, Navbar, ListItem, Popup, Button } from 'framework7-react';
import CommentList from './CommentList.jsx';



/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const styleClose = {
  float: 'right',
  color: '#ffca43',
  minWidth: '36px',
  marginRight: '-60px',
  marginTop: '-130px'
};

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported
class PopupComment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
    };
  }

  toComment(event) {
    event.preventDefault();
    let self = this;
    let text = this.refs.comment.value;
    let idTweet = this.props.data.id;
    let userTt = '@' + this.props.data.user.screen_name;

    if (this.props.data.service == 'facebook') {

      Meteor.call('commentFacebook', this.props.data.id, this.refs.comment.value, function (e, r) {
        if (e)
          console.log(e);

      });
      ReactDOM.findDOMNode(this.refs.comment).value = '';
    }

    if (this.props.data.service == 'twitter') {
      Meteor.call('postReplyFromTweet', text, idTweet, userTt, function (e, r) {
        if (e)
          console.log(e, r);
      });
      ReactDOM.findDOMNode(this.refs.comment).value = '';
    }
  }
  render() {

    let media = this.props.mediaRender();

    return (

      <Dialog
        title={
          <FlatButton
            icon={<i className="fa fa-times" aria-hidden="true"></i>}
            primary={true}
            onTouchTap={this.props.functionClose}
            style={styleClose} />
        }
        modal={false}
        open={this.props.opened}
        onRequestClose={this.props.functionClose}
        bodyStyle={{ overflowY: 'auto' }}
      >
        <div>
          {/*}<div className="card-header">
                <div className="facebook-avatar"><img src={this.props.data.user.image} width="34" height="34" /></div>
                <div className="facebook-name">{this.props.data.user.name}</div>
                <div className="facebook-date">{formattedDate}</div>
              </div>*/}
          <div className="card-content">
            <div className="card-content-inner">
              {/*
                  <div className="feedUnitService col s1 tittle-card-image">{Helpers.socialIcon(this.props.data.service, 2)}</div>
                  <p>{this.props.data.title}</p>
                  {media}
                  <div onMouseOver={this.showEmojis.bind(this)}>{this.state.emojis}</div>
                  <p className="color-gray">
                    <a className='likes'>
                      Likes: {(this.props.data.service == 'youtube')? this.props.data.likes : this.props.data.likes.length + this.props.likesCrodity }
                      </a>
                    Comments: {(this.props.data.service == 'youtube')? this.props.data.comments : this.props.data.comments.length}
                  </p>
                  */}
              <div className="item-input">
                <form className="list-block" onSubmit={this.toComment.bind(this)}>
                  <input type="text" ref="comment" placeholder="Comment..." id="comment" />
                </form>
              </div>
              <CommentList comments={this.props.data.comments} />
            </div>
          </div>

        </div >

      </Dialog>
    );
  }

}

export default PopupComment;
