import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import { StyleRoot } from 'radium';
import RaisedButton from 'material-ui/RaisedButton';

class ProductTitle extends Component {
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
                title: props.title,
                description: props.description,
                disabled: true,
                errorText1: '',
                errorText2: '',
                titleAndDescription: [props.title, props.description]
            }
    }

    handleChangeTitle() {
        let array = [this.refs.title.getValue(), this.refs.description.getValue()]
        this.setState({ titleAndDescription: array });
        this.setState({ title: this.refs.title.getValue() })
        this.setState({ description: this.refs.description.getValue() })

        if (this.refs.title.getValue() != '') {
            this.setState({ errorText1: '' })
            if (this.refs.description.getValue() != '') {
                this.setState({ errorText2: '' })
                this.setState({ disabled: false })
            }
            else{
                this.setState({ errorText2: 'Esse campo é obrigatório'})
                this.setState({ disabled: true })
            }
        }
        else{
                this.setState({ errorText1: 'Esse campo é obrigatório'})
                this.setState({ disabled: true })
            }
    }

    render() {
        return (
            <StyleRoot>
                <div>
                    <h3 style={{ fontSize: '180%', textAlign: 'center', color: "gray" }}>Aqui você pode dizer um pouco mais sobre o seu anúncio</h3>
                    <div style={{ marginTop: '5vh', marginBottom: '3vh' }}>
                        <TextField
                            ref='title'
                            style={this.style.textField}
                            multiLine={true}
                            value={this.state.title}
                            rows={1}
                            rowsMax={4}
                            floatingLabelText="Título do anúncio"
                            underlineStyle={{ borderColor: '#FFCA43' }}
                            fullWidth={true}
                            onChange={() => this.handleChangeTitle()}
                            errorText={this.state.errorText1}
                        />
                    </div>
                    <div style={{ marginBottom: '5vh' }}>
                        <TextField
                            ref='description'
                            style={this.style.textField}
                            multiLine={true}
                            value={this.state.description}
                            rows={1}
                            rowsMax={4}
                            floatingLabelText="Descrição do seu anúncio"
                            underlineStyle={{ borderColor: '#FFCA43' }}
                            fullWidth={true}
                            onChange={() => this.handleChangeTitle()}
                            errorText={this.state.errorText2}
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
                                onTouchTap={() => this.props.stepNext(this.state.titleAndDescription)}
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
            </StyleRoot>
        );
    }
}

export default Radium(ProductTitle);
