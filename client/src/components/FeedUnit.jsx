import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { Helpers } from '../helpers/Helpers';

import Meteor from  'react-meteor-client';
import i18n from 'meteor/universe:i18n';
import { Page, ContentBlock, Navbar, ListItem, Popup, Button } from 'framework7-react';
import Likes from './Likes.jsx';
import { Posts } from '../../../api/posts.js';
import Share from './Share.jsx';
import PopupComment from './PopupComment.jsx';
import Carousel from 'react-bootstrap/lib/Carousel';


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
// import Swipe from 'react-swipe-component';

/*Can't wait! @kassmorganbooks - https://t.co/M6w2e5coZ6
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const style = {
  imageWrapper: {
    margin: '0 -16px 16px -16px'
  },
  image: {
    width: '100%'
  },
  video: {
    width: '100%'
  }
}

class FeedUnit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      emojis: false,
      isOver: false,
      postType: 'home',
      likesCrodity: [],
      likesOpened: false,
      shareOpened: false,
      popupCommentOpened: false,
    };

    this.style = {
      testElement: {
        background: '#fff',
        ':hover': {
          background: '#f00'
        }
      },
      footerButton: {
        label: {
          fontSize: '14px'
        },
        icon: {
          fontSize: '16px',
          marginLeft: '0'
        }
      }
    }
  }




  componentDidMount() {
    Helpers.defineLanguage();
    Meteor.subscribe('posts');

    if (this.props.feedType == 'profile') {
      let post = Posts.findOne({ external_id: this.props.data.id });

      if(typeof post !== 'undefined') {
        this.setState({ likesCrodity: post.crodity_reactions });
      }
    }
  }


  reactToPost(event) {
    //TODO all the reactions and send to the social network
    event.preventDefault();
    let self = this;

    try {
      Meteor.call('likeCrodity', this.props.data, this.props.data.user.name, 'like', () => {
        let like = Posts.findOne({ external_id: self.props.data.id }).crodity_reactions;

        console.log(this.props.data, this.props.data.user.name);
        // Meteor.call('checkLikeCrodity', this.props.data.id, function (e, r) {
        //   if (e){
        //     console.log(e);
        //   }else{
        //     console.log('result of checkLikeCrodity',r);
        //     if(r){
        //       self.setState({likesCrodity: like});
        //     }else{
        self.setState({ likesCrodity: like });
        //     }
        //     console.log(self.state.likesCrodity);
        //   }
        // });
      });
    } catch (e) {
      console.log('Não foi possível curtir, erro:', e);
    }
  }

  showEmojis() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      this.state.emojis = <div className="emojis" onMouseOver={this.showEmojis.bind(this)} onMouseLeave={this.hideEmojis.bind(this)}>
        <div onClick={this.reactToPost.bind(this, 'like')} className='emojione-unit' >{emojione.shortnameToUnicode(':thumbsup:')}</div>
        <div onClick={this.reactToPost.bind(this, 'love')} className='emojione-unit' > {emojione.shortnameToUnicode(':heart:')}</div>
        <div onClick={this.reactToPost.bind(this, 'laughing')} className='emojione-unit' > {emojione.shortnameToUnicode(':laughing:')}</div>
        <div onClick={this.reactToPost.bind(this, 'crying')} className='emojione-unit' >{emojione.shortnameToUnicode(':sob:')}</div>
        <div onClick={this.reactToPost.bind(this, 'surprised')} className='emojione-unit' >{emojione.shortnameToUnicode(':hushed:')}</div>
      </div>;
    } else {
      this.state.emojis = <div className="emojis" onMouseOver={this.showEmojis.bind(this)} onMouseLeave={this.hideEmojis.bind(this)}>
        <div onClick={this.reactToPost.bind(this, 'like')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':thumbsup:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'love')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':heart:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'laughing')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':laughing:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'crying')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':sob:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'surprised')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':hushed:'))}</div>
      </div>
    }
    this.state.isOver = true;
    this.forceUpdate();
  }

  textVerify() {
    let data = this.props.data;
    let self = this;
    let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    let text;

    var mediaDescription = '';

    var link = '';

    let textDescription = {
      link: '',
      description: ''
    }

    try {

      mediaDescription = '';
      link = '';

      textDescription = {
        link: '',
        description: ''
      }

      text = '';

      text = Helpers.get(data, 'media.description');

      text.replace(urlRegex, function (u) {
        if (typeof u !== 'undefined')
          self.link = u;
        else
          self.link = ''

        return self.link;
      })

      mediaDescription = text.replace(urlRegex, function (u) {
        return '';
      })

      textDescription = {
        link: self.link,
        description: mediaDescription
      }
    }

    catch (e) {
      // console.log(e);
      textDescription = {
        link: '',
        description: ''
      }
    }

    return (textDescription);
  }

  mediaRender() {

    let data = this.props.data;
    let self = this;
    let media;

    if (Helpers.get(data, 'media.type') == 'text') {
      return (
        <div>
          <p> {this.textVerify().description ? this.textVerify().description : data.content} </p>
          {this.textVerify().link ? <a target="_blank" href={this.textVerify().link}> {this.textVerify().link} </a> : ""}
          {Helpers.get(data, 'media.link') ? <a target="_blank" href={Helpers.get(data, 'media.link')}>  link  </a> : ""}
        </div>
      );
    }

    if (Helpers.get(data, 'media.type') == 'video') {
      return (
        <div>
          <p> {this.textVerify().description} </p>
          <a target="_blank" href={this.textVerify().link}> {this.textVerify().link} </a>
          <p>{Helpers.get(data, 'media.link') ? <a target="_blank" href={Helpers.get(data, 'media.link')}>  link  </a> : ""}</p>

          {data.service == 'youtube' ? <iframe width="100%" height="300" src={Helpers.get(data, 'media.post_video')} frameBorder="0" allowFullScreen></iframe> :
            <video style={style.video} loop preload="auto" className="video" src={Helpers.get(data, 'media.post_video')} controls> </video>}

        </div>
      );
    }

    if (Helpers.get(data, 'media.type') == 'photo') {
      return (
        <div>
          <div style={style.imageWrapper}>
            <img style={style.image} src={Helpers.get(data, 'media.post_image')} />
          </div>
          <p>{this.textVerify().description}</p>
          {this.textVerify().link ? <a target="_blank" href={this.textVerify().link}> {this.textVerify().link} </a> : ""}
          {Helpers.get(data, 'media.link') ? <a target="_blank" href={Helpers.get(data, 'media.link')}> link </a> : ""}
        </div>
      );
    }

    if (Helpers.get(data, 'media.type') == 'checkin') {
      return (
        <div>
          <p>{Helpers.get(data, 'location.name_location')}</p>
          <img src={Helpers.get(data, 'media.post_image')} />
          <p>{Helpers.get(data, 'media.description')}</p>
        </div>
      );
    }

    if (Helpers.get(data, 'media.type') == 'gif') {
      return <video style={style.video} loop preload="auto" className="video" src={Helpers.get(data, 'media.post_video')} autoPlay> </video>;
    }

    if (Helpers.get(data, 'media.type') == 'album') {
      let album = [];
      let post_image = [];
      post_image = Helpers.get(data, 'media.post_image');
      let i = 0;
      return (<div className="" key={i++}>
        <Carousel slide={false} wrap={false} >
          {post_image.map((img_src, i, album) => {
            return (
              <Carousel.Item >
                <img  src={img_src} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>);
    }

  }

  hideEmojis() {
    this.state.isOver = false;

    let self = this;
    //This syntax is used to pass arguments to the setTimeout function
    setTimeout(verifyIsOver.bind(null, self), 1000);

    function verifyIsOver(self) {
      if (self.state.isOver == false) {
        self.setState({ emojis: false });
      }
    }
    this.forceUpdate();
  }

  showLikes(event) {
    event.preventDefault();
    this.setState({ likesOpened: true });
  }

  hideLikes(event) {
    this.setState({ likesOpened: false });
  }

  showShare(event) {
    event.preventDefault();
    this.setState({ shareOpened: true });
  }

  hideShare(event) {
    this.setState({ shareOpened: false });
  }


  showComment(event) {
    event.preventDefault();
    this.setState({ popupCommentOpened: true });
  }

  hideComment(event) {
    this.setState({ popupCommentOpened: false });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {

    let data = this.props.data;
    let type = this.props.feedType;
    formattedDate = moment(data.created).calendar();

    if (typeof data !== 'undefined') {
      media = this.mediaRender();

      return (

        <div className="feed-unit-component">
          <Card className='mui-card'>
            <CardHeader
              title={data.user.name}
              subtitle={<div> {formattedDate} &#8226; <T>common.Social_actions.by</T> <a href='' className='link-social-network'> {data.service.charAt(0).toUpperCase() + data.service.slice(1)}</a></div>}
              avatar={data.user.image}
            />
            <CardTitle title={data.title} />
            <CardText className='card-text'>
              {media}
              <div onMouseOver={this.showEmojis.bind(this)}>{this.state.emojis}</div>

              <p className="color-gray">

                <Likes opened={this.state.likesOpened}
                  likesCrodity={this.state.likesCrodity}
                  likesSocialNetwork={data.likes}
                  functionClose={(event) => this.hideLikes(event)} />

                <a className='likes' href="#"
                  onClick={(event) => this.showLikes(event)}>
                  Likes: {(data.service == 'youtube') ? data.likes.length :
                    (data.service == 'twitter') ? this.state.likesCrodity.length + data.likes :
                      data.likes.length + this.state.likesCrodity.length}


                </a>
                {
                  (data.service !== 'twitter') ? 'Comments: ' + data.comments.length: ''
                }
              </p>
            </CardText>
            <CardActions className='card-footer'>
                  <FlatButton
                    labelStyle={this.style.footerButton.label}
                    onTouchTap={(ev) => this.reactToPost(ev)}
                    label='Like'
                    icon={<FontIcon style={this.style.footerButton.icon} className="material-icons">thumb_up</FontIcon>}
                  />
                  <FlatButton
                    labelStyle={this.style.footerButton.label}
                    onTouchTap={(ev) => this.showComment(ev)}
                    label={(data.service == 'twitter') ? 'Reply' : 'Comment'}
                    icon={<FontIcon style={this.style.footerButton.icon} className="material-icons">{(data.service == 'twitter') ? 'reply' : 'comment'}</FontIcon>}
                  />
                  <FlatButton
                    labelStyle={this.style.footerButton.label}
                    onTouchTap={(ev) => this.showShare(ev)}
                    label='Share'
                    icon={<FontIcon style={this.style.footerButton.icon} className="material-icons">share</FontIcon>}
                  />




              <PopupComment opened={this.state.popupCommentOpened}
                functionClose={(event) => this.hideComment(event)}
                data={data}
                mediaRender={(event) => this.mediaRender(event)}
                likesCrodity={this.state.likesCrodity}
              />

              <Share opened={this.state.shareOpened}
                functionClose={(event) => this.hideShare(event)}
              />

            </CardActions>
          </Card>
        </div>

      );

    }
  }
}


export default Radium(FeedUnit);
