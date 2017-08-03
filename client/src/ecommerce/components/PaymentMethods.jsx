import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TaxesSimulation from './TaxesSimulation'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
const installments = [
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
    '11x',
    '12x'
];

class PaymentMethods extends Component {
    constructor(props) {
        super(props);
        this.style = {
            button: {
                backgroundColor: '#FFCA43',
                color: 'white',
                width: '100%',
                marginTop: '10vh'
            },
            checkbox: {
                marginBottom: '3vh',
                fontWeight: 'light'
            },
            label: {
                fontWeight: '400'
            },
            block: {
                maxWidth: 250
            }
        }
        this.state = {
            disabled: true,
            paymentMethods: [],
            installments: '',
            values: '',
            card: false,
            priceSimulate: '',
            total_value: 0.00,
            total_installment: 0.00
        }
    }

    handlePaymentMethods(toggle, isToggled) {
        let paymentMethodsAux = this.state.paymentMethods
        let paymentMethodsDefault = this.props.paymentMethods
        console.log('toggle = ' + toggle + ', isToggled = ' + isToggled)
        console.log('paymentMethodsAux = ')
        console.log(paymentMethodsAux)
        console.log('paymentMethodsDefault = ')
        console.log(paymentMethodsDefault)
        paymentMethodsDefault.map((payment, i) => {

            if (isToggled && toggle == payment.code) {
                if (payment.code == 'cc') {
                    this.state.card ? this.setState({ card: false }) : this.setState({ card: true })
                }
                paymentMethodsAux.push(payment)
            }
            else if (toggle == payment.code) {
                paymentMethodsAux.map((payment, i) => {
                    if (toggle == payment.code) {
                        paymentMethodsAux.splice(i, 1);
                    }
                })
            }
        })
        console.log(paymentMethodsAux)
        this.setState({ paymentMethods: paymentMethodsAux },
            () => console.log('estado do array de Payment Methods = '),
            console.log(this.state.paymentMethods))
    }

    handleChange(event, index, values) {
        this.setState({ values })
        this.setState({ installments: values }, () => { console.log(this.state.installments), console.log(' <= To aqui') })
        console.log(this.state.installments)
    }
    menuItems(values) {
        return installments.map((installment) => (
            <MenuItem
                key={installment}
                insetChildren={true}
                checked={values && values.indexOf(installment) > -1}
                value={installment}
                primaryText={installment}
            />
        ));
    }

    handleChangeText(value) {
        this.setState({ priceSimulate: value }, () => {
            console.log(this.state.priceSimulate)
        })
    }



    paymentMethods() {
        if (typeof this.props.paymentMethods !== 'undefined') {
            let paymentMethods = this.props.paymentMethods;

            return (
                <div style={{ marginTop: '8px' }} >
                    {paymentMethods.map((payment, i) => (
                        <Toggle
                            key={i}
                            defaultValue={payment.code}
                            label={payment.name}
                            style={{ fontWeight: '100%' }}
                            onToggle={(ev, isToggled) => this.handlePaymentMethods(payment.code, isToggled)}
                        />
                    ))}
                </div>
            );
        }
        else
            console.log('Undefined Prop')
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '180%', marginBottom: '10vh', color: "gray" }}> Selecione os métodos de pagamentos que serão aceitos: </h3>
                    <div style={{ display: "-webkit-inline-box", marginBottom: '5vh' }}>
                        {this.paymentMethods()}
                    </div>
                    {this.state.card ?
                        <div>
                            <div>
                                <div className="row" style={{ marginBottom: '10vh' }}>
                                    <h4> Selecione a quantidade máxima de parcelas </h4>
                                    <SelectField
                                        hintText="Número de parcelas"
                                        value={this.state.values}
                                        onChange={(event, index, values) => this.handleChange(event, index, values)}
                                    >
                                        {this.menuItems(this.state.values)}
                                    </SelectField>
                                    <h5> Cartão de Crédito</h5>
                                    <h6>No Crodity todos os clientes podem pagar em até 12x no cartão de crédito e você recebe o parcelamento de acordo com a data de vencimento das parcelas.
Todas as vendas no cartão de crédito são pagas após 30 dias do vencimento da primeira parcela.</h6>
                                </div>
                                <TaxesSimulation
                                    priceSimulate={this.state.priceSimulate}
                                    installments={this.state.installments}
                                    handleChangeText={this.handleChangeText.bind(this)}
                                />
                            </div>
                        </div>
                        : <div></div>}
                </div>
                <div style={{ margin: '12px 0px' }}>
                    <div>
                        <RaisedButton
                            label="Próximo"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            style={{ marginRight: 12 }}
                            onTouchTap={() => this.props.stepNext(this.state.paymentMethods, this.state.installments)}
                        />
                        <FlatButton
                            label="Voltar"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onTouchTap={() => this.props.stepBack()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default PaymentMethods;