import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Route, Redirect, withRouter } from 'react-router'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import CardReactFormContainer from 'card-react';
import CreditCard from './CreditCard.jsx'
import Product from './Product.jsx'
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import { Helpers } from '../../helpers/Helpers';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AddressForm from './AddressForm.jsx';
import { CPF } from 'cpf_cnpj'
import PersonalForm from './PersonalForm.jsx'




class Checkout extends Component {



  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      creditCard: false,
      billingAddress: true,
      installment: 1,
      _id: '',
      _idOrder: '',
      quantity: 0,
      credit_card: {},
      full_name: '',
      card_number: '',
      delivery: '',
      expiry: '',
      expiration_month: 0,
      expiration_year: 0,
      cvv: '',
      savedInformation: false,
      ads: {},
      new_card: false,
      entity: {
        fullName: '',
        email: '',
        birthDate: '',
      },
      errorForm: '',
      zipCode: '',
      cpf: '',
      address: {
        billing: {
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          number: '',
          complement: '',
          errorForm: '',
          zipCode: '',
        },
        delivery: {
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          number: '',
          complement: '',
          errorForm: '',
          zipCode: '',
        }
      },

    };

    this.style = {
      footerButton: {
        label: {
          fontSize: '14px',
          width: '10vw',
          margin: 'none'
        },
        icon: {
          fontSize: '16px',
          marginLeft: '0'
        }
      },
      starColor: {
        textColor: '#ffd700'
      },
      truckIcon: {
        transform: 'scale(-1, 1)',
        textAlign: 'center'
      },
      radioButton: {
        fontWeight: '400'
      }
    }
  }

  componentDidMount() {
    console.log(this.props.buyerInfo, '<--- dados do cartão')
    console.log(CPF.generate(true));
    this.getItemCart.bind(this)();
    $('.cpf-mask > input[type=text]').mask('000.000.000-00');
    $('.card-mask > input[type=text]').mask('0000 0000 0000 0000');
  }

  handleNext() {
    const { stepIndex } = this.state;

    if (stepIndex == 0) {
      let obj = {
        full_name: this.state.full_name,
        card_number: this.state.card_number.replace(/([" "])/g, ''),
        expiry: this.state.expiry,
        cvv: this.state.cvv,
        entity: {
          cpf: CPF.strip(this.state.cpf),
          birth_date: this.state.entity.birthDate,
          email: this.state.entity.email,
          full_name: this.state.entity.fullName
        }
      }

      this.setState({ credit_card: obj }, () => {
        console.log(this.state.credit_card, '<-- State', obj, '<-- Object')
      })
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleToggle(type) {
    if (!this.state[type]) {
      this.setState({ [type]: true })
    } else {
      this.setState({ [type]: false })
    }

  }

  renderStepActions(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        {step == 0 && (
          <RaisedButton
            label="Próximo"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={() => this.handleNext()}
            style={{ marginRight: 12 }}
          />
        )}
        {step == 1 && (
          <RaisedButton
            label="Próximo"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={() => this.handleNext()}
            style={{ marginRight: 12 }}
          />
        )}
        {step > 0 && step < 2 && (
          <FlatButton
            label="Voltar"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={() => this.handlePrev()}
          />
        )}
        {step == 2 && (
          <FlatButton
            labelStyle={{ color: '#FFFFFF' }}
            backgroundColor="#FFCA43"
            labelColor="#FFFFFF"
            label="Confirmar"
            onTouchTap={() => this.order()}
          />
        )}
      </div>
    );
  };

  handleCreditCard(type) {
    console.log(this.props.buyerInfo, '<--- dados do cartão')
    this.state[type] ? this.setState({ [type]: false }) : this.setState({ [type]: true })
  };

  handleQuantity(qty) {
    console.log(qty, '<-- Quantidade check')
    this.setState({ quantity: qty })
  }

  paymentMethod() {
    return this.state.installment;
  }

  getItemCart() {
    let cart = localStorage.getItem('cart')
    cart = JSON.parse(cart);
    let qty = cart[0].qty;
    console.log(qty, '<-- Quantidade')
    this.setState({ quantity: qty })
    this.setState({ ads: cart })
    return cart;
  }

  getEncriptKey() {
    // Meteor.call('idGenerator', (e, response)=> {
    //   if(e){
    //     console.log(e);
    //   }else console.log(typeof parseInt(response));
    // })
    // setTimeout(function() {
    //    Meteor.call('openSession', (e, response)=> {
    //   if(e){
    //     console.log(e);
    //   }else console.log(success);
    // })
    // }, 1000);
  }

  handleAddressState(type, val) {
    console.log('handleAddressState() <----- ', val);
    // this.state.address[type] = val;
    // let obj = address.delivery;
    let address = this.state.address;

    if (type == 'delivery') {
      delete val.errorForm
      delete val.address
      address.delivery = val;
      this.state.billingAddress ? address.billing = val : "";
    }
    if (type == 'billing') {
      delete val.errorForm
      delete val.address
      address.billing = val;
    }

    this.setState({ address: address });
  }

  handleEntityState(val) {
    console.log('handleAddressState() <----- ', val);
    let entity = this.state.entity
    entity = val;
    this.setState({ entity });
  }

  handleChangeDeliveryOptions(val) {
    console.log(val, '<-------- Value')
    this.setState({ delivery: val }, () => {
      console.log(this.state.delivery, '<--- Status no setState')
    });
    console.log(this.refs.radioGroup.valueSelected)
    this.setState({ disabled: false });
  }

  deliveryOptions() {

    if (typeof this.props.ad !== 'undefined') {

      let delivery_options = this.props.ad.delivery_options;
      console.log(delivery_options, '<-- Delivery Options');

      return (
        <div style={{ marginTop: '8px' }} >
          <RadioButtonGroup ref='radioGroup' name="shipSpeed" onChange={(ev) => this.handleChangeDeliveryOptions(ev.target.value)} valueSelected={this.state.delivery}>
            {delivery_options.map((delivery, i) => (
              <RadioButton
                key={i}
                value={delivery.name}
                label={delivery.name}
                ref={delivery.name} 
                labelStyle={this.style.radioButton}
                iconStyle={this.style.radioButton}
              />
            ))}
          </RadioButtonGroup>
        </div>
      );
    }
  };

  handleChangeCreditCard(type, value) {
    if (type === 'expiry') {
      let value2 = value.replace(/[//"]/, '')
      this.setState({ expiry: value })
    }
    if (type === 'cpf') {
      this.setState({ cpf: value })
      if (CPF.isValid(value)) {
        this.setState({ cpf: value })
        this.setState({ errorForm: '' })
      } else {
        this.setState({ errorForm: "Invalid" })
      }
    }
    else {
      this.setState({ [type]: value }, () => {
        console.log(this.state[type])
      })
    }


  }

  order() {

    console.log(this.state.ads);

    let orderObj = {
      seller_id: this.props.ad.seller_id,
      installments: this.state.installment,
      total_purchase: (this.state.quantity * this.props.ad.price),
      delivery_option: this.state.delivery,
      ad: this.state.ads,
      address: this.state.address,
      payment_info: {
        info: this.state.credit_card,
        save: this.state.savedInformation,
        card_holder: this.state._id
      }
    }
    console.log('order = ', orderObj)
    let _idOrder = Meteor.call('insertOrder', orderObj, (error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success)
        this.setState({ _idOrder: success }, () => {
          console.log(this.state._idOrder, '<--- _id()');
          this.props.router.history.push("/confirmationOrder/" + this.state._idOrder)
        });
      }
    })

  }

  handleChange(event, index, installment) {
    this.setState({ installment })
  }

  setStateCard(value) {

    let _id = this.state._id
    _id = value
    console.log(value, '<---- chegou aqui')
    console.log(_id, '<---- chegou ID')
    this.setState({ _id }, () => {
      console.log(this.state._id, '<---- chegou ID')
    })
  }


  renderCreditCard() {
    console.log(this.props.buyerInfo, '<--- PropsBuyerInfo()')
    let buyerInfo = this.props.buyerInfo;
    if (typeof buyerInfo !== 'undefined') {
      console.log('não ta undefined!!')
      return <CreditCard setStateCard={this.setStateCard.bind(this)} buyerInfo={buyerInfo} rev={true} />
    } else {
      console.log('Ta undefined!!')
    }


  }


  handlePaymentForms() {
    let value = this.props.ad.installments
    value = value.replace(/([x])/g, '')
    value = parseInt(value)
    let render = []
    for (let i = 0; i < value; i++) {
      render[i] = <MenuItem value={i + 1} primaryText={i + 1 + "x"} />
    }
    return render;
  }


  render() {

    const { stepIndex } = this.state;
    if (typeof this.props.ad !== 'undefined') {
      console.log(this.props)
      let stateAddress = this.state.address;
      return (
        <div className="">
          {this.getEncriptKey()}
          <div style={{ maxWidth: 450, maxHeight: 600, margin: 'auto' }}>
            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical"
            >
              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
                  Selecione a forma de pagamento
            </StepButton>
                <StepContent>
                  <FlatButton icon={<FontIcon color="black" style={{ color: 'black' }} className="material-icons">credit_card</FontIcon>}
                    onTouchTap={() => this.handleCreditCard('creditCard')} />
                  <FlatButton icon={<i className="fa fa-barcode fa-2x" ></i>} />
                  {/*{Payment Method, verify if selected payment method on credit card, render form field}*/}

                  {this.state.creditCard ?
                    <div>
                      <div>{this.renderCreditCard()}</div>
                      <div style={{ marginTop: '20px', color: 'gray', display: 'inline-block' }}> Usar outro cartão: <IconButton
                        style={{ width: 48, height: 48, padding: 0, float: 'right' }}
                        onTouchTap={() => this.handleCreditCard('new_card')}
                        iconStyle={{ width: 48, height: 48, color: 'gray' }}
                        iconClassName="material-icons">add_circle_outline</IconButton> </div>
                      {this.state.new_card ?
                        <div>
                          <CardReactFormContainer
                            // the id of the container element where you want to render the card element.
                            // the card component can be rendered anywhere (doesn't have to be in ReactCardFormContainer).
                            container="card-wrapper" // required
                            // an object contain the form inputs names.
                            // every input must have a unique name prop.
                            formInputsNames={
                              {
                                number: 'CCnumber', // optional — default "number"
                                expiry: 'CCexpiry',// optional — default "expiry"
                                cvc: 'CCcvc', // optional — default "cvc"
                                name: 'CCname' // optional - default "name"
                              }
                            }
                            // initial values to render in the card element
                            initialValues={
                              {
                                number: this.state.card_number, // optional — default •••• •••• •••• ••••
                                cvc: this.state.cvv, // optional — default •••
                                expiry: this.state.expiry, // optional — default ••/••
                                name: this.state.full_name // optional — default FULL NAME
                              }
                            }
                            // the class name attribute to add to the input field and the corresponding part of the card element,
                            // when the input is valid/invalid.
                            classes={{
                              valid: 'valid-input', // optional — default 'jp-card-valid'
                              invalid: 'invalid-input' // optional — default 'jp-card-invalid'
                            }
                            }
                            // specify whether you want to format the form inputs or not
                            formatting={true} // optional - default true
                          >
                            <TextField type="text" floatingLabelText="Nome no cartão" name="CCname" defaultValue={this.state.full_name} onChange={(ev) => this.handleChangeCreditCard('full_name', ev.target.value)} />
                            <TextField type="text" pattern="[0-9]*" floatingLabelText="Número do cartão" className="card-mask" name="CCnumber" defaultValue={this.state.card_number} onChange={(ev) => this.handleChangeCreditCard('card_number', ev.target.value)} />
                            <TextField type="text" pattern="[0-9]*" floatingLabelText="CVC" name="CCcvc" value={this.state.cvv} onChange={(ev) => this.handleChangeCreditCard('cvv', ev.target.value)} />
                            <TextField type="text" pattern="[0-9]*" floatingLabelFixed={true} floatingLabelText="Data de expiração do cartão (MM/AAAA)" name="CCexpiry" defaultValue={this.state.expiry} onChange={(ev) => this.handleChangeCreditCard('expiry', ev.target.value)} />
                            <TextField type="text" pattern="[0-9]*" floatingLabelText="CPF" className="cpf-mask" errorText={this.state.errorForm} maxLength="15" name="cpf" value={this.state.cpf} onChange={(ev) => this.handleChangeCreditCard('cpf', ev.target.value)} />
                          </CardReactFormContainer>
                          <div style={{ marginTop: '10px', marginBottom: '12px' }} id="card-wrapper">
                          </div>
                          <Toggle
                            label="Deseja salvar seus dados para a próxima compra?"
                            onToggle={() => this.handleToggle('savedInformation')}
                            defaultToggled={this.state.savedInformation}
                          />
                          {this.state.savedInformation ? <PersonalForm entity={this.state.entity} handleEntityState={this.handleEntityState.bind(this)} /> : ''}

                        </div> : <div></div>}
                      <div>      <SelectField
                        floatingLabelText="Nº de parcelas:"
                        value={this.state.installment}
                        onChange={(event, index, installment) => this.handleChange(event, index, installment)}
                        autoWidth={true}>
                        {this.handlePaymentForms()}
                      </SelectField>
                      </div>
                      <div>{this.renderStepActions(0)}</div>
                    </div> : <div></div>}





                </StepContent>
              </Step>
              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
                  Endereço
            </StepButton>
                <StepContent>
                  <div>
                    <AddressForm address={this.state.address.delivery} handleAddressState={this.handleAddressState.bind(this)} type="delivery" />
                  </div>
                  <Toggle
                    label="O endereço de cobrança é o mesmo?"
                    onToggle={() => this.handleToggle('billingAddress')}
                    defaultToggled={this.state.billingAddress}
                  />
                  {/*============================================
                     == {The billing address is the same?
                     == if True will not render new form, if false will render new form.}
                     ============================================*/}
                  {this.state.billingAddress ? '' : <AddressForm address={this.state.address.billing} handleAddressState={this.handleAddressState.bind(this)} type="billing" />}

                  {this.deliveryOptions()}
                  <div className="col s6 m6 l6">
                    {this.renderStepActions(1)}
                  </div>
                </StepContent>
              </Step>
              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
                  Review
            </StepButton>
                <StepContent>

                  <Product
                    ad={this.props.ad}
                    rev={true}
                    paymentMethod={this.state.installment}
                    purchaseTotal={this.state.quantity * this.props.ad.price}
                    qty={this.state.quantity}
                    address={this.state.address.delivery}
                  />

                  {/*<Card>
                    <CardMedia
                      overlay={<CardTitle title={'$' + this.props.ad.price} subtitle={'Payment conditions ... '} />}
                    >
                      <img src={this.props.ad.image_url} alt="" />
                    </CardMedia>
                    <CardText>
                    </CardText>
                  </Card>*/}

                  <div className="col s6 m6 l6">
                    {this.renderStepActions(2)}
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </div>
        </div >
      );
    }
    else {
      return <div> {this.props.loading} </div>
    }
  }
}


export default withRouter(Radium(Checkout));
