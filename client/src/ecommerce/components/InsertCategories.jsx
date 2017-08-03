import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class InsertCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            name: '',
            parent_id: '',
            errorText: '',
            errorMessage: 'Esse campo é nescessário!',
            values: '',
            categories: [],
            category: {}
        }
        this.style = {
            title: {
                textAlign: 'center',
                color: 'black',
                boxShadow: '2px 2px 5px #888888'
            },
            textField: {
                align: 'center'
            }
        }
    }
    TexthandleChange() {
        this.setState({ name: this.refs.name.getValue() })

        if (this.refs.name.getValue() != '') {
            this.setState({ errorText: '' })
        }
        else {
            this.setState({ errorText: this.state.errorMessage })
            this.setState({ disabled: true })
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
    getCategories() {
        Meteor.call('getAllCategories', (e, r) => {
            if (!e) {
                this.setState({ categories: r }, () => { console.log(this.state.categories) })
            }
        })
    }
    componentDidMount() {
        this.getCategories()
    }
    insert() {
        Meteor.call('getCategory', this.state.values, (e, r) => {
            if (!e) {
                this.setState({ category: r }, () => {
                    Meteor.call('addNewCategory', this.refs.name.getValue(), this.state.category._id, (e, r) => {
                        if (!e) {
                            this.setState({ categories: r }, () => { console.log('Inserido com sucesso!') })
                        }
                    })

                })
            }
        })
    }
    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '180%', marginBottom: '10vh' }}> Insira categorias</h1>
                    <TextField
                        ref='name'
                        style={this.style.textField}
                        multiLine={true}
                        value={this.state.name}
                        rows={1}
                        rowsMax={4}
                        floatingLabelText="name"
                        underlineStyle={{ borderColor: '#FFCA43' }}
                        fullWidth={false}
                        onChange={() => this.TexthandleChange()}
                        errorText={this.state.errorText}
                    />
                    <div className="row" style={{ marginTop: '10vh', marginBottom: '10vh' }}>
                        <SelectField
                            multiple={false}
                            hintText="Select a Category"
                            value={this.state.values}
                            onChange={(event, index, values) => this.handleChange(event, index, values)}
                        >
                            {this.menuItems(this.state.values)}
                        </SelectField>
                    </div>
                    <div style={{ marginTop: '4vh', textAlign: 'center' }}>
                        <RaisedButton
                            label="Inserir"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            style={{ marginRight: 12 }}
                            onTouchTap={() => this.insert()}
                            disabled={this.state.disabled}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default InsertCategories;