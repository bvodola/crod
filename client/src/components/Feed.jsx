import React, { Component } from 'react';
import FeedUnit from './FeedUnit.jsx';
import { Helpers } from '../helpers/Helpers';
import { Page, ContentBlock, Navbar, ListItem, Popup, Button } from 'framework7-react';
import RaisedButton from 'material-ui/RaisedButton';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from 'material-ui/LinearProgress';


let style = {
  margin: "10px"
}

class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: false,
      feedMore: [],
      morePosts: [],
      refreshFeed: [],
      intitialLoad: true,
      feed: props.feed,
      currentUser: props.currentUser
    };
    this.getMorePosts = this.getMorePosts.bind(this);
  }

  //////////////////////////////////////////////////
  //// Calling  prop getAllFeeds for more posts  //
  ////////////////////////////////////////////////


  getMorePosts() {

    let self = this;

    let feedMore = this.state.feedMore;

    self.props.getAllFeeds();
    self.setState({ feedMore: feedMore.concat(this.state.feed) });
    // self.setState((prevState) => { return {feedMore: prevState.feedMore.concat(feed)} });
    self.forceUpdate();
  }


  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
      currentUser: nextProps.currentUser,
    });

  }

  // getRecentPosts(type) {
  // 	localStorage.setItem('Feed', JSON.stringify(this.props.feed));
  // 	console.log(JSON.parse(localStorage.Feed), '<-- feedMountedStorage');
  // }

  ////////////////////////////////////////////////
  //// Receiving contents for first render 	 //
  //////////////////////////////////////////////

  componentDidMount() {
    let self = this;
    this.state.pagination = this.props.pageFeed;


    // setTimeout(() => {
    //    this.props.getAllFeeds();
    //   // let feedmore =
    //   this.state.feedMore = this.props.feed;
    //   this.setState({ feedmore: this.props.feed })
    // }, 800);
    setTimeout(() => {
      self.props.getAllFeeds();
      self.state.feedMore = self.state.feed;
    }, 500);

  }





  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  /////////////////////////////////////
  ///   Render Feed component       ///
  /////////////////////////////////////


  render() {
    let feed;


    if (this.props.feedType == 'home') {

      return (
        <div className="feed">
          <div className="padded-full">
            <InfiniteScroll
              next={this.getMorePosts}
              hasMore={true}
              scrollThreshold={1}
              {...feed = this.state.feedMore}
              loader={<LinearProgress mode="indeterminate" />} >
              {feed.map((feedUnitData, i) => (
                <FeedUnit feedType={this.props.feedType} data={feedUnitData} key={i} posthomeId={i} />
              ))}
            </InfiniteScroll>
            <div ref="end"> </div>
          </div>
        </div>
      );
    }

    if (this.props.feedType == 'profile') {

      return (
        <div className="feed">
          <div className="padded-full">
            <InfiniteScroll
              next={this.getMorePosts}
              hasMore={true}
              {...feed = this.state.feedMore}
              loader={<LinearProgress mode="indeterminate" />} >
              {feed.map((feedUnitData, i) => (
                <FeedUnit feedType={this.props.feedType} data={feedUnitData} key={i++} posthomeId={i} />
              ))}
            </InfiniteScroll>
            <div ref="end"> </div>
          </div>
        </div>

      );
    }
  }
}

export default Feed;
