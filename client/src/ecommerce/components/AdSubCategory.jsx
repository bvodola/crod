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

class AdSubCategory extends Component {
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
            subCategories: []
        }
    }

    handleChange(event, index, values) {
        this.setState({ values })
        this.setState({ disabled: false })
        console.log(values)
    }
    getSubCategories(){
        console.log('getSubCategories')
        console.log(this.props.parentCategory)
        Meteor.call('getChildCategories', this.props.parentCategory, (e, r) => {if(!e){
            this.setState({subCategories: r}, () => {console.log(this.state.subCategories)})
        }})
        
    }
    componentDidMount(){
        this.getSubCategories()
    }
    menuItems(values) {
        let subCategories = this.state.subCategories
        return subCategories.map((subCategory) => (
            <MenuItem
                key={subCategory.name}
                insetChildren={true}
                //checked={values && values.indexOf(subCategory) > -1}
                value={subCategory.name}
                primaryText={subCategory.name}
            />
        ));
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '180%', marginBottom: '10vh', color: "gray" }}> Selecione uma Subcategoria</h3>
                    <div className="row" style={{ marginBottom: '10vh' }}>
                        <SelectField
                            multiple={false}
                            hintText="Selecione uma subcategoria"
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
export default AdSubCategory;