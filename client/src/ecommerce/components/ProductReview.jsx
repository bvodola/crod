import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

class ProductReview extends Component {
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
            truckIcon: {
                transform: 'scale(-1, 1)',
                textAlign: 'center',
                color: 'black',
                marginTop: '-35%'
            },
            block: {
                maxWidth: 250
            }
        }
        this.state = {
            price: ""
        }
    }
    handleChange() {
        let value = this.refs.price.getValue()
        this.setState({ price: value })
    }
    componentDidMount() {
        $('.money-mask > input[type=text]').mask('000.000.000.000.000,00', { reverse: true });
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <div className='row'>
                        <div className="col s1 m1 l1" style={{ marginLeft: '-5%', marginTop: '3vh' }}>
                            <FloatingActionButton
                                style={{ boxShadow: 'none' }}
                                backgroundColor="white" >
                                <FontIcon className="material-icons" style={this.style.truckIcon}>forward</FontIcon>
                            </FloatingActionButton>
                        </div>
                        <h1 style={{ textAlign: 'center', fontSize: '180%%', marginBottom: '10vh' }}> Review and publish</h1>
                        <picture>
                        </picture>
                        <div>
                            <TextField
                                floatingLabelText="Product Title."
                                multiLine={false}
                                rowsMax={1}
                                underlineStyle={{ borderColor: '#FFCA43' }}
                            />
                            <div style={{ marginTop: '5vh', fontSize: '120%' }}>
                                <b>Status</b>
                            </div>
                            <div className="col s12 m12 l12" style={{ marginTop: '5vh' }}>
                                <div style={{ display: "-webkit-inline-box" }}>
                                    <RadioButtonGroup labelPosition="left">
                                        <RadioButton
                                            value="1"
                                            label="New"
                                            style={this.style.radioButton}
                                            labelStyle={this.style.label}
                                        />
                                        <RadioButton
                                            value="0"
                                            label="Used"
                                            style={this.style.radioButton}
                                            labelStyle={this.style.label}
                                        />
                                    </RadioButtonGroup>
                                </div>
                            </div>
                            <div style={{ marginTop: '5vh' }}>
                                <TextField
                                    floatingLabelText="Input the product's value here."
                                    multiLine={false}
                                    rowsMax={1}
                                    ref="price"
                                    onChange={() => this.handleChange()}
                                    value={"R$ " + this.state.price}
                                    className='money-mask'
                                    underlineStyle={{ borderColor: '#FFCA43' }}
                                />
                            </div>
                            <div style={{ marginTop: '5vh' }}>
                                <b>Delivery Options</b>
                            </div>
                            <div className="col s12 m12 l12" style={{ marginTop: '5vh' }}>
                                <div style={{ display: "-webkit-inline-box" }}>
                                    <div style={this.style.block}>
                                        <Checkbox
                                            label="Uber"
                                            labelPosition="left"
                                            labelStyle={this.style.label}
                                        />
                                        <Checkbox
                                            label="Sedex"
                                            labelPosition="left"
                                            labelStyle={this.style.label}
                                        />
                                        <Checkbox
                                            label="Fedex"
                                            labelPosition="left"
                                            labelStyle={this.style.label}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '5vh', marginBottom: '10vh', textAlign: 'center' }}>
                            <TextField
                                floatingLabelText="Product's Description."
                                multiLine={false}
                                rowsMax={1}
                                underlineStyle={{ borderColor: '#FFCA43' }}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col s12 m4 l6 offset-l3">
                            <div>
                                <FlatButton
                                    label='Publish'
                                    style={this.style.button}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductReview;