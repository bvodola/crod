import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Helpers } from '../../helpers/Helpers.jsx';

// Material UI
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

// import {  } from 'react-router-dom'
import { Route, Redirect, withRouter } from 'react-router'

class Tracker extends Component {
    constructor(props) {
        super(props);

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
                trackCode: '',
                order: this.props.order,
                object: {},
                finished: false,
                disabled: true,
                priceSimulator: this.props.priceSimulator,
                errorOriginCep: '',
                errorDestinationCep: '',
                errorWeight: '',
                errorLength: '',
                errorWidth: '',
                errorHeight: '',
                originCep: 0,
                destinationCep: 0,
                weight: 0,
                length: 0,
                width: 0,
                height: 0,
                value: 0.0,
                notice: '',
                hand: '',
                values: '',
                values1: '',
                yesNo: ['Sim', 'Não'],
                valorFrete: 0.0,
                open: false,
                error: ''

            }
    }
    handleSimulatePrice() {
        let package_info = {
            cep: this.state.originCep,
            weight: this.state.weight,
            length: this.state.length,
            width: this.state.width,
            height: this.state.height,
            value: this.state.value,
            notice: this.state.notice,
            hand: this.state.hand
        }
        this.props.handlePackage(package_info, 'package')

    }
    simulate() {
        let self = this
        Meteor.call('simulatePrice', this.state.originCep, this.state.destinationCep, this.state.weight, this.state.length,
            this.state.width, this.state.height, this.state.value, this.state.notice, this.state.hand, function (error, result) {
                console.log(error);
                console.log(result);
                if (!error) {
                    self.setState({ open: true, valorFrete: result.data.price })
                }
            })
    }
    menuItems(values) {
        let array = this.state.yesNo
        return array.map((index) => (
            <MenuItem
                key={index}
                insetChildren={true}
                value={index}
                primaryText={index}
            />
        ));
    }

    handleChange(event, index, values) {
        this.setState({ values, notice: values })
        console.log(values)
    }

    handleChange1(event, index, values1) {
        this.setState({ values1, hands: values1 }, () => console.log('teste = ', this.state.values1))
        console.log(values)
    }

    handleDialogClose() {
        this.setState({ open: false })
    }

    renderPriceSimulator() {
        const actions = [
            <RaisedButton
                label="Confirmar"
                disableTouchRipple={true}
                disableFocusRipple={true}
                primary={true}
                onTouchTap={() => this.handleDialogClose()}
                style={{ marginRight: 12 }}
            />
        ];
        return (
            <div>
                <h1 style={{ fontSize: '180%', marginBottom: '3vh', maxWidth: '450px' }}>Simule o preço do frete</h1>
                <Dialog
                    title={this.state.error ? this.state.error : "O frete terá um valor aproximado de " + 'R$' + this.state.valorFrete}
                    modal={false}
                    open={this.state.open}
                    actions={actions}
                >
                </Dialog>
                <div className="col s12">
                    <TextField
                        ref='originCep'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="Cep de origem"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                        errorText={this.state.errorOriginCep}
                    />
                </div>
                <div className="col s12">
                    <TextField
                        ref='weight'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="Peso da encomenda em Kg"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                        errorText={this.state.errorWeight}
                    />
                </div>
                <div className="col s12">
                    <TextField
                        ref='length'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="Comprimento da encomenda em Cm (Deve ser maior que 16Cm)"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                        errorText={this.state.errorLength}
                    />
                </div>
                <div className="col s12">
                    <TextField
                        ref='width'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="Largura da encomenda em Cm"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                        errorText={this.state.errorWidth}
                    />
                </div>
                <div className="col s12">
                    <TextField
                        ref='height'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="	Altura da encomenda em Cm"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                        errorText={this.state.errorHeight}
                    />
                </div>
                <div className="col s12">
                    <TextField
                        ref='value'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.description}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="Valor da encomenda (Não é obrigatório)"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={true}
                        onChange={() => this.handleTextChange()}
                    />
                </div>
                <div className="col s12" style={{  marginTop: '5vh' }}>
                    <SelectField
                        multiple={false}
                        hintText="Aviso de recebimento"
                        value={this.state.values}
                        onChange={(event, index, values) => this.handleChange(event, index, values)}
                    >
                        {this.menuItems(this.state.values)}
                    </SelectField>
                </div>
                <div className="col s12" style={{  marginTop: '2vh' }}>
                    <SelectField
                        multiple={false}
                        hintText="Entrega em mãos"
                        value={this.state.values1}
                        onChange={(event, index, values) => this.handleChange1(event, index, values)}
                    >
                        {this.menuItems(this.state.values1)}
                    </SelectField>
                </div>
                <div className="col s12">
                    <RaisedButton
                        label="Inserir dados"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        style={{ marginTop: '2vh' }}
                        onTouchTap={() => this.handleSimulatePrice()}
                        disabled={this.state.disabled}
                    />
                </div>
            </div>
        )
    }

    handleTextChange() {
        //this.setState({ errorCep: '', disabled: false })
        if (this.refs.originCep.getValue() != '') {
            this.setState({ errorOriginCep: '', originCep: this.refs.originCep.getValue() })

            if (this.refs.weight.getValue() != '') {
                this.setState({ errorWeight: '', weight: this.refs.weight.getValue() })

                if (this.refs.length.getValue() != '') {
                    this.setState({ errorLength: '', length: this.refs.length.getValue() })

                    if (this.refs.width.getValue() != '') {
                        this.setState({ errorWidth: '', width: this.refs.width.getValue() })

                        if (this.refs.height.getValue() != '') {
                            this.setState({ errorHeight: '', disabled: false, height: this.refs.height.getValue() })

                            if (this.refs.value.getValue() != '')
                                this.setState({ value: this.refs.value.getValue })
                        }
                        else this.setState({ errorHeight: 'Esse campo é obrigatório', disabled: true })
                    }
                    else this.setState({ errorWidth: 'Esse campo é obrigatório', disabled: true })
                }
                else this.setState({ errorLength: 'Esse campo é obrigatório', disabled: true })
            }
            else this.setState({ errorWeight: 'Esse campo é obrigatório', disabled: true })
        }
        else this.setState({ errorOriginCep: 'Esse campo é obrigatório', disabled: true })
    }

    trackObject(object) {//'PN871159741BR'
        let self = this
        Meteor.call('track', object, function (error, result) {
            console.log(error);
            console.log(result);
            if (!error) {
                self.setState({ object: result, finished: true })
                self.updateOrder()
            }
        })
    }

    updateOrder() {
        /*
            0 - Waiting for payment confirmation
            1 - Waiting for the input of the track code
            2 - Product in transit
            3 - Buyer has already received the product (Waiting feedback to seller)
        */
        let obj = this.state.object
        console.log('status do obj de entrega = ', obj.data.evento.status)
        switch (obj.data.evento.status) {
            case '01': //Delivered
                Meteor.call('updateOrderStatus', this.props.order._id, 3, function (error, result) {
                    console.log(error);
                    console.log(result);
                })
                break
        }
    }

    renderResult() {
        if (this.state.finished) {
            let obj = this.state.object
            obj.data.objeto
            return (
                <div>
                    <div>
                        <h1 style={{ fontSize: '170%', marginBottom: '2vh' }}>Seu código de rastreio é {this.state.trackCode}</h1>
                    </div>
                    <Card>
                        <CardText>
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Categoria:</b> {obj.data.objeto.categoria ? obj.data.objeto.categoria : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Nome:</b> {obj.data.objeto.nome ? obj.data.objeto.nome : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Cidade:</b> {obj.data.evento.cidade ? obj.data.evento.cidade : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>UF:</b> {obj.data.evento.uf ? obj.data.evento.uf : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Data:</b> {obj.data.evento.data ? obj.data.evento.data : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Horário:</b> {obj.data.evento.hora ? obj.data.evento.hora : ''}
                            <Divider />
                            <b style={{ fontWeight: '500' }}>Descrição:</b> {obj.data.evento.descricao ? obj.data.evento.descricao : ''}
                            <Divider />
                        </CardText>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <h2 style={{ fontSize: '170%' }}> Carregando... </h2>
            )
        }
    }

    componentDidMount() {

        if (typeof this.props.priceSimulator !== 'undefined') {
            console.log('teste')
        }
        else {
            if (typeof this.props.trackCode !== 'undefined') {
            }
            else {
                console.log('Order = ', this.props.order)
                let obj = this.props.order
                this.setState({ trackCode: obj.address.track_code }, () => {
                    console.log('state trackCode = ', this.state.trackCode)
                    if (typeof this.state.trackCode !== 'undefined') {
                        this.trackObject(this.state.trackCode)
                    }
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.priceSimulator ? this.renderPriceSimulator() : this.renderResult()}
            </div>
        )

    }
}
export default Tracker