import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../../helpers/Helpers.jsx';
import Meteor from  'react-meteor-client';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views

import SwipeableViews from 'react-swipeable-views';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import Divider from 'material-ui/Divider';


import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { Ad } from '../../../../api/ad';
import Slider from 'material-ui/Slider';

const T = i18n.createComponent();

const styles = {
  default_button:{
    borderRadius: '50px',
    minWidth: '40px',
    width: '1px',
    border: '1px solid'
  },
  active_button:{
    borderRadius: '50px',
    minWidth: '40px',
    width: '1px',
    border: '1px solid',
    backgroundColor: '#FF8C00',
    color: 'white'
  },
  active_div:{
    display: 'inline-grid',
    color:'#FF8C00',
    textAlign: '-webkit-center'
  },
  default_div:{
    display: 'inline-grid',
    color:'black',
    textAlign: '-webkit-center'
  },
  slider:{
    color: 'blue',
    backgroundColor: 'red'
  },
  firstDivider:{
    marginBottom: '20px'
  },
  divider:{
    marginBottom: '10px',
    marginTop: '10px'
  },
  icons:{
    marginBottom: '5px',
  },
  slide: {
    padding: 10,
  },
  floatingButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
};

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slideIndexOrdination: 0,
      buttonFreeShipping: false,
      buttonInterestFree: false,
      sliderPriceMaximum: 1000,
      sliderPriceMinimum: 0,
      screenSize: $(window).width(),
      filters: []
    };
  }

  componentDidMount() {
    Helpers.defineLanguage();
  }

  handleSliderMaximum(event, value) {
    this.setState({sliderPriceMaximum: value});
  };

  handleSliderMinimum(event, value) {
    this.setState({sliderPriceMinimum: value});
  };

  handleChangeOrdination(value){

    this.setState({
      slideIndexOrdination: value,
    });

  };

  handleChangeButton(button){
    //Property computed names
    this.setState({
      [button]: !this.state[button],
    });

  };

  applyFilters(){
    this.props.defineFilters('sliderPriceMaximum', this.state.sliderPriceMaximum);
    this.props.defineFilters('sliderPriceMinimum', this.state.sliderPriceMinimum);
    this.props.defineFilters('slideIndexOrdination', this.state.slideIndexOrdination);
    this.props.defineFilters('buttonFreeShipping', this.state.buttonFreeShipping);
    this.props.defineFilters('buttonInterestFree', this.state.buttonInterestFree);
    this.handleClose();
  }

  clearFilters(){
    this.setState({ sliderPriceMaximum: 1000,});
    this.setState({ sliderPriceMinimum: 0,});
    this.setState({ slideIndexOrdination: 0,});
    this.setState({ buttonFreeShipping: false,});
    this.setState({ buttonInterestFree: false,});
  }

  handleOpen(event){
    this.setState({
      open: true,
    });
  };

  handleClose(event){
    this.setState({
      open: false,
    });
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.handleClose()}
        />,
      <FlatButton
        label="Clear filters"
        onTouchTap={() => this.clearFilters()}
        />,
      <FlatButton
        label="Apply"
        keyboardFocused={true}
        onTouchTap={() => this.applyFilters()}
        />,
    ];

    return(
      <div>

        {(this.state.screenSize > 600)? <Dialog
          title="Select the filters"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
          autoScrollBodyContent={true}
          style={{textAlign: 'center'}}
          >

          <Divider style={styles.firstDivider}/>

          <div className= 'container' style={{width: 'auto'}}>
            Ordination
            <Divider style={styles.divider}/>
            <div className='row'>
              <div
                onClick={() => this.handleChangeOrdination(0)}
                style={(this.state.slideIndexOrdination == 0) ? styles.active_div : styles.default_div}
                className='col s4'>

                <FlatButton
                  style={(this.state.slideIndexOrdination == 0) ? styles.active_button : styles.default_button}
                  icon={<i className="fa fa-list-ol fa-lg" aria-hidden="true" style={styles.icons}></i>}
                  >

                </FlatButton>
                By <br/>relevance
              </div>

              <div
                onClick={() => this.handleChangeOrdination(1)}
                style={(this.state.slideIndexOrdination == 1) ? styles.active_div : styles.default_div}
                className='col s4'>
                <FlatButton
                  style={(this.state.slideIndexOrdination == 1) ? styles.active_button : styles.default_button}
                  icon={<i className="fa fa-sort-numeric-asc fa-lg" aria-hidden="true" style={styles.icons}></i>}
                  >

                </FlatButton>
                Lowest <br/> price
              </div>

              <div
                onClick={() => this.handleChangeOrdination(2)}
                style={(this.state.slideIndexOrdination == 2) ? styles.active_div : styles.default_div}
                className='col s4'>
                <FlatButton
                  style={(this.state.slideIndexOrdination == 2) ? styles.active_button : styles.default_button}
                  icon={<i className="fa fa-sort-numeric-desc fa-lg" aria-hidden="true" style={styles.icons}></i>}
                  >

                </FlatButton>
                Biggest <br/> price
              </div>

            </div>

          </div>

          <Divider style={styles.divider}/>

          <div className= 'container' style={{width: 'auto'}}>
            Advantages
            <Divider style={styles.divider}/>
            <div className='row'>
              <div
                onClick={() => this.handleChangeButton('buttonFreeShipping')}
                style={(this.state.buttonFreeShipping) ? styles.active_div : styles.default_div}
                className='col s6'>

                <FlatButton
                  style={(this.state.buttonFreeShipping) ? styles.active_button : styles.default_button}
                  icon={<i className="fa fa-truck fa-lg" aria-hidden="true" style={styles.icons}></i>}
                  >

                </FlatButton>
                Free shipping
              </div>

              <div
                onClick={() => this.handleChangeButton('buttonInterestFree')}
                style={(this.state.buttonInterestFree) ? styles.active_div : styles.default_div}
                className='col s6'>
                <FlatButton
                  style={(this.state.buttonInterestFree) ? styles.active_button : styles.default_button}
                  icon={<i className="fa fa-credit-card fa-lg" aria-hidden="true" style={styles.icons}></i>}
                  >

                </FlatButton>
                Interest free
              </div>

            </div>

          </div>

          <Divider style={styles.divider}/>

          <div>
            Minimum Price: R$ {this.state.sliderPriceMinimum}
            <Divider style={styles.divider}/>
            <Slider
              value={this.state.sliderPriceMinimum}
              onChange={this.handleSliderMinimum.bind(this)}
              defaultValue={1000}
              min={0}
              max={1000}
              step={1}
              />
          </div>

          <Divider style={styles.divider}/>

          <div>
            Maximum Price: R$ {this.state.sliderPriceMaximum}
            <Divider style={styles.divider}/>
            <Slider
              value={this.state.sliderPriceMaximum}
              onChange={this.handleSliderMaximum.bind(this)}
              defaultValue={1000}
              min={0}
              max={1000}
              step={1}
              />
          </div>

        </Dialog>
        :
        <FullscreenDialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title={'Select the filters'}
          style={{textAlign: 'center'}}
          containerStyle={{padding: '10px'}}
          actionButton={<FlatButton
            label='Apply'
            onTouchTap={() => this.applyFilters()}
            />}
            >
            <Divider style={styles.firstDivider}/>

            <div className= 'container' style={{width: 'auto'}}>
              Ordination
              <Divider style={styles.divider}/>
              <div className='row'>
                <div
                  onClick={() => this.handleChangeOrdination(0)}
                  style={(this.state.slideIndexOrdination == 0) ? styles.active_div : styles.default_div}
                  className='col s4'>

                  <FlatButton
                    style={(this.state.slideIndexOrdination == 0) ? styles.active_button : styles.default_button}
                    icon={<i className="fa fa-list-ol fa-lg" aria-hidden="true" style={styles.icons}></i>}
                    >

                  </FlatButton>
                  By <br/>relevance
                </div>

                <div
                  onClick={() => this.handleChangeOrdination(1)}
                  style={(this.state.slideIndexOrdination == 1) ? styles.active_div : styles.default_div}
                  className='col s4'>
                  <FlatButton
                    style={(this.state.slideIndexOrdination == 1) ? styles.active_button : styles.default_button}
                    icon={<i className="fa fa-sort-numeric-asc fa-lg" aria-hidden="true" style={styles.icons}></i>}
                    >

                  </FlatButton>
                  Lowest <br/>price
                </div>

                <div
                  onClick={() => this.handleChangeOrdination(2)}
                  style={(this.state.slideIndexOrdination == 2) ? styles.active_div : styles.default_div}
                  className='col s4'>
                  <FlatButton
                    style={(this.state.slideIndexOrdination == 2) ? styles.active_button : styles.default_button}
                    icon={<i className="fa fa-sort-numeric-desc fa-lg" aria-hidden="true" style={styles.icons}></i>}
                    >

                  </FlatButton>
                  Biggest <br/>price
                </div>

              </div>

            </div>

            <Divider style={styles.divider}/>

            <div className= 'container' style={{width: 'auto'}}>
              Advantages
              <Divider style={styles.divider}/>
              <div className='row'>
                <div
                  onClick={() => this.handleChangeButton('buttonFreeShipping')}
                  style={(this.state.buttonFreeShipping) ? styles.active_div : styles.default_div}
                  className='col s6'>

                  <FlatButton
                    style={(this.state.buttonFreeShipping) ? styles.active_button : styles.default_button}
                    icon={<i className="fa fa-truck fa-lg" aria-hidden="true" style={styles.icons}></i>}
                    >

                  </FlatButton>
                  Free shipping
                </div>

                <div
                  onClick={() => this.handleChangeButton('buttonInterestFree')}
                  style={(this.state.buttonInterestFree) ? styles.active_div : styles.default_div}
                  className='col s6'>
                  <FlatButton
                    style={(this.state.buttonInterestFree) ? styles.active_button : styles.default_button}
                    icon={<i className="fa fa-credit-card fa-lg" aria-hidden="true" style={styles.icons}></i>}
                    >

                  </FlatButton>
                  Interest free
                </div>

              </div>

            </div>

            <Divider style={styles.divider}/>

            <div>
              Minimum Price: R$ {this.state.sliderPriceMinimum}
              <Divider style={styles.divider}/>
              <Slider
                value={this.state.sliderPriceMinimum}
                onChange={this.handleSliderMinimum.bind(this)}
                defaultValue={1000}
                min={0}
                max={1000}
                step={1}
                />
            </div>

            <Divider style={styles.divider}/>

            <div>
              Maximum Price: R$ {this.state.sliderPriceMaximum}
              <Divider style={styles.divider}/>
              <Slider
                value={this.state.sliderPriceMaximum}
                onChange={this.handleSliderMaximum.bind(this)}
                defaultValue={1000}
                min={0}
                max={1000}
                step={1}
                />
            </div>

            <div>
              <FlatButton
              label="Clear filters"
              onTouchTap={() => this.clearFilters()}
              />
            </div>
          </FullscreenDialog>}


          {(this.state.screenSize > 600) ? <FloatingActionButton
            style={styles.floatingButton}
            onTouchTap={(event) => this.handleOpen(event)}
            >
            <i className="fa fa-filter fa-lg" aria-hidden="true"></i>
          </FloatingActionButton>
          :
          <FloatingActionButton
            style={styles.floatingButton}
            onTouchTap={(event) => this.handleOpen(event)}
            >
            <i className="fa fa-filter fa-lg" aria-hidden="true"></i>
          </FloatingActionButton>}
        </div>
      )
    }
  }

  export default Filter;
