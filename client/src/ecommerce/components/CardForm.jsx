import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import TextField from 'material-ui/TextField';


class CardForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.entity;
  }

  handleChangeCreditCard(type, val) {
    this.setState({ [type]: val }, () => {
      this.props.handleChangeCreditCard(this.state);
    });
  }

  componentDidMount() {
    $('.date-mask-expiry > input[type=text]').mask('00/0000');
    $('.date-mask > input[type=text]').mask('00/00/0000');
  }


  render() {
    return (
      <div>
        <div>
          <TextField
            type="email"
            required="required"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            type="email"
            ref="email"
            value={this.state.email}
            floatingLabelText={'Email'}
            onChange={(ev) => this.handleChangeCreditCard('email', ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            floatingLabelText="Nome no cartão"
            name="CCname"
            defaultValue={this.state.full_name}
            onChange={(ev) => this.handleChangeCreditCard('full_name', ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            pattern="[0-9]*"
            floatingLabelText="Número do cartão"
            className="card-mask" name="CCnumber"
            defaultValue={this.state.card_number} onChange={(ev) => this.handleChangeCreditCard('card_number', ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="text" pattern="[0-9]*"
            floatingLabelText="CVC" name="CCcvc"
            value={this.state.cvv} onChange={(ev) => this.handleChangeCreditCard('cvv', ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="text" pattern="[0-9]*"
            floatingLabelFixed={true}
            className="date-mask-expiry"
            floatingLabelText="Data de expiração do cartão (MM/AAAA)"
            name="CCexpiry" defaultValue={this.state.expiry}
            onChange={(ev) => this.handleChangeCreditCard('expiry', ev.target.value)}
          />
        </div>
        <TextField
          type="text"
          pattern="[0-9]*"
          floatingLabelText="CPF"
          className="cpf-mask"
          errorText={this.state.errorForm}
          maxLength="15"
          name="cpf"
          value={this.state.cpf}
          onChange={(ev) => this.handleChangeCreditCard('cpf', ev.target.value)} />
      </div>
    );
  }
}
export default CardForm;
