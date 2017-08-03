// MessageList.jsx
import React, { Component, PropTypes } from 'react';
import InfiniteScroll from 'redux-infinite-scroll';
import ChatActions from './ChatActions';

class MessageList extends Component {
  _loadMore() {
    this.props.dispatch(ChatActions.fetchMessages())
  }
  
  _renderMessages() {
    return _.map(this.props.messages, (msg) => {
      return(
          <div>{msg}</div>
      )
    })
  }
  
  render() {
    return (
        <InfiniteScroll
          items={this._renderMessages()}
          loadMore={this._loadMore.bind(this)}
        />
    )
  }
}

export default MessageList;