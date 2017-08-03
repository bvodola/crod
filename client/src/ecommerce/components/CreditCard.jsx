import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import CardReactFormContainer from 'card-react';
import Toggle from 'material-ui/Toggle';
import { Helpers } from '../../helpers/Helpers';
import SelectField from 'material-ui/SelectField';
import { CPF } from 'cpf_cnpj'
import IconMenu from 'material-ui/IconMenu';
import CardForm from './CardForm.jsx'
import { withRouter } from 'react-router';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Ativar</MenuItem>
    <MenuItem>Suspender</MenuItem>
    <MenuItem>Deletar</MenuItem>
  </IconMenu>
);


class CreditCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      value: 0,
      entity: {
        email: '',
        cpf: '',
        full_name: '',
        card_number: '',
        expiry: '',
        card_holder: ''
      },
      _id: '',
      errorForm: ''
    }
    this.style = {
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      addCard: {
        width: 48,
        height: 48,
        color: 'gray'
      },
    }

  }

  componentWillMount() {
    if (typeof this.props.buyerInfo !== 'undefined') {
      let info = this.props.buyerInfo
      let card_holder = this.state.entity.card_holder
      card_holder = this.props.buyerInfo._card_holder_UUID
      this.setState({ card_holder }, () => {
        console.log(this.state.entity.card_holder)
      })
    }
  }

  setStateCard(event, index, value) {

    let self = this
    console.log(value, '<----  VALOR ')
    this.setState({ value }, () => {
      let idSet = self.props.buyerInfo.card[self.state.value]._card_UUID
      let _id = self.state._id
      _id = idSet
      self.setState({ _id }, ()=> {
        self.props.setStateCard(self.state._id)
      })
      
      console.log(self.state._id, '<--- valor no SetState')
    })
  }

  handleChangeCreditCard(val) {
    console.log('handleAddressState() <----- ', val);
    let entity = this.state.entity
    entity = val;
    this.setState({ entity });
  }

  handleChange() {
    let card_holder = this.state.entity.card_holder
    let uuid = this.props.buyerInfo._card_holder_UUID
    card_holder = this.props.buyerInfo._card_holder_UUID
    console.log(this.props.buyerInfo._card_holder_UUID)
    this.setState({ card_holder }, () => {
      console.log(this.state.entity.card_holder, '<---- NO SETSTATE')
    })
    { this.state.openForm ? this.setState({ openForm: false }) : this.setState({ openForm: true }) }
  }

  addCard() {
    let objSave = {
      payment_info: {
        info: this.state.entity,
        save: true,
        card_holder: this.props.buyerInfo._card_holder_UUID
      }
    }
    Meteor.call('addCreditCard', objSave, (error, success) => {
      console.log(error, success)
    })
  }

  getCardInfo() {
    // .map((card, i) => {
    Meteor.call('getCardHolder', this.props.buyerInfo.card, this.props.buyerInfo._id, (error, success) => {
      console.log(error, success)
    })
    // })
  }


  componentDidMount() {

  }

  renderCard() {

    if (typeof this.props.buyerInfo !== 'undefined') {
      let info = this.props.buyerInfo
      let render = []
      let styleOfImg = {}
      info.card.map((card, i) => {
        console.log('chegou no if!', i, '<--  Rodou')
        if (this.props.rev) {
          styleOfImg = {
            height: '40px',
            width: '40px',
            marginBottom: '22px',
            marginRight: '5px'
          }
          render[i] = (

            <MenuItem
              key={i}
              maxHeight={600}
              value={i}
              primaryText={<div>
                <p style={{ margin: '0px 0px 0px 10px' }}>
                  <span style={{ color: darkBlack }}> {Helpers.creditCardIcon(card.card_details.cardBrand.toLowerCase(), styleOfImg)}{card.card_details.pan}</span><br />
                </p>
              </div>}
              style={{ margin: '12px 0px 0px 15px',  top:'-10px' }}
            />

          )

        } else {
          styleOfImg = {
            height: '60px',
            width: '60px'
          }
          render[i] = (
            <div key={i}>
              <ListItem
                leftAvatar={<div>
                  {Helpers.creditCardIcon(card.card_details.cardBrand.toLowerCase(), styleOfImg)}</div>}
                rightIconButton={rightIconMenu}
                style={{ margin: '12px 0px 0px 15px' }}
                secondaryText={
                  <p style={{ margin: '12px 0px 0px 15px' }}>
                    <span style={{ color: darkBlack }}>{card.card_details.name}</span><br />
                    {card.card_details.pan}
                  </p>}
                secondaryTextLines={2}
              />
              <Divider inset={true} />

            </div>)
          console.log(render.length, '<--- Montou ')

        }

      })
      return render;
    } else {
      return (<div style={{ textAlign: 'center' }} >
        <FontIcon color="gray" style={{ fontSize: '10vw' }} className="material-icons">sentiment_very_dissatisfied</FontIcon>
        <div style={{ color: "gray" }}>Ops! Você não possui cartões adicionados ainda. </div>
      </div>)
    }
  }

  render() {


    if (typeof this.props.buyerInfo !== 'undefined') {

      return(
        <div>
        {this.props.rev ? <div></div> : <div>
          <div style={{ marginTop: '20px', color: 'gray', display: 'inline-block' }}> Adicionar novo cartão<IconButton
            style={{ width: 48, height: 48, padding: 0, float: 'right' }}
            onTouchTap={() => this.handleChange()}
            iconStyle={{ width: 48, height: 48, color: 'gray' }}
            iconClassName="material-icons">add_circle_outline</IconButton> </div>
          <Divider />
          {this.state.openForm ?
            <div>
              <CardForm entity={this.state.entity} handleChangeCreditCard={this.handleChangeCreditCard.bind(this)} />
              <FlatButton onTouchTap={() => this.addCard()} labelStyle={{ color: '#FFF' }} backgroundColor="#FFCA43" label="Salvar" />
            </div>
            : <div></div>}
        </div>}
        {this.props.rev ? <SelectField style={{ marginTop: '20px' }} value={this.state.value} onChange={(event, index, value) => this.setStateCard(event, index, value)}>
          {this.renderCard()}
        </SelectField> : <List style={{ padding: '10px 16px 16px 16px' }} >
            {this.renderCard()}
          </List>
        }
      </div>)
    }
    else {
      return <div>
        {this.props.loading}</div>
    }
  }

}

export default CreditCard
