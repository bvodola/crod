import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Relationships } from '../../../api/relationships.js';

// Material UI
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Ad } from '../../../api/ad.js';
import Subheader from 'material-ui/Subheader';

import { browserHistory } from 'react-router';

const T = i18n.createComponent();

class AppBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openApps: false,
      textSearch: false,
      dataSource: [],
    };

    this.style = {
      navbar: {
        borderBottom: '2px solid #ddd',
        borderRadius: '0'
      },
      rightIcons: {
        width: '36px',
        padding: '2px 6px 3px 6px'
      },
      menuIcon: {
        padding: '12px 0',
        width: '24px',
        float: 'left',
        'marginRight': '5px'
      },
      searchIcon: {
        marginLeft: '-12px'
      }
    }
  }

  componentDidMount() {
    Helpers.defineLanguage();
  }

  handleUpdateInput(text) {

    let arrUsers = Meteor.users.find({ "profile.name": { $regex: text, $options: 'i' } }).fetch();
    let arrAds = Ad.find({ "title": { $regex: text, $options: 'i' } }).fetch();

    this.setState({
      textSearch: text,
    });
    let arrView = [];

    //Inserting a label showing "Users"
    arrView[0] = {
      text: text,
      value: (

        <MenuItem
          containerElement={<Link to={"/profile/"}></Link>}
          primaryText={
            <div>
              <div style={{ fontWeight: '600' }}>Users</div>
            </div>
          }
        />

      )
    }

    //Inserting the result of users
    for (let i = 0; i < arrUsers.length; i++) {

      //Removing if it's me
      // if(arrUsers[i]._id == this.props.currentUser._id){
      //   arrUsers.splice(i);
      // }

      //If it isn't just me
      if (!(arrUsers.length < 1) && (i < 3)) {
        arrView[i + 1] = {
          text: arrUsers[i].profile.name,
          value: (

            <MenuItem
              containerElement={<Link to={"/profile/" + arrUsers[i]._id}></Link>}
              leftIcon={<img src={arrUsers[i].profile.image}></img>}
              primaryText={arrUsers[i].profile.name}
            />

          )
        }
      }

    }

    //If there isn't results for users showing "No results"
    if (arrUsers.length < 1) {
      arrView[1] = {
        text: text,
        value: (
          <MenuItem
            containerElement={<Link to={"/ads/"}></Link>}
            primaryText={
              <div>
                <div style={{ color: 'gray' }}>No results</div>
              </div>
            }
          />

        )
      }
      //If there is results for users showing "See all"
    } else {
      arrView[4] = {
        text: text,
        value: (
          <MenuItem
            containerElement={<Link to={"/search/" + "users/" + text}></Link>}
            primaryText={
              <div>
                <div style={{ color: 'blue' }}>See all</div>
              </div>
            }
          />

        )
      }
    }

    //Inserting the label showing "products"
    arrView[5] = {
      text: text,
      value: (

        <MenuItem
          containerElement={<Link to={"/ads/"}></Link>}
          primaryText={
            <div>
              <div style={{ fontWeight: '600' }}>Ads</div>
            </div>
          }
        />

      )
    }

    //Inserting the result of products
    for (let i = 0; i < arrAds.length; i++) {

      //If it isn't just me
      if (!(arrAds.length < 1) && (i < 3)) {
        arrView[6 + i] = {
          text: arrAds[i].title,
          value: (

            <MenuItem
              containerElement={<Link to={"/adPage/" + arrAds[i]._id}></Link>}
              leftIcon={<img src={arrAds[i]}></img>}
              primaryText={arrAds[i].title}
            />

          )
        }
      }

    }

    //If there isn't results for products
    if (arrAds.length < 1) {
      arrView[6] = {
        text: text,
        value: (
          <MenuItem
            containerElement={<Link to={"/ads/"}></Link>}
            primaryText={
              <div>
                <div style={{ color: 'gray' }}>No results</div>
              </div>
            }
          />

        )
      }
      //If there is results for products showing "See all"
    } else {
      arrView[9] = {
        text: text,
        value: (
          <MenuItem
            containerElement={<Link to={"/search/" + "ads/" + text}></Link>}
            primaryText={
              <div>
                <div style={{ color: 'blue' }}>See all</div>
              </div>
            }
          />

        )
      }
    }
    console.log(arrView)
    this.setState({
      dataSource: arrView,
    });
    arrView = "";
  };

  handleRequestCloseApps() {
    this.setState({
      openApps: false,
    });
  }

  handleTouchTapApps(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openApps: true,
      anchorEl: event.currentTarget,
    });
  };

  handleOpenSearch(event) {
    event.preventDefault();
    browserHistory.push("/search/all/" + this.state.textSearch);
  };

  render() {

    return (
      <div className="navbar" style={this.style.navbar}>
        <div className="navbar-inner container">
          <div className="row">
            <div className="col l10 offset-l1">
              <div className="left logo-crodity">


                <Link to='/' className='cn-font'>
                  <img src="/img/MARCA_CRODITY.png"></img>
                </Link>

              </div>
              <div className="left">

                <form onSubmit={(event) => this.handleOpenSearch(event)}>


                  <AutoComplete
                    hintText="Busca"
                    dataSource={this.state.dataSource}
                    onUpdateInput={(event) => this.handleUpdateInput(event)}
                    filter={AutoComplete.caseInsensitiveFilter}
                    style={{
                      width: '50vw',
                    }}
                    textFieldStyle={{
                      height: '38px',
                      width: 'inherit'
                    }}
                    maxSearchResults={10}
                  />
                  <IconButton style={this.style.searchIcon} onTouchTap={(event) => this.findUsers(event)} iconClassName="material-icons">search</IconButton>

                </form>

              </div>
              <div className="right">
                <IconButton style={this.style.menuIcon}
                className='hide-m-up'
                iconClassName="material-icons"
                onTouchTap={() => this.props.handleDrawerState(true)}>menu</IconButton>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}

//exporting the component AppBar, it'll be used where the AppBar.jsx is imported
export default AppBar;
