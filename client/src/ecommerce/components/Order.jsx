import React, { Component } from 'react';

import i18n from 'meteor/universe:i18n';
import { Helpers } from '../../helpers/Helpers.jsx';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router-dom';
import Enum from '../../../../api/enum.json';
import { Ad } from '../../../../api/ad';
import Chip from 'material-ui/Chip';
import { red500, lightGreenA700 } from 'material-ui/styles/colors';
import Tracker from './Tracker.jsx';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const T = i18n.createComponent();

let styleDrawer = {
  position: 'inherit',
  zIndex: "1",
}

class Order extends Component {

  constructor(props) {
    super(props)

    this.style = {
      title: {
        textAlign: 'center',
        color: 'black',
        boxShadow: '2px 2px 5px #888888'
      },
      textField: {
        align: 'center'
      }
    },

      this.state = {
        state: false,
        stepIndex: 0,
        id: this.props.match.params.orderId,
        creditCard: false,
        status: 99, //Undefined
        sendTrackCodeButton: false, //Enables the button to send the track code
        trackCode: '' //Code used to track the package
      }
  }

  componentDidMount() {
    Helpers.defineLanguage();
    //this.handleStepIndex()
  }

  /*componentDidUpdate(){
    this.handleStepIndex(this.props.order.status)
     console.log('OLHA AKI HENRIQUE STATUS = ', this.props.order.status)
  }*/

  handleChangeCreditCard() {
    if (!this.state.creditCard) {
      this.setState({ creditCard: true })
    } else {
      this.setState({ creditCard: false })
    }
  }

  paymentStatus() {

    if (typeof this.props.payment !== 'undefined') {
      console.log("Ola To na função!")
      let captures = this.props.payment.captures
      return captures.map((capture, i) => {
        console.log(capture.status_code)
        switch (capture.status_code) {
          case "0":
            return (<Chip><Avatar color={lightGreenA700} icon={<FontIcon className="material-icons">done</FontIcon>} />Aprovado</Chip>)
          case "9":
            return (<Chip><Avatar color={red500} icon={<FontIcon className="material-icons">error</FontIcon>} />Recusado</Chip>)
        }
      })
    }

  }

  finishPurchase(_id) {
    this.updateStatus(_id, 4)
    this.setState({ stepIndex: 4 }) //Purchase finished
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  handleStepIndex(status) {

    console.log('status = ', status)

    if (this.state.status !== status) {
      switch (status) {
        //switch (status) {
        case 0:
          this.setState({ stepIndex: 0, status: 0 }) //Waiting for payment confirmation
          break
        case 1:
          this.setState({ stepIndex: 1, status: 1 }) //Waiting for the input of the track code // Waiting for the delivery in hands
          break
        case 2:
          this.setState({ stepIndex: 2, status: 2 }) //Product in transit 
          break
        case 3:
          this.setState({ stepIndex: 3, status: 3 }) //Buyer has already received the product (Waiting feedback to seller)
          break
        case 4:
          this.setState({ stepIndex: 4, status: 4 }) //Purchase finished
          break

      }
    }

  }

  handleSendCode(orderID) {
    console.log('handleSendCode()')
    console.log('Track code = ', this.state.trackCode, 'Order ID = ', orderID)
    if (this.state.trackCode !== '') {
      this.updateStatus(orderID, 2) //Product Sent to the buyer
      Meteor.call('insertTrackCode', orderID, this.state.trackCode, function (error, result) {
        console.log(error)
        console.log(result)
      })
    } else console.log('Track Code empty!')
  }

  handleTextChange() {
    //this.setState({ errorCep: '', disabled: false })
    if (this.refs.trackCode.getValue() != '') {
      this.setState({ errorTrackCode: '', sendCodeButton: true, trackCode: this.refs.trackCode.getValue() })
    }
    else this.setState({ errorTrackCode: 'Esse campo é obrigatório', sendTrackCodeButton: true })
  }

  updateStatus(id, status) {
    console.log('order ID = ', id, 'Status = ', status)
    // 4 = Purchase finished
    Meteor.call('updateOrderStatus', id, status, function (error, result) {
      console.log(error)
      console.log(result)
    })
    this.handleStepIndex(3)
  }

  render() {
    const { finished, stepIndex } = this.state;

    console.log('THIS.PROPS = ', this.props);
    if (this.props.order && this.props.ad) {//&& this.props.payment) {
      console.log('order = ', this.props.order)
      this.handleStepIndex(this.props.order.status)
      console.log('User type == ', this.props.user_type)
      return (
        <div>
          <List>
            <Subheader>Informações da compra</Subheader>
            <ListItem
              primaryText={this.props.ad.title}
              secondaryText={this.props.ad.price}
              leftAvatar={<Avatar src={this.props.ad.images[0]} />}
              containerElement={<Link to={"/adPage"}></Link>}
            />
            <Subheader>Forma de pagamento</Subheader>
            <ListItem
              hoverColor="#FFFFFF"
              onTouchTap={() => this.handleChangeCreditCard()}
              rightAvatar={<div style={{ position: 'absolute', margin: '10px', top: '-28px', left: '16px', height: '80px', width: '80px' }} >
                {Helpers.creditCardIcon('mastercard', style = { width: '60px', height: '60px' })}</div>}
            />
            {this.state.creditCard ? <div>

              {/*<Subheader>{this.props.order.payment_method}</Subheader>
              <Subheader>{"Cartão Nº " + this.props.payment.cardDisplayNumber}</Subheader>
              <Subheader>{"Total da compra:  R$" + this.props.payment.captures[0].amount}</Subheader>
              <Subheader>{"Parcelado em: " + this.props.order.installments + "x"}</Subheader>*/}
              <Divider />
            </div> : ""}

            <Subheader>Forma de entrega</Subheader>
            <ListItem
              primaryText={this.props.order.delivery_option}
              leftAvatar={
                <i className="fa fa-arrows-h" style={{ top: 'initial' }}></i>
              }
            />
            <Subheader>{this.props.user_type == "buyer" ? "Informações do Vendedor" : "Informações do Comprador"}</Subheader>
            <ListItem
              primaryText={Helpers.get(this.props, 'seller.profile.name')}
              leftAvatar={<Avatar src={Helpers.get(this.props, 'seller.profile.image')} />}
              containerElement={<Link to={"/profile/" + Helpers.get(this.props, 'seller._id')}></Link>}
            />

            <Subheader>Estado do Pedido</Subheader>

            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'initial' }}>
              <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>{/*0*/}
                  <StepLabel>Confirmação de Pagamento</StepLabel>
                  <StepContent>
                    <p>{this.paymentStatus()}</p>

                  </StepContent>
                </Step>
                <Step>{/*1*/}
                  <StepLabel>Aguardando o envio do produto</StepLabel>
                  <StepContent>
                    {this.props.order.delivery_option === 'Entrega em mãos' ?
                      <div>
                        Entre em contato com o vendedor para combinarem a entrega.
                      </div>
                      :
                      this.props.user_type === 'seller' ?
                        <div>
                          <div className="col s12">
                            <TextField
                              ref='trackCode'
                              style={this.style.textField}
                              multiLine={true}
                              value={this.state.description}
                              rows={1}
                              rowsMax={4}
                              floatingLabelText="Código de rastreio"
                              underlineStyle={{ borderColor: '#FFCA43' }}
                              fullWidth={true}
                              onChange={() => this.handleTextChange()}
                              errorText={this.state.errorTrackCode}
                            />
                          </div>
                          <div className="col s12">
                            <RaisedButton
                              label="Inserir código de rastreio"
                              disableTouchRipple={true}
                              disableFocusRipple={true}
                              primary={true}
                              style={{ marginTop: '2vh' }}
                              onTouchTap={() => this.handleSendCode(this.props.order._id)}
                              disabled={this.state.disabled}
                            />
                          </div>
                        </div>
                        :
                        <p>Aguardando o envio do produto por parte do vendedor.</p>
                    }
                  </StepContent>
                </Step>
                <Step>{/*2*/}
                  <StepLabel style={{ color: 'black' }}>Produto enviado</StepLabel>
                  <StepContent>
                    {this.props.order.delivery_option === 'Delivery in hands' && this.props.order.status === 2 ?
                      //this.updateStatus(this.props.order._id)
                      <div></div>
                      :
                      this.props.user_type === 'seller' ?
                        <div>
                          O seu produto já está a caminho do comprador, é possível verificar a entrega do mesmo abaixo.
                          <Tracker
                            order={this.props.order}
                          />
                        </div>
                        :
                        <div>
                          O vendedor já enviou o seu produto e é possível verificar o status de entrega do mesmo abaixo.
                        <Tracker
                            order={this.props.order}
                          />
                        </div>
                    }
                  </StepContent>
                </Step>
                <Step>{/*3*/}
                  <StepLabel style={{ color: 'black' }}>Produto Recebido</StepLabel>
                  <StepContent>
                    {this.props.order.delivery_option === 'Delivery in hands' ?
                      <p>
                        De acordo com o vendedor seu produto já foi entregue.
                      Libere o pagamento para o vendedor clicando no botão abaixo, caso exista alguma reclamação por favor entre em contato conosco e não libere o pagamentos.
                    </p>
                      :
                      this.props.user_type === 'seller' ?
                        <div>
                          <p>
                            Seu produto já foi entregue ao comprador, estamos aguardando a liberação do pagamento por parte do comprador. O comprador tem até
                            15 dias para liberar o pagamento ou o mesmo será liberado automáticamente. Em caso de problemas o comprador entrará em contado.
                        </p>
                        </div>
                        :
                        <div>
                          <p>
                            De acordo com os correios seu produto já foi entregue.
                          Libere o pagamento para o vendedor clicando no botão abaixo, caso exista alguma reclamação por favor entre em contato conosco e não libere o pagamento.
                          </p>
                          <div className="col s6">
                            <RaisedButton
                              label="Liberar"
                              disableTouchRipple={true}
                              disableFocusRipple={true}
                              primary={true}
                              fullWidth={true}
                              onTouchTap={() => this.finishPurchase(this.props.order._id)}
                            />
                          </div>
                          <div className="col s6">
                            <RaisedButton
                              label="Contato"
                              disableTouchRipple={true}
                              disableFocusRipple={true}
                              primary={true}
                              fullWidth={true}
                              onTouchTap={() => this.handleDialogClose()}
                            />
                          </div>
                        </div>
                    }
                  </StepContent>
                </Step>
                <Step>{/*4*/}
                  <StepLabel style={{ color: 'black' }}>{this.props.user_type === 'seller' ? 'Venda' : 'Compra'} finalizada</StepLabel>
                  <StepContent>
                    <p>
                      {this.props.user_type === 'seller' ? 'Venda' : 'Compra'} finalizada. É possível entrar em contato com o Crodity clicando no botão abaixo.
                    </p>
                    <div className='row' style={{ marginTop: '2vh' }}>
                      <div className="col s6" style={{ textAlign: 'center' }}>
                        <RaisedButton
                          label="Contato"
                          disableTouchRipple={true}
                          disableFocusRipple={true}
                          primary={true}
                          fullWidth={true}
                          onTouchTap={() => this.handleDialogClose()}
                        />
                      </div>
                    </div>
                  </StepContent>
                </Step>
              </Stepper>
              {finished && (
                <p style={{ margin: '20px 0', textAlign: 'center' }}>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      //this.setState({ stepIndex: 0, finished: false });
                    }}
                  >
                    Click here
              </a> to reset the example.
            </p>
              )}
            </div>

          </List>


        </div>
      )
    } else {
      return <div>{this.props.loadding}</div>
    }
  }
}

export default Order;
