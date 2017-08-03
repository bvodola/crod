import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import Meteor from  'react-meteor-client';
import i18n from 'meteor/universe:i18n';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import SwipeableViews from 'react-swipeable-views';



/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

const styleClose = {
  float: 'right',
  color: '#ffca43',
  minWidth: '36px',
  marginRight:'-60px',
  marginTop: '-130px'
};

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported
class Likes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      contentLikesSocialNetwork: this.setContentLikesSocialNetwork(),
      contentLikesCrodity: this.setContentLikesCrodity()
    };
  }


  handleChange(value){
    this.setState({slideIndex: value});
  }

  setContentLikesCrodity(){
    if(Array.isArray(this.props.likesCrodity)) {
      return (
        <div>
          {this.props.likesCrodity.map((like,i,likes) => (
            <div key={i}>{like.name}</div>
          ))}
        </div>
      );
    } else {
      return (<span></span>);
    }
  }

  setContentLikesSocialNetwork(){
    if(Array.isArray(this.props.likesSocialNetwork)) {
      return (
        <div>
          {this.props.likesSocialNetwork.map((like,i,likes) => (
            <div key={i}>{like.name}</div>
          ))}
        </div>
      );
    } else {
      return (<span></span>);
    }


  }

  render() {

    return(

      <Dialog
        title={
          <div>
            <Tabs
              onChange={(event) => this.handleChange(event)}
              value={this.state.slideIndex}>
              <Tab
                value={0}
                icon={<FontIcon className="material-icons">favorite</FontIcon>}
                label={"External reactions" + " ("+this.props.likesSocialNetwork.length + ")"}
              />
              <Tab
                value={1}
                icon={<img src='/img/MARCA_CRODITY.png' height="30px"/>}
                label={"Crodity reactions" + " ("+this.props.likesCrodity.length + ")"}
              />
            </Tabs>
            <FlatButton
              icon={<i className="fa fa-times" aria-hidden="true"></i>}
              primary={true}
              onTouchTap={this.props.functionClose}
              style={styleClose}/>
          </div>
        }

        modal={false}
        open={this.props.opened}
        onRequestClose={this.props.functionClose}
        bodyStyle={{overflowY: 'auto'}}
        >

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          >
          <div>
            {this.state.contentLikesSocialNetwork}
          </div>
          <div>
            {this.state.contentLikesCrodity}
          </div>
        </SwipeableViews>

      </Dialog>
    );
  }

}

export default Likes;
