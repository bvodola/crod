import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ProductStatus extends Component {
    constructor(props) {
        super(props);
        this.style = {
            button: {
                backgroundColor: '#FFCA43',
                color: 'white',
                width: '100%',
                marginTop: '10vh'
            },
            radioButton: {
                marginBottom: '3vh',
                fontWeight: 'light'
            },
            label: {
                fontWeight: '400',
            },
            truckIcon: {
                transform: 'scale(-1, 1)',
                textAlign: 'center',
                color: 'black',
                marginTop: '20%'
            }
        };
        this.state = {
            disabled: true,
            status: props.status
        }
    }
    handleChange(val) {

        console.log(val, '<-------- Value')
        this.setState({ status: val }, () => {
            console.log(this.state.status, '<--- Status no setState')
        });
        console.log(this.refs.radioGroup.valueSelected)
        this.setState({ disabled: false });
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <div className='row'>
                        <div className="col s12 m12 l12" style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '180%', marginBottom: '5vh', color: "gray" }}> Seu produto é novo ou usado? </h1>
                        </div>
                        <div style={{ display: "-webkit-inline-box" }}>
                            <RadioButtonGroup ref='radioGroup' labelPosition="left" onChange={(ev) => this.handleChange(ev.target.value)} valueSelected={this.state.status}>
                                <RadioButton
                                    value="Novo"
                                    ref='new'
                                    label="Novo"
                                    style={this.style.radioButton}
                                    labelStyle={this.style.label}
                                />
                                <RadioButton
                                    value="Usado"
                                    ref='used'
                                    label="Usado"
                                    style={this.style.radioButton}
                                    labelStyle={this.style.label}
                                />
                            </RadioButtonGroup>
                        </div>
                    </div>
                </div>
                <div style={{ margin: '12px 0px' }}>
                    <div>
                        <RaisedButton
                            label="Próximo"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            style={{ marginRight: 12 }}
                            onTouchTap={() => this.props.stepNext(this.state.status)}
                            disabled={this.state.disabled}
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
export default ProductStatus;