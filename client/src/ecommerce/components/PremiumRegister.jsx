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
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
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


class PremiumRegister extends Component {

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
      expiry: '',
      expiration_month: 0,
      expiration_year: 0,
      cvv: '',
      savedInformation: false,
      new_card: false,
      entity: {
        fullName: '',
        email: '',
        birthDate: '',
      },
      // premium_info:{
      //   entity:{
      name: '',
      namePrefix: '',
      email: '',
      vatNumber: '',
      birthDate: null,
        // },
      // bankAccounts: [
          // {
      branchNumber: '',
      branchDigit: '',
      accountNumber: '',
      accountNumberDigit: '',
      bankErpId: '',
      accountType: 2,
          // }
        // ]
      // },
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
      typeUser: 'natural_person',
      lengths: {
        text: '50',
        email: '30',
        cpf: '15',
        cnpj: '18',
        branchNumber: '10',
        branchDigit: '5',
        accountNumber: '10',
        accountNumberDigit: '5',
      },
      bankValue: -1,
      banks: []
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
    console.log(this.props.banks);
    console.log(CPF.generate(true));
    // this.getItemCart.bind(this)();
    Meteor.call("getToken", (e, s) => {
      console.log(e, s);
    })
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
      finished: stepIndex >= 4,
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
    console.log('STEP', step)
    return (
      <div style={{ margin: '12px 0' }}>
        {step < 4 && (
          <RaisedButton
            label="Próximo"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={() => this.handleNext()}
            style={{ marginRight: 12 }}
          />
        )}
        {step > 0 && step < 4 && (
          <FlatButton
            label="Voltar"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={() => this.handlePrev()}
          />
        )}
        {step == 4 && (
          <FlatButton
            labelStyle={{ color: '#FFFFFF' }}
            backgroundColor="#FFCA43"
            labelColor="#FFFFFF"
            label="Confirmar"
            onTouchTap={() => this.becomePremium()}
          />
        )}
      </div>
    );
  };

  becomePremium(){

    let currentUser = this.props.currentUser;
    let premiumInfoState = this.state;

    //Change to catch the input after
    let vatNumberTemporary = CPF.generate(true);

    let futurePremiumUserInfo = {
      name: premiumInfoState.name,
      namePrefix: premiumInfoState.namePrefix,
      email: premiumInfoState.email,
      vatNumber: vatNumberTemporary,
      birthDate: premiumInfoState.birthDate,
      branchNumber: premiumInfoState.branchNumber,
      branchDigit: premiumInfoState.branchDigit,
      accountNumber: premiumInfoState.accountNumber,
      accountNumberDigit: premiumInfoState.accountNumberDigit,
      bankErpId: premiumInfoState.bankErpId,
      accountType: 2,
    }
    console.log(futurePremiumUserInfo);

    console.log('Become premium started');
    Meteor.call('becomePremium', currentUser, function(err, res){
      if(!err){
        console.log(res);
      }
      else console.log(err);
    });

    Meteor.call('registerSeller', currentUser, futurePremiumUserInfo, function(err, res){
      if(!err){
        console.log(res);
      }
      else console.log(err);
    });

  }

  handleCreditCard(type) {
    this.state[type] ? this.setState({ [type]: false }) : this.setState({ [type]: true })
  };

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
    let entity = this.state.entity
    entity = val;
    this.setState({ entity });
  }


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

  handleChange(event, index, installment) {
    this.setState({ installment })
  }

  setStateCard(value) {

    let _id = this.state._id
    _id = value
    console.log(value, '<---- chegou aqui')
    this.setState({ _id }, () => {
          console.log(this.state._id, '<---- chegou ID')
    })
  }


  renderCreditCard() {

    let buyerInfo = this.props.buyerInfo;

    if (typeof buyerInfo !== 'undefined') {
      return <CreditCard
        setStateCard={this.setStateCard.bind(this)}
        buyerInfo={buyerInfo}
        rev={true} />
    } else {
      console.log('Ta undefined!!')
    }

  }


  handlePaymentForms() {
    return (<SelectField
      floatingLabelText="Nº de parcelas:"
      value={this.state.installment}
      onChange={(event, index, installment) => this.handleChange(event, index, installment)}
      autoWidth={true}>
      <MenuItem value={1} primaryText="1x" />
      <MenuItem value={2} primaryText="2x" />
      <MenuItem value={3} primaryText="3x" />
      <MenuItem value={4} primaryText="4x" />
      <MenuItem value={5} primaryText="5x" />
      <MenuItem value={6} primaryText="6x" />
      <MenuItem value={7} primaryText="7x" />
      <MenuItem value={8} primaryText="8x" />
      <MenuItem value={9} primaryText="9x" />
      <MenuItem value={10} primaryText="10x" />
    </SelectField>);
  }

// ================================================
// ========= Premium info ==========================
// ================================================

  onChangeTypeUser(ev){
    this.setState({typeUser: ev.target.value});
  }

  setFieldPremium(field, ev){
    this.setState({[field]: ev.target.value});
  }

  setBank(ev, key, payload){
    this.setState({bankValue: key});
    this.setState({bankErpId: this.state.banks[key].code});
  }

  setbirthDatePremium(nullParameter, date){
    this.setState({birthDate: date});
  }

  renderBanks(){

    let banksInDiv = [];
    let self = this;
    let banks = self.state.banks;

    if(banks.length == 0){
      Meteor.call('getBanks', function(err, res){
        if(!err){
          self.setState({banks: res.banks});
        }
        else console.log(err);
      });
    }

			for (let i = 0; i < banks.length; i++) {
				banksInDiv[i] = <MenuItem value={i} primaryText={banks[i].name} />;
			}
    return banksInDiv;
  }

  render() {

    const { stepIndex } = this.state;
    let typeUser = this.state.typeUser;
    let premium_info = this.state;
    let lengths = this.state.lengths;

    //Setting the max birthDate
    let maxDate = new Date();

    (typeUser == 'natural_person') ?
      maxDate.setFullYear(maxDate.getFullYear() - 18)
      :maxDate.setFullYear(maxDate.getFullYear())
    maxDate = moment(maxDate).format('YYYY-MM-DD');

    $('.cpf-mask > input[type=text]').mask('000.000.000-00');
    $('.cnpj-mask > input[type=text]').mask('00.000.000/0000-00');
    $('.card-mask > input[type=text]').mask('0000 0000 0000 0000');
    $('.date-mask > input[type=text]').mask('00/00/0000');

    if (this.props.currentUser) {
      let stateAddress = this.state.address;
      return (
        <div className="">
          {this.getEncriptKey()}
          <div style={{ maxWidth: 450, maxHeight: 600, margin: '0' }}>
            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical"
            >

            {/* PERSONAL DATA*/}
            <Step>
              <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
                {(typeUser == 'natural_person') ? 'Dados pessoais': 'Dados empresariais'}
              </StepButton>
              <StepContent>
                <RadioButtonGroup
                  name="shipSpeed"
                  defaultSelected="natural_person"
                  valueSelected={typeUser}
                  onChange={(ev) => this.onChangeTypeUser(ev)}>
                  <RadioButton
                    value="natural_person"
                    label="Pessoa física"
                    labelStyle={{fontWeight: '100'}}
                  />
                  <RadioButton
                    value="legal_person"
                    label="Pessoa jurídica"
                    labelStyle={{fontWeight: '100'}}
                  />
                </RadioButtonGroup>

                  <div>
                    <TextField
                      floatingLabelText= {(typeUser == 'natural_person') ?
                        'CPF':'CNPJ'}
                      pattern="[0-9]*"
                      className={(typeUser == 'natural_person') ?
                        'cpf-mask':'cnpj-mask'}
                      floatingLabelFixed={true}
                      errorText={this.state.errorForm}
                      maxLength={(typeUser == 'natural_person') ?
                        lengths.cpf:lengths.cnpj}
                      name={(typeUser == 'natural_person') ?
                          'cpf':'cnpj'}
                      value={premium_info.vatNumber}
                      onChange={(ev) => this.setFieldPremium('vatNumber',ev)}
                    />
                    <TextField
                      floatingLabelText= {(typeUser == 'natural_person') ?
                      'Nome':'Nome fantasia'}
                      floatingLabelFixed={true}
                      type='text'
                      value={premium_info.name}
                      maxLength={lengths.textLength}
                      onChange={(ev) => this.setFieldPremium('name',ev)}
                    />
                    <TextField
                      floatingLabelText= {(typeUser == 'natural_person') ?
                      'Sobrenome':'Razão social'}
                      floatingLabelFixed={true}
                      value={premium_info.namePrefix}
                      maxLength={lengths.textLength}
                      onChange={(ev) => this.setFieldPremium('namePrefix',ev)}
                    />
                    <TextField
                      floatingLabelFixed={true}
                      floatingLabelText= 'E-mail'
                      value={premium_info.email}
                      maxLength={lengths.email}
                      onChange={(ev) => this.setFieldPremium('email',ev)}
                    />
                    <TextField
                      type="date"
                      value={premium_info.birthDate}
                      className="date-mask"
                      max={(typeUser == 'natural_person') ?
                        maxDate:''}
                      floatingLabelFixed={true}
                      floatingLabelText={(typeUser == 'natural_person') ?
                        'Data de nascimento':'Data de abertura'}
                      onChange={(ev) => this.setbirthDatePremium('birthDate', ev.target.value)}
                    />
                  </div>

                <div className="col s6 m6 l6">
                  {this.renderStepActions(0)}
                </div>
              </StepContent>
            </Step>

            {/* ADDRESS DATA*/}
              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
                  Endereços
                </StepButton>
                <StepContent>

                  <div>
                    <AddressForm
                      address={this.state.address.delivery}
                      handleAddressState={this.handleAddressState.bind(this)}
                      type="delivery" />
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
                  {this.state.billingAddress ? '' :
                    <AddressForm
                      address={this.state.address.billing}
                      handleAddressState={this.handleAddressState.bind(this)}
                      type="billing" />}

                  <div className="col s6 m6 l6">
                    {this.renderStepActions(1)}
                  </div>
                </StepContent>
              </Step>

              {/* BANK DATA*/}
                <Step>
                  <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
                    Dados bancários
                  </StepButton>
                  <StepContent>

                    <div>

                      <SelectField
                        floatingLabelText="Escolha seu banco"
                        value={this.state.bankValue}
                        onChange={(event, key, payload) => this.setBank(event, key, payload)}
                        maxHeight={300}
                      >
                        {this.renderBanks()}
                      </SelectField>

                      <TextField
                        floatingLabelText= 'Número da agência'
                        pattern="[0-9]*"
                        floatingLabelFixed={true}
                        value={premium_info.branchNumber}
                        maxLength={lengths.branchNumber}
                        onChange={(ev) => this.setFieldPremium('branchNumber',ev)}
                      />
                      <TextField
                        floatingLabelText= 'Dígito da agência'
                        floatingLabelFixed={true}
                        pattern="[0-9]*"
                        value={premium_info.branchDigit}
                        maxLength={lengths.branchDigit}
                        onChange={(ev) => this.setFieldPremium('branchDigit',ev)}
                      />
                      <TextField
                        floatingLabelText= 'Número da conta'
                        floatingLabelFixed={true}
                        pattern="[0-9]*"
                        value={premium_info.accountNumber}
                        maxLength={lengths.accountNumber}
                        onChange={(ev) => this.setFieldPremium('accountNumber',ev)}
                      />
                      <TextField
                        floatingLabelFixed={true}
                        floatingLabelText= 'Dígito da conta'
                        pattern="[0-9]*"
                        value={premium_info.accountNumberDigit}
                        maxLength={lengths.accountNumberDigit}
                        onChange={(ev) => this.setFieldPremium('accountNumberDigit',ev)}
                      />
                    </div>

                    <div className="col s6 m6 l6">
                      {this.renderStepActions(2)}
                    </div>
                  </StepContent>
                </Step>

              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 3 })}>
                  Selecione a forma de pagamento
                </StepButton>
                <StepContent>
                  <FlatButton
                    icon={
                      <FontIcon
                        color="black"
                        style={{ color: 'black' }}
                        className="material-icons">credit_card
                      </FontIcon>}
                    onTouchTap={() => this.handleCreditCard('creditCard')} />
                  <FlatButton
                    icon={<i className="fa fa-barcode fa-2x" ></i>} />
                  {/*{Payment Method, verify if selected payment method on credit card, render form field}*/}

                  {this.state.creditCard ?
                    <div>
                      <div>{this.renderCreditCard()}</div>
                      <div style={{ marginTop: '20px', color: 'gray', display: 'inline-block' }}>
                        Usar outro cartão:
                        <IconButton
                        style={{ width: 48, height: 48, padding: 0, float: 'right' }}
                        onTouchTap={() => this.handleCreditCard('new_card')}
                        iconStyle={{ width: 48, height: 48, color: 'gray' }}
                        iconClassName="material-icons">add_circle_outline</IconButton>
                      </div>

                      {this.state.new_card ?
                        <div>
                          <CardReactFormContainer
                            container="card-wrapper"
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

                            classes={{
                              valid: 'valid-input', // optional — default 'jp-card-valid'
                              invalid: 'invalid-input' // optional — default 'jp-card-invalid'
                            }
                            }
                            formatting={true} // optional - default true
                          >
                            <TextField
                              type="text"
                              floatingLabelText="Nome no cartão"
                              name="CCname"
                              defaultValue={this.state.full_name}
                              onChange={(ev) => this.handleChangeCreditCard('full_name', ev.target.value)} />

                            <TextField
                              type="text"
                              pattern="[0-9]*"
                              floatingLabelText="Número do cartão"
                              className="card-mask" name="CCnumber"
                              defaultValue={this.state.card_number}
                              onChange={(ev) => this.handleChangeCreditCard('card_number', ev.target.value)} />

                            <TextField
                              type="text"
                              pattern="[0-9]*"
                              floatingLabelText="CVC"
                              name="CCcvc"
                              value={this.state.cvv}
                              onChange={(ev) => this.handleChangeCreditCard('cvv', ev.target.value)} />

                            <TextField
                              type="text"
                              pattern="[0-9]*"
                              floatingLabelFixed={true}
                              floatingLabelText="Data de expiração do cartão (MM/AAAA)"
                              name="CCexpiry" defaultValue={this.state.expiry}
                              onChange={(ev) => this.handleChangeCreditCard('expiry', ev.target.value)} />

                            <TextField
                              type="text"
                              pattern="[0-9]*"
                              floatingLabelText="CPF"
                              className="cpf-mask"
                              errorText={this.state.errorForm}
                              maxLength="15" name="cpf"
                              value={this.state.cpf}
                              onChange={(ev) => this.handleChangeCreditCard('cpf', ev.target.value)} />

                          </CardReactFormContainer>

                          <div style={{ marginTop: '10px', marginBottom: '12px' }} id="card-wrapper">
                          </div>
                          <Toggle
                            label="Deseja salvar seus dados para a próxima compra?"
                            onToggle={() => this.handleToggle('savedInformation')}
                            defaultToggled={this.state.savedInformation}
                          />
                          {this.state.savedInformation ?
                            <PersonalForm
                              entity={this.state.entity}
                              handleEntityState={this.handleEntityState.bind(this)} /> : ''}
                        </div>
                        :
                        <div></div>}
                      <div> {this.handlePaymentForms()} </div>
                      <div>{this.renderStepActions(3)}</div>
                    </div> : <div></div>}

                </StepContent>
              </Step>

              <Step>
                <StepButton onTouchTap={() => this.setState({ stepIndex: 4 })}>
                  Review
                </StepButton>
                <StepContent>



                  <div className="col s6 m6 l6">
                    {this.renderStepActions(4)}
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


export default PremiumRegister;
