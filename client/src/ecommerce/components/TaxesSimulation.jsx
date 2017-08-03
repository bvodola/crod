
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
class TaxesSimulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            total_value: 0.00,
            total_installment: 0.00,
            priceSimulate: props.priceSimulate
        }
    }


    handleChangeText(value) {
        this.setState({ priceSimulate: value }, () => {
            console.log(this.state.priceSimulate)
            this.props.handleChangeText(this.state.priceSimulate)
        })
    }

    getSimulation(value, installment) {
        console.log(value, '<-- valor input')
        console.log(installment, '<-- valor parcela antes')
        console.log(installment.length, '<-- valor parcela depois')

        if (installment.length == 0) {
            return alert("Selecione o número máximo de parcelas!")
        }
        else {
            installment = installment.replace(/([x])/g, '')
            installment = parseInt(installment)
            Meteor.call('calculatePaymentRate', value, installment, (error, success) => {
                console.log(error, success)
                this.setState({
                    total_value: success.total_price,
                    total_installment: success.total_installment
                })
            })
        }
    }


    render() {
        return (
            <div>
                <h5 style={{color: 'gray'}}> Saiba por quanto seu produto será vendido ao aplicar as taxas de cartão de crédito</h5>
                <TextField
                    type="text"
                    pattern="[0-9]*"
                    id="text-field-default"
                    floatingLabelText="Digite aqui o quanto deseja receber pelo produto"
                    onChange={(event) => this.handleChangeText(event.target.value)}
                />
                <RaisedButton
                    label="Simular"
                    primary={true}
                    onTouchTap={() => this.getSimulation(this.state.priceSimulate, this.props.installments)}
                />
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Parcelas</TableHeaderColumn>
                            <TableHeaderColumn>Total por parcela</TableHeaderColumn>
                            <TableHeaderColumn>Total</TableHeaderColumn>
                            <TableHeaderColumn>Taxas</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>{this.props.installments}</TableRowColumn>
                            <TableRowColumn>{parseFloat(this.state.total_installment.toFixed(2))}</TableRowColumn>
                            <TableRowColumn>{parseFloat(this.state.total_value.toFixed(2))}</TableRowColumn>
                            <TableRowColumn>5%</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default TaxesSimulation; 