import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Tracker from './Tracker.jsx';

class DeliveryOptions extends Component {
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
            disabled: false,
            uber: this.props.uber,
            fedex: this.props.fedex,
            sedex: this.props.sedex,
            deliveryOptions: [],
            tracker: false,
            package_info: {}
        }
    }
    handleDeliveryOptions(toggle, isToggled) {

        let deliveryOptionsAux = this.state.deliveryOptions
        let deliveryOptionsDefault = this.props.deliveryOptions

        deliveryOptionsDefault.map((delivery, i) => {

            if (isToggled && toggle == delivery.name) {
                if (delivery.name == 'Sedex') {
                    this.state.tracker ? this.setState({ tracker: false }) : this.setState({ tracker: true })
                }
                deliveryOptionsAux.push(delivery)
            }

            else if (toggle == delivery.name) {
                deliveryOptionsAux.map((delivery, i) => {
                    if (toggle == delivery.name) {
                        deliveryOptionsAux.splice(i, 1);
                    }
                })
            }
        })
        this.setState({ deliveryOptions: deliveryOptionsAux },
            () => console.log('estado do array de delivery Options = '),
            console.log(this.state.deliveryOptions))
    }
    deliveryState() {
        let unique;

        console.log('to aqui!!!!')
    }

    handleChangeTracker(obj, type) {
        this.setState({ package_info: obj })
    }

    deliveryOptions() {
        if (typeof this.props.deliveryOptions !== 'undefined') {
            let deliveryOptions = this.props.deliveryOptions;

            return (
                <div style={{ marginTop: '8px' }} >
                    {deliveryOptions.map((delivery, i) => (
                        <Toggle
                            key={i}
                            value={delivery.name}
                            label={delivery.name}
                            style={{ fontWeight: '100%' }}
                            onToggle={(ev, isToggled) => this.handleDeliveryOptions(delivery.name, isToggled)}
                        />
                    ))}
                    {this.state.tracker ?
                        <Tracker
                            priceSimulator={true}
                            handlePackage={this.handleChangeTracker.bind(this)} />
                        :
                        <div />
                    }
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
                    <h1 style={{ fontSize: '180%', marginBottom: '10vh' }}> Selecione a forma de envio para o seu comprador </h1>
                    <div style={{ display: "-webkit-inline-box", marginBottom: '5vh' }}>
                        {this.deliveryOptions()}
                    </div>
                </div>
                <div style={{ margin: '12px 0px' }}>
                    <div>
                        <RaisedButton
                            label="Next"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            style={{ marginRight: 12 }}
                            onTouchTap={() => this.props.stepNext(this.state.deliveryOptions, this.state.package_info)}
                            disabled={this.state.disabled}
                        />
                        <FlatButton
                            label="Back"
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
export default DeliveryOptions;