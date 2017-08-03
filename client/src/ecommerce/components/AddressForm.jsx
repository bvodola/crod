import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import Product from './Product.jsx'
import Toggle from 'material-ui/Toggle';
import { Helpers } from '../../helpers/Helpers';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddressForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.address;
  }
 verifyZipCode() {
    //Regex for validation zipCode (CEP)
    let validate = /^[0-9]{8}$/;
    let value;

    console.log(this.refs.zipCode.getValue());
    let zipCode = this.refs.zipCode.getValue()
    zipCode = zipCode.replace(/\D/g, '');

    if (zipCode != "") {
      if (validate.test(zipCode)) {
        value = this.refs.zipCode.getValue()

        this.setState({
          address: {
            zipCode: value
          }
        })

        Meteor.call('getUserAddress', zipCode, (error, response) => {
          if (error) {
            console.log(error);
          } else {

            console.log(response)
            if (response.erro) {
              this.setState({
                errorForm: 'Invalid zip code',
                street: '',
                neighborhood: '',
                city: '',
                state: '',
              });
            }

            else {
              this.setState({
                errorForm: '', 
                street: response.logradouro,
                neighborhood: response.bairro,
                city: response.localidade,
                state: response.uf,
                zipCode: response.cep
              });
            }
          }
        })
      }
    }
  }

  handleChange(name, val) {
    this.setState({ [name]: val }, () => {
      this.props.handleAddressState(this.props.type, this.state);
    });
  }


  render() {
    return (
      <div>
        <TextField
          errorText={this.state.errorForm}
          floatingLabelText={'Cep'}
          type="text" 
          pattern="[0-9]*"
          ref="zipCode"          
          onChange={() => this.verifyZipCode()}
          maxLength="8" />

        <div>

          <TextField
            ref="street"
            value={this.state.street}
            floatingLabelFixed={true}
            floatingLabelText={'Rua'} />
        </div>
        <div>
          <TextField
            ref="neighborhood"
            value={this.state.neighborhood}
            floatingLabelFixed={true}
            floatingLabelText={'Bairro'} />
        </div>
        <div>
          <TextField
            ref="city"
            value={this.state.city}
            floatingLabelFixed={true}
            floatingLabelText={'Cidade'}
          />
        </div>
        <div>

          <TextField
            ref="state"
            value={this.state.state}
            floatingLabelFixed={true}
            floatingLabelText={'Estado'}
          />
        </div>
        <TextField
          ref="number"
          value={this.state.number}
          onChange={(ev) => this.handleChange('number', ev.target.value)}
          floatingLabelFixed={true}
          floatingLabelText={'Numero da casa'}
          style={{ width: '30%' }} />
        <TextField
          ref="complement"
          value={this.state.complement}
          onChange={(ev) => this.handleChange('complement', ev.target.value)}
          floatingLabelFixed={true}
          floatingLabelText={'Complemento'}
          style={{ width: '40%', marginLeft: '20px' }} />
      </div>
    );
  }
}

export default AddressForm; 