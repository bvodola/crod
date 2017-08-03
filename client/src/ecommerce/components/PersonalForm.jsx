import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import TextField from 'material-ui/TextField';


class PersonalForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.entity;
  }

  handleChange(name, val) {
    this.setState({ [name]: val }, () => {
      this.props.handleEntityState(this.state);
    });
  }

  componentDidMount() {
    $('.date-mask > input[type=text]').mask('00/00/0000');
  }


  render() {
    return (
      <div>
        <TextField
          floatingLabelText={'Nome Completo'}
          value={this.state.fullName}
          onChange={(ev) => this.handleChange('fullName', ev.target.value)} />
        <div>
          <TextField
            type="email"
            required="required"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            type="email"
            ref="email"
            value={this.state.email}
            floatingLabelText={'Email'}
            onChange={(ev) => this.handleChange('email', ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type="date"
            value={this.state.birthDate}
            className="date-mask"
            floatingLabelFixed={true}
            floatingLabelText={'Data de nascimento'}
            onChange={(ev) => this.handleChange('birthDate', ev.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default PersonalForm; 