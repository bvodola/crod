
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ProductPrice extends Component {
    constructor(props) {
        super(props);
        this.style = {
            button: {
                backgroundColor: '#FFCA43',
                color: 'white',
                width: '100%',
                marginTop: '10vh'
            },
            truckIcon: {
                transform: 'scale(-1, 1)',
                textAlign: 'center',
                color: 'black',
                marginTop: '20%'
            },
            textField: {
                align: 'center'
            },
            quantityStyle: {
                textAlign: 'center',
                display: '-webkit-inline-box'
            },
            quantity: {
                textAlign: 'center',
                display: '-webkit-inline-box',
                float: 'right',
                marginTop: '-4em'
            }
        }
        this.state = {
            price: props.price,
            quantity: props.quantity,
            formValue: props.formValue
        }
    }
    addItens() {
        let quantity = this.state.quantity;
        let self = this;
        this.setState({ quantity: quantity + 1 }, () => {
            console.log(quantity);
        })
    }
    removeItens() {
        let quantity = this.state.quantity;

        if (this.state.quantity > 1) {
            this.setState({ quantity: quantity - 1 }, () => {
                console.log(quantity);
            })
        } else return false;
    }
    handleChange(value) {

        let value2 = $('.money-mask > input[type=text]').cleanVal();
        this.setState({
            formValue: value,
            price: value2
        })
    }
    componentDidMount() {
        $('.money-mask > input[type=text]').mask('000.000.000.000,00', { reverse: true });
    }
    render() {
        return (
            <div>
                <h1 style={{ fontSize: '180%', marginBottom: '4vh', textAlign: 'center' }}> Quantidade </h1>
                <div style={{ textAlign: 'center', marginBottom: '5vh' }}>
                    <div style={this.style.quantityStyle} >
                        <div style={{ textAlign: 'center' }} >
                            <FloatingActionButton style={{ marginRight: '2vh' }} mini={true} onTouchTap={() => this.removeItens()} backgroundColor="white">
                                <FontIcon color="black" style={{ color: 'black' }} className="material-icons">remove</FontIcon> 
                            </FloatingActionButton>
                        </div>
                        <h6 style={{ marginTop: '2vh' }}>{this.state.quantity}</h6>
                        <div style={{ textAlign: 'right' }} >
                            <FloatingActionButton mini={true} style={{
                                marginRight: '2vh',
                                marginLeft: '2vh'
                            }} onTouchTap={() => this.addItens()} backgroundColor="white" >
                                <FontIcon color="black" style={{ color: 'black' }} className="material-icons">add</FontIcon>
                            </FloatingActionButton>
                        </div>
                    </div>
                    <h2 style={{ fontSize: '180%', marginTop: '6vh', marginBottom: '3vh', textAlign: 'center' }}> Preço por unidade </h2>
                    <TextField
                        floatingLabelText="Preço"
                        multiLine={false}
                        rowsMax={1}
                        ref="price"
                        onChange={(ev) => this.handleChange(ev.target.value)}
                        value={"R$ " + this.state.formValue}
                        className='money-mask'
                        underlineStyle={{ borderColor: '#FFCA43' }}
                    />
                </div>
                <div style={{ margin: '12px 0px' }}>
                    <div>
                        <RaisedButton
                            label="Próximo"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            style={{ marginRight: 12 }}
                            onTouchTap={() => this.props.stepNext(this.state.price, this.state.quantity)}
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
export default ProductPrice;