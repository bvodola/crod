import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import ReactDOM from 'react-dom';
import i18n from 'meteor/universe:i18n';

/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    Helpers.defineLanguage();
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="card-content">
        <div className="list-block media-list">
          <ul>
            <li className="item-content">
              <div className="item-media">
                <img src={this.props.comment.fromImg} width="44" />
              </div>
              <div className="item-inner">
                <div className="item-title-row">
                  <div className="item-title"> {this.props.comment.from} </div>
                </div>
                <div className="item-subtitle">{this.props.comment.message} </div>
              </div>
            </li>
            <span style={{ cursor: 'pointer' }} className="blue-text"><T>common.Social_actions.like</T></span> &nbsp;
            <span style={{ cursor: 'pointer' }} className="blue-text" onClick={this.handleToggle.bind(this)}><T>common.Social_actions.answer</T></span>
            {this.state.open ? <textarea ref="comment" placeholder="Responder" id="comment" className="materialize-textarea"></textarea> : ''}
          </ul>
        </div>
      </div>

    );
  }
}


export default Comment;
