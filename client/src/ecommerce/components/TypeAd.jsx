import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class TypeAd extends Component {
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
            values: '',
            categories: []
        }
    }

    handleChange(event, index, values) {
        this.setState({ values })
        this.setState({ disabled: false })
        console.log(values)
    }

    menuItems(values) {
        let array = this.state.categories
        return array.map((index) => (
            <MenuItem
                key={index.name}
                insetChildren={true}
                value={index.name}
                primaryText={index.name}
            />
        ));
    }

    getCategories(){
        Meteor.call('findAllParentCategories', (e, r) => {if(!e){
            this.setState({categories: r}, () => {console.log(this.state.categories)})
        }})
        
    }

    componentDidMount(){
        this.getCategories()
    }
    
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '180%', marginBottom: '10vh', color: "gray" }}> Selecione a categoria do seu anúncio </h3>
                    <div className="row" style={{ marginBottom: '10vh' }}>
                        <SelectField
                            multiple={false}
                            hintText="Selecione uma categoria"
                            value={this.state.values}
                            onChange={(event, index, values) => this.handleChange(event, index, values)}
                        >
                            {this.menuItems(this.state.values)}
                        </SelectField>
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
                            onTouchTap={() => this.props.stepNext(this.state.values)}
                            disabled={this.state.disabled}
                        />
                        <FlatButton
                            label="Voltar"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onTouchTap={() => this.stepBack()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default TypeAd;