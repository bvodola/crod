import React, { Component } from 'react';
// import "payment-icons.css"

// ==========
// Repeatable
// ==========

class Repeatable extends Component {

	constructor(props) {
		super(props);

		// Sets the initial state
		// count: Number of initial statements
		this.state = {
			count: 1
		};
	}

	addChild() {
		this.setState({ count: this.state.count + 1 });
	}

	removeChild() {
		if (this.state.count > 1) {
			this.setState({ count: this.state.count - 1 });
		}
	}

	// This function is responsible for rendering each loop of the
	// <Repeatable /> component.
	renderChildren(children, refName) {

		// First we make sure that the refName parameter passed is a String
		refName = String(refName);

		// Iterating through the children of the repeatable component
		return React.Children.map(children, (child, j) => {

			// First, we check if this child is NOT the defaultRef child
			if (typeof child.props.defaultRef === 'undefined') {

				// Now we check if the refName prop for this child is defined
				if (typeof child.props.refName !== 'undefined') {
					refName = child.props.refName + refName;
				}

				// Then, if the refName is not defined, we must check if
				// this is the only child element inside the Repeatable component
				else {

					// If this is not the only child, we must set its ref to null
					// in order to avoid ref names conflict.
					if (children instanceof Array) {
						refName = null;
					}
				}
			}
			return React.cloneElement(child, { ref: refName });
		});
	}

	render() {
		return (
			<div className='repeatable'>
				{[...Array(this.state.count)].map((x, i) => (
					<div key={i}>
						{this.renderChildren(this.props.children, i)}
						<button onClick={this.removeChild.bind(this)}>X</button>
					</div>
				))}
				<button onClick={this.addChild.bind(this)}>+</button>
			</div>
		);
	}
}

// ==========
// DataSelect
// ==========

// Props:
// - defaultValue
// - placeholder: the placeholder for the Select, in this case a disabled first option
// - valueProperty: the name of the data object property that will become the value of the selet options
// - data: populates the select
// - onChange
// - style

class DataSelect extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: (props.defaultValue || '')
		}
	}

	handleChange(event) {
		this.setState({ value: event.target.value }, function () {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange(event);
			}
		});
	}

	render() {

		let valueProperty = '_id';
		let style = {};
		if (typeof this.props.valueProperty !== 'undefined') valueProperty = this.props.valueProperty
		if (typeof this.props.style !== 'undefined') style = this.props.style

		if (this.props.data.length > 0) {
			return (
				<select style={style} ref="_id" defaultValue={this.props.defaultValue || ''} onChange={this.handleChange.bind(this)}>
					<option value="" disabled>{this.props.placeholder}</option>
					{this.props.data.map((obj) => (
						<option value={obj[valueProperty]} key={obj._id}>
							{obj.name}
						</option>
					))}
				</select>
			);
		}
		else {
			return (
				<p>Nenhuma opção de {this.props.placeholder}cadastrada.</p>
			);
		}
	}
}

// ============
// CheckboxList
// ============

/*
Example:
<CheckboxList title='Título' data={[
{'_id': '001', 'name': 'Check 1'},
{'_id': '002', 'name': 'Check 2'}
]}
/>
*/

class CheckboxList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: (props.defaultValue || '')
		}
	}

	handleChange(event) {

		stateValue = this.state.value;
		console.log(event);

		this.setState({ value: event.target.value }, function () {
			if (typeof this.props.onChange === 'function') {
				this.props.onChange(event);
			}
		});
	}


	render() {

		// Setting the valueProperty and style variables
		let valueProperty = '_id';
		let style = {};
		if (typeof this.props.valueProperty !== 'undefined') valueProperty = this.props.valueProperty
		if (typeof this.props.style !== 'undefined') style = this.props.style

		// Checks if there's data and renders
		if (typeof this.props.data !== 'undefined' && this.props.data.length > 0) {
			return (
				<div>
					<div className="title">{this.props.title}</div>
					{this.props.data.map((obj) => (
						<p key={obj._id}>
							<input name={obj.name} onChange={this.handleChange.bind(this)} type="checkbox" value={obj[valueProperty]} />
							<label htmlFor={obj.name}>{obj.name}</label>
						</p>
					))}
				</div>
			);
		}

		else {
			return (
				<p>Nenhuma opção de {this.props.title}cadastrada.</p>
			);
		}

	}

}

// =======
// Helpers
// =======

class Helpers {

	// Sets all the ref values of INPUT, SELECT and TEXTAREAS to a handy { refName:refValue } object
	// Also, if any ReactElement with a ref defined has a stateValue prop defined, this function will
	// check that Element for the value of the state named on the stateValue prop and assign it to
	// the refName:refValue pair.

	static getRefValues(refs) {
		let refValues = new Object();

		for (var key in refs) {
			if (refs.hasOwnProperty(key)) {
				if (typeof refs[key].nodeName !== 'undefined' && (refs[key].nodeName == 'INPUT' || refs[key].nodeName == 'SELECT' || refs[key].nodeName == 'TEXTAREA')) {
					refValues[key] = refs[key].value;
				} else if (typeof refs[key].props !== 'undefined' && typeof refs[key].props.stateValue !== 'undefined') {
					if (refs[key].props.stateValue === true)
						refValues[key] = refs[key].state['value'];
					else
						refValues[key] = refs[key].state[refs[key].props.stateValue];
				}
			}
		}
		return refValues;
	}

	// Merges the obj2 properties into ojb1. Overwrites any property
	// that may already exist in obj1
	static push(obj1, obj2) {
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	}

	// Recursively checks the nested properties of an object and returns the
	// object property in case it exists.
	static get(obj, key) {
		return key.split(".").reduce(function (o, x) {
			return (typeof o == "undefined" || o === null) ? o : o[x];
		}, obj);
	}

	// Recursively checks the nested properties of an object and returns
	//true in case it exists.
	static has(obj, key) {
		return key.split(".").every(function (x) {
			if (typeof obj != "object" || obj === null || !x in obj)
				return false;
			obj = obj[x];
			return true;
		});
	}


	//This sets the socialIcon according for the social
	static socialIcon(service, size) {
		switch (service) {
			case 'facebook':
				return <i className={"facebook-color fa fa-facebook-official fa-" + size + "x"} aria-hidden="true"></i>;
			case 'twitter':
				return <i className={"twitter-color fa fa-twitter-square fa-" + size + "x"} aria-hidden="true"></i>;
			case 'instagram':
				return <i className={"instagram-color fa fa-instagram fa-" + size + "x"} aria-hidden="true"></i>;
			case 'google':
				return <i className={"googleplus-color fa fa-google fa-" + size + "x"} aria-hidden="true"></i>;
			case 'pinterest':
				return <i className={"pinterest-color fa fa-pinterest-square fa-" + size + "x"} aria-hidden="true"></i>;

		}
	};

	static creditCardIcon(company, style) {
		//For more icons verify client/sass/payment-icons.css
		switch (company) {
			case 'mastercard':
				return <img style={style}
				src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQjYwMDsiIGQ9Ik01MDQsMjUyYzAsODMuMi02Ny4yLDE1MS4yLTE1MS4yLDE1MS4yYy04My4yLDAtMTUxLjItNjgtMTUxLjItMTUxLjJsMCwwICBjMC04My4yLDY3LjItMTUxLjIsMTUwLjQtMTUxLjJDNDM2LjgsMTAwLjgsNTA0LDE2OC44LDUwNCwyNTJMNTA0LDI1MnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y3OTgxRDsiIGQ9Ik0zNTIuOCwxMDAuOGM4My4yLDAsMTUxLjIsNjgsMTUxLjIsMTUxLjJsMCwwYzAsODMuMi02Ny4yLDE1MS4yLTE1MS4yLDE1MS4yICBjLTgzLjIsMC0xNTEuMi02OC0xNTEuMi0xNTEuMiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY4NTAwOyIgZD0iTTM1Mi44LDEwMC44YzgzLjIsMCwxNTEuMiw2OCwxNTEuMiwxNTEuMmwwLDBjMCw4My4yLTY3LjIsMTUxLjItMTUxLjIsMTUxLjIiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNTA1MDsiIGQ9Ik0xNDkuNiwxMDAuOEM2Ny4yLDEwMS42LDAsMTY4LjgsMCwyNTJzNjcuMiwxNTEuMiwxNTEuMiwxNTEuMmMzOS4yLDAsNzQuNC0xNS4yLDEwMS42LTM5LjJsMCwwbDAsMCAgYzUuNi00LjgsMTAuNC0xMC40LDE1LjItMTZoLTMxLjJjLTQtNC44LTgtMTAuNC0xMS4yLTE1LjJoNTMuNmMzLjItNC44LDYuNC0xMC40LDguOC0xNmgtNzEuMmMtMi40LTQuOC00LjgtMTAuNC02LjQtMTZoODMuMiAgYzQuOC0xNS4yLDgtMzEuMiw4LTQ4YzAtMTEuMi0xLjYtMjEuNi0zLjItMzJoLTkyLjhjMC44LTUuNiwyLjQtMTAuNCw0LTE2aDgzLjJjLTEuNi01LjYtNC0xMS4yLTYuNC0xNkgyMTYgIGMyLjQtNS42LDUuNi0xMC40LDguOC0xNmg1My42Yy0zLjItNS42LTcuMi0xMS4yLTEyLTE2aC0yOS42YzQuOC01LjYsOS42LTEwLjQsMTUuMi0xNS4yYy0yNi40LTI0LjgtNjIuNC0zOS4yLTEwMS42LTM5LjIgIEMxNTAuNCwxMDAuOCwxNTAuNCwxMDAuOCwxNDkuNiwxMDAuOHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0U1MjgzNjsiIGQ9Ik0wLDI1MmMwLDgzLjIsNjcuMiwxNTEuMiwxNTEuMiwxNTEuMmMzOS4yLDAsNzQuNC0xNS4yLDEwMS42LTM5LjJsMCwwbDAsMCAgYzUuNi00LjgsMTAuNC0xMC40LDE1LjItMTZoLTMxLjJjLTQtNC44LTgtMTAuNC0xMS4yLTE1LjJoNTMuNmMzLjItNC44LDYuNC0xMC40LDguOC0xNmgtNzEuMmMtMi40LTQuOC00LjgtMTAuNC02LjQtMTZoODMuMiAgYzQuOC0xNS4yLDgtMzEuMiw4LTQ4YzAtMTEuMi0xLjYtMjEuNi0zLjItMzJoLTkyLjhjMC44LTUuNiwyLjQtMTAuNCw0LTE2aDgzLjJjLTEuNi01LjYtNC0xMS4yLTYuNC0xNkgyMTYgIGMyLjQtNS42LDUuNi0xMC40LDguOC0xNmg1My42Yy0zLjItNS42LTcuMi0xMS4yLTEyLTE2aC0yOS42YzQuOC01LjYsOS42LTEwLjQsMTUuMi0xNS4yYy0yNi40LTI0LjgtNjIuNC0zOS4yLTEwMS42LTM5LjJoLTAuOCIvPgo8cGF0aCBzdHlsZT0iZmlsbDojQ0IyMDI2OyIgZD0iTTE1MS4yLDQwMy4yYzM5LjIsMCw3NC40LTE1LjIsMTAxLjYtMzkuMmwwLDBsMCwwYzUuNi00LjgsMTAuNC0xMC40LDE1LjItMTZoLTMxLjIgIGMtNC00LjgtOC0xMC40LTExLjItMTUuMmg1My42YzMuMi00LjgsNi40LTEwLjQsOC44LTE2aC03MS4yYy0yLjQtNC44LTQuOC0xMC40LTYuNC0xNmg4My4yYzQuOC0xNS4yLDgtMzEuMiw4LTQ4ICBjMC0xMS4yLTEuNi0yMS42LTMuMi0zMmgtOTIuOGMwLjgtNS42LDIuNC0xMC40LDQtMTZoODMuMmMtMS42LTUuNi00LTExLjItNi40LTE2SDIxNmMyLjQtNS42LDUuNi0xMC40LDguOC0xNmg1My42ICBjLTMuMi01LjYtNy4yLTExLjItMTItMTZoLTI5LjZjNC44LTUuNiw5LjYtMTAuNCwxNS4yLTE1LjJjLTI2LjQtMjQuOC02Mi40LTM5LjItMTAxLjYtMzkuMmgtMC44Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yMDQuOCwyOTAuNGwyLjQtMTMuNmMtMC44LDAtMi40LDAuOC00LDAuOGMtNS42LDAtNi40LTMuMi01LjYtNC44bDQuOC0yOGg4LjhsMi40LTE1LjJoLThsMS42LTkuNiAgIGgtMTZjMCwwLTkuNiw1Mi44LTkuNiw1OS4yYzAsOS42LDUuNiwxMy42LDEyLjgsMTMuNkMxOTkuMiwyOTIuOCwyMDMuMiwyOTEuMiwyMDQuOCwyOTAuNHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjEwLjQsMjY0LjhjMCwyMi40LDE1LjIsMjgsMjgsMjhjMTIsMCwxNi44LTIuNCwxNi44LTIuNGwzLjItMTUuMmMwLDAtOC44LDQtMTYuOCw0ICAgYy0xNy42LDAtMTQuNC0xMi44LTE0LjQtMTIuOEgyNjBjMCwwLDIuNC0xMC40LDIuNC0xNC40YzAtMTAuNC01LjYtMjMuMi0yMy4yLTIzLjJDMjIyLjQsMjI3LjIsMjEwLjQsMjQ0LjgsMjEwLjQsMjY0Ljh6ICAgIE0yMzguNCwyNDEuNmM4LjgsMCw3LjIsMTAuNCw3LjIsMTEuMkgyMjhDMjI4LDI1MiwyMjkuNiwyNDEuNiwyMzguNCwyNDEuNnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzQwLDI5MC40bDMuMi0xNy42YzAsMC04LDQtMTMuNiw0Yy0xMS4yLDAtMTYtOC44LTE2LTE4LjRjMC0xOS4yLDkuNi0yOS42LDIwLjgtMjkuNiAgIGM4LDAsMTQuNCw0LjgsMTQuNCw0LjhsMi40LTE2LjhjMCwwLTkuNi00LTE4LjQtNGMtMTguNCwwLTM2LjgsMTYtMzYuOCw0Ni40YzAsMjAsOS42LDMzLjYsMjguOCwzMy42ICAgQzMzMS4yLDI5Mi44LDM0MCwyOTAuNCwzNDAsMjkwLjR6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTExNi44LDIyNy4yYy0xMS4yLDAtMTkuMiwzLjItMTkuMiwzLjJMOTUuMiwyNDRjMCwwLDcuMi0zLjIsMTcuNi0zLjJjNS42LDAsMTAuNCwwLjgsMTAuNCw1LjYgICBjMCwzLjItMC44LDQtMC44LDRzLTQuOCwwLTcuMiwwYy0xMy42LDAtMjguOCw1LjYtMjguOCwyNGMwLDE0LjQsOS42LDE3LjYsMTUuMiwxNy42YzExLjIsMCwxNi03LjIsMTYuOC03LjJsLTAuOCw2LjRIMTMybDYuNC00NCAgIEMxMzguNCwyMjgsMTIyLjQsMjI3LjIsMTE2LjgsMjI3LjJ6IE0xMjAsMjYzLjJjMCwyLjQtMS42LDE1LjItMTEuMiwxNS4yYy00LjgsMC02LjQtNC02LjQtNi40YzAtNCwyLjQtOS42LDE0LjQtOS42ICAgQzExOS4yLDI2My4yLDEyMCwyNjMuMiwxMjAsMjYzLjJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTE1My42LDI5MmM0LDAsMjQsMC44LDI0LTIwLjhjMC0yMC0xOS4yLTE2LTE5LjItMjRjMC00LDMuMi01LjYsOC44LTUuNmMyLjQsMCwxMS4yLDAuOCwxMS4yLDAuOCAgIGwyLjQtMTQuNGMwLDAtNS42LTEuNi0xNS4yLTEuNmMtMTIsMC0yNCw0LjgtMjQsMjAuOGMwLDE4LjQsMjAsMTYuOCwyMCwyNGMwLDQuOC01LjYsNS42LTkuNiw1LjZjLTcuMiwwLTE0LjQtMi40LTE0LjQtMi40ICAgbC0yLjQsMTQuNEMxMzYsMjkwLjQsMTQwLDI5MiwxNTMuNiwyOTJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQ3Mi44LDIxNC40bC0zLjIsMjEuNmMwLDAtNi40LTgtMTUuMi04Yy0xNC40LDAtMjcuMiwxNy42LTI3LjIsMzguNGMwLDEyLjgsNi40LDI2LjQsMjAsMjYuNCAgIGM5LjYsMCwxNS4yLTYuNCwxNS4yLTYuNGwtMC44LDUuNmgxNmwxMi03Ni44TDQ3Mi44LDIxNC40eiBNNDY1LjYsMjU2LjhjMCw4LjgtNCwyMC0xMi44LDIwYy01LjYsMC04LjgtNC44LTguOC0xMi44ICAgYzAtMTIuOCw1LjYtMjAuOCwxMi44LTIwLjhDNDYyLjQsMjQzLjIsNDY1LjYsMjQ3LjIsNDY1LjYsMjU2Ljh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI5LjYsMjkxLjJsOS42LTU3LjZsMS42LDU3LjZINTJsMjAuOC01Ny42TDY0LDI5MS4yaDE2LjhsMTIuOC03Ni44SDY3LjJsLTE2LDQ3LjJsLTAuOC00Ny4ySDI3LjIgICBsLTEyLjgsNzYuOEgyOS42eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yNzcuNiwyOTEuMmM0LjgtMjYuNCw1LjYtNDgsMTYuOC00NGMxLjYtMTAuNCw0LTE0LjQsNS42LTE4LjRjMCwwLTAuOCwwLTMuMiwwICAgYy03LjIsMC0xMi44LDkuNi0xMi44LDkuNmwxLjYtOC44aC0xNS4yTDI2MCwyOTJoMTcuNlYyOTEuMnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzc2LjgsMjI3LjJjLTExLjIsMC0xOS4yLDMuMi0xOS4yLDMuMmwtMi40LDEzLjZjMCwwLDcuMi0zLjIsMTcuNi0zLjJjNS42LDAsMTAuNCwwLjgsMTAuNCw1LjYgICBjMCwzLjItMC44LDQtMC44LDRzLTQuOCwwLTcuMiwwYy0xMy42LDAtMjguOCw1LjYtMjguOCwyNGMwLDE0LjQsOS42LDE3LjYsMTUuMiwxNy42YzExLjIsMCwxNi03LjIsMTYuOC03LjJsLTAuOCw2LjRIMzkybDYuNC00NCAgIEMzOTkuMiwyMjgsMzgyLjQsMjI3LjIsMzc2LjgsMjI3LjJ6IE0zODAuOCwyNjMuMmMwLDIuNC0xLjYsMTUuMi0xMS4yLDE1LjJjLTQuOCwwLTYuNC00LTYuNC02LjRjMC00LDIuNC05LjYsMTQuNC05LjYgICBDMzgwLDI2My4yLDM4MCwyNjMuMiwzODAuOCwyNjMuMnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDEyLDI5MS4yYzQuOC0yNi40LDUuNi00OCwxNi44LTQ0YzEuNi0xMC40LDQtMTQuNCw1LjYtMTguNGMwLDAtMC44LDAtMy4yLDAgICBjLTcuMiwwLTEyLjgsOS42LTEyLjgsOS42bDEuNi04LjhoLTE1LjJMMzk0LjQsMjkySDQxMlYyOTEuMnoiLz4KPC9nPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNMTgwLDI3OS4yYzAsOS42LDUuNiwxMy42LDEyLjgsMTMuNmM1LjYsMCwxMC40LTEuNiwxMi0yLjRsMi40LTEzLjZjLTAuOCwwLTIuNCwwLjgtNCwwLjggICBjLTUuNiwwLTYuNC0zLjItNS42LTQuOGw0LjgtMjhoOC44bDIuNC0xNS4yaC04bDEuNi05LjYiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNMjE4LjQsMjY0LjhjMCwyMi40LDcuMiwyOCwyMCwyOGMxMiwwLDE2LjgtMi40LDE2LjgtMi40bDMuMi0xNS4yYzAsMC04LjgsNC0xNi44LDQgICBjLTE3LjYsMC0xNC40LTEyLjgtMTQuNC0xMi44SDI2MGMwLDAsMi40LTEwLjQsMi40LTE0LjRjMC0xMC40LTUuNi0yMy4yLTIzLjItMjMuMkMyMjIuNCwyMjcuMiwyMTguNCwyNDQuOCwyMTguNCwyNjQuOHogICAgTTIzOC40LDI0MS42YzguOCwwLDEwLjQsMTAuNCwxMC40LDExLjJIMjI4QzIyOCwyNTIsMjI5LjYsMjQxLjYsMjM4LjQsMjQxLjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTM0MCwyOTAuNGwzLjItMTcuNmMwLDAtOCw0LTEzLjYsNGMtMTEuMiwwLTE2LTguOC0xNi0xOC40YzAtMTkuMiw5LjYtMjkuNiwyMC44LTI5LjYgICBjOCwwLDE0LjQsNC44LDE0LjQsNC44bDIuNC0xNi44YzAsMC05LjYtNC0xOC40LTRjLTE4LjQsMC0yOC44LDE2LTI4LjgsNDYuNGMwLDIwLDEuNiwzMy42LDIwLjgsMzMuNiAgIEMzMzEuMiwyOTIuOCwzNDAsMjkwLjQsMzQwLDI5MC40eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik05NS4yLDI0NC44YzAsMCw3LjItMy4yLDE3LjYtMy4yYzUuNiwwLDEwLjQsMC44LDEwLjQsNS42YzAsMy4yLTAuOCw0LTAuOCw0cy00LjgsMC03LjIsMCAgIGMtMTMuNiwwLTI4LjgsNS42LTI4LjgsMjRjMCwxNC40LDkuNiwxNy42LDE1LjIsMTcuNmMxMS4yLDAsMTYtNy4yLDE2LjgtNy4ybC0wLjgsNi40SDEzMmw2LjQtNDRjMC0xOC40LTE2LTE5LjItMjIuNC0xOS4yICAgIE0xMjgsMjYzLjJjMCwyLjQtOS42LDE1LjItMTkuMiwxNS4yYy00LjgsMC02LjQtNC02LjQtNi40YzAtNCwyLjQtOS42LDE0LjQtOS42QzExOS4yLDI2My4yLDEyOCwyNjMuMiwxMjgsMjYzLjJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTEzNiwyOTAuNGMwLDAsNC44LDEuNiwxOC40LDEuNmM0LDAsMjQsMC44LDI0LTIwLjhjMC0yMC0xOS4yLTE2LTE5LjItMjRjMC00LDMuMi01LjYsOC44LTUuNiAgIGMyLjQsMCwxMS4yLDAuOCwxMS4yLDAuOGwyLjQtMTQuNGMwLDAtNS42LTEuNi0xNS4yLTEuNmMtMTIsMC0xNiw0LjgtMTYsMjAuOGMwLDE4LjQsMTIsMTYuOCwxMiwyNGMwLDQuOC01LjYsNS42LTkuNiw1LjYiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNNDY5LjYsMjM2YzAsMC02LjQtOC0xNS4yLThjLTE0LjQsMC0xOS4yLDE3LjYtMTkuMiwzOC40YzAsMTIuOC0xLjYsMjYuNCwxMiwyNi40ICAgYzkuNiwwLDE1LjItNi40LDE1LjItNi40bC0wLjgsNS42aDE2bDEyLTc2LjggTTQ2OC44LDI1Ni44YzAsOC44LTcuMiwyMC0xNiwyMGMtNS42LDAtOC44LTQuOC04LjgtMTIuOGMwLTEyLjgsNS42LTIwLjgsMTIuOC0yMC44ICAgQzQ2Mi40LDI0My4yLDQ2OC44LDI0Ny4yLDQ2OC44LDI1Ni44eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik0yOS42LDI5MS4ybDkuNi01Ny42bDEuNiw1Ny42SDUybDIwLjgtNTcuNkw2NCwyOTEuMmgxNi44bDEyLjgtNzYuOGgtMjBsLTIyLjQsNDcuMmwtMC44LTQ3LjJoLTguOCAgIGwtMjcuMiw3Ni44SDI5LjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRENFNUU1OyIgZD0iTTI2MC44LDI5MS4yaDE2LjhjNC44LTI2LjQsNS42LTQ4LDE2LjgtNDRjMS42LTEwLjQsNC0xNC40LDUuNi0xOC40YzAsMC0wLjgsMC0zLjIsMCAgIGMtNy4yLDAtMTIuOCw5LjYtMTIuOCw5LjZsMS42LTguOCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0RDRTVFNTsiIGQ9Ik0zNTUuMiwyNDQuOGMwLDAsNy4yLTMuMiwxNy42LTMuMmM1LjYsMCwxMC40LDAuOCwxMC40LDUuNmMwLDMuMi0wLjgsNC0wLjgsNHMtNC44LDAtNy4yLDAgICBjLTEzLjYsMC0yOC44LDUuNi0yOC44LDI0YzAsMTQuNCw5LjYsMTcuNiwxNS4yLDE3LjZjMTEuMiwwLDE2LTcuMiwxNi44LTcuMmwtMC44LDYuNEgzOTJsNi40LTQ0YzAtMTguNC0xNi0xOS4yLTIyLjQtMTkuMiAgICBNMzg4LDI2My4yYzAsMi40LTkuNiwxNS4yLTE5LjIsMTUuMmMtNC44LDAtNi40LTQtNi40LTYuNGMwLTQsMi40LTkuNiwxNC40LTkuNkMzODAsMjYzLjIsMzg4LDI2My4yLDM4OCwyNjMuMnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNEQ0U1RTU7IiBkPSJNMzk1LjIsMjkxLjJINDEyYzQuOC0yNi40LDUuNi00OCwxNi44LTQ0YzEuNi0xMC40LDQtMTQuNCw1LjYtMTguNGMwLDAtMC44LDAtMy4yLDAgICBjLTcuMiwwLTEyLjgsOS42LTEyLjgsOS42bDEuNi04LjgiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
			case 'visa':
				return <img style={style} 
					src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzNDNThCRjsiIHBvaW50cz0iMTg0LjgsMzI0LjQgMjEwLjQsMTgwLjQgMjUwLjQsMTgwLjQgMjI1LjYsMzI0LjQgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiMyOTM2ODg7IiBwb2ludHM9IjE4NC44LDMyNC40IDIxNy42LDE4MC40IDI1MC40LDE4MC40IDIyNS42LDMyNC40ICIvPgo8cGF0aCBzdHlsZT0iZmlsbDojM0M1OEJGOyIgZD0iTTM3MC40LDE4MmMtOC0zLjItMjAuOC02LjQtMzYuOC02LjRjLTQwLDAtNjguOCwyMC02OC44LDQ4LjhjMCwyMS42LDIwLDMyLjgsMzYsNDAgIHMyMC44LDEyLDIwLjgsMTguNGMwLDkuNi0xMi44LDE0LjQtMjQsMTQuNGMtMTYsMC0yNC44LTIuNC0zOC40LThsLTUuNi0yLjRsLTUuNiwzMi44YzkuNiw0LDI3LjIsOCw0NS42LDggIGM0Mi40LDAsNzAuNC0yMCw3MC40LTUwLjRjMC0xNi44LTEwLjQtMjkuNi0zNC40LTQwYy0xNC40LTcuMi0yMy4yLTExLjItMjMuMi0xOC40YzAtNi40LDcuMi0xMi44LDIzLjItMTIuOCAgYzEzLjYsMCwyMy4yLDIuNCwzMC40LDUuNmw0LDEuNkwzNzAuNCwxODJMMzcwLjQsMTgyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojMjkzNjg4OyIgZD0iTTM3MC40LDE4MmMtOC0zLjItMjAuOC02LjQtMzYuOC02LjRjLTQwLDAtNjEuNiwyMC02MS42LDQ4LjhjMCwyMS42LDEyLjgsMzIuOCwyOC44LDQwICBzMjAuOCwxMiwyMC44LDE4LjRjMCw5LjYtMTIuOCwxNC40LTI0LDE0LjRjLTE2LDAtMjQuOC0yLjQtMzguNC04bC01LjYtMi40bC01LjYsMzIuOGM5LjYsNCwyNy4yLDgsNDUuNiw4ICBjNDIuNCwwLDcwLjQtMjAsNzAuNC01MC40YzAtMTYuOC0xMC40LTI5LjYtMzQuNC00MGMtMTQuNC03LjItMjMuMi0xMS4yLTIzLjItMTguNGMwLTYuNCw3LjItMTIuOCwyMy4yLTEyLjggIGMxMy42LDAsMjMuMiwyLjQsMzAuNCw1LjZsNCwxLjZMMzcwLjQsMTgyTDM3MC40LDE4MnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzNDNThCRjsiIGQ9Ik00MzkuMiwxODAuNGMtOS42LDAtMTYuOCwwLjgtMjAuOCwxMC40bC02MCwxMzMuNmg0My4ybDgtMjRoNTEuMmw0LjgsMjRINTA0bC0zMy42LTE0NEg0MzkuMnogICBNNDIwLjgsMjc2LjRjMi40LTcuMiwxNi00Mi40LDE2LTQyLjRzMy4yLTguOCw1LjYtMTQuNGwyLjQsMTMuNmMwLDAsOCwzNiw5LjYsNDRoLTMzLjZWMjc2LjR6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOTM2ODg7IiBkPSJNNDQ4LjgsMTgwLjRjLTkuNiwwLTE2LjgsMC44LTIwLjgsMTAuNGwtNjkuNiwxMzMuNmg0My4ybDgtMjRoNTEuMmw0LjgsMjRINTA0bC0zMy42LTE0NEg0NDguOHogICBNNDIwLjgsMjc2LjRjMy4yLTgsMTYtNDIuNCwxNi00Mi40czMuMi04LjgsNS42LTE0LjRsMi40LDEzLjZjMCwwLDgsMzYsOS42LDQ0aC0zMy42VjI3Ni40eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojM0M1OEJGOyIgZD0iTTExMS4yLDI4MS4ybC00LTIwLjhjLTcuMi0yNC0zMC40LTUwLjQtNTYtNjMuMmwzNiwxMjhoNDMuMmw2NC44LTE0NEgxNTJMMTExLjIsMjgxLjJ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOTM2ODg7IiBkPSJNMTExLjIsMjgxLjJsLTQtMjAuOGMtNy4yLTI0LTMwLjQtNTAuNC01Ni02My4ybDM2LDEyOGg0My4ybDY0LjgtMTQ0SDE2MEwxMTEuMiwyODEuMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkMwMDsiIGQ9Ik0wLDE4MC40bDcuMiwxLjZjNTEuMiwxMiw4Ni40LDQyLjQsMTAwLDc4LjRsLTE0LjQtNjhjLTIuNC05LjYtOS42LTEyLTE4LjQtMTJIMHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y3OTgxRDsiIGQ9Ik0wLDE4MC40TDAsMTgwLjRjNTEuMiwxMiw5My42LDQzLjIsMTA3LjIsNzkuMmwtMTMuNi01Ni44Yy0yLjQtOS42LTEwLjQtMTUuMi0xOS4yLTE1LjJMMCwxODAuNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0VEN0MwMDsiIGQ9Ik0wLDE4MC40TDAsMTgwLjRjNTEuMiwxMiw5My42LDQzLjIsMTA3LjIsNzkuMmwtOS42LTMxLjJjLTIuNC05LjYtNS42LTE5LjItMTYuOC0yMy4yTDAsMTgwLjR6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzA1MTI0NDsiIGQ9Ik0xNTEuMiwyNzYuNEwxMjQsMjQ5LjJsLTEyLjgsMzAuNGwtMy4yLTIwYy03LjItMjQtMzAuNC01MC40LTU2LTYzLjJsMzYsMTI4aDQzLjJMMTUxLjIsMjc2LjR6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgcG9pbnRzPSIyMjUuNiwzMjQuNCAxOTEuMiwyODkuMiAxODQuOCwzMjQuNCAgIi8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgZD0iTTMxNy42LDI3NC44TDMxNy42LDI3NC44YzMuMiwzLjIsNC44LDUuNiw0LDguOGMwLDkuNi0xMi44LDE0LjQtMjQsMTQuNGMtMTYsMC0yNC44LTIuNC0zOC40LTggICBsLTUuNi0yLjRsLTUuNiwzMi44YzkuNiw0LDI3LjIsOCw0NS42LDhjMjUuNiwwLDQ2LjQtNy4yLDU4LjQtMjBMMzE3LjYsMjc0Ljh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDUxMjQ0OyIgZD0iTTM2NCwzMjQuNGgzNy42bDgtMjRoNTEuMmw0LjgsMjRINTA0TDQ5MC40LDI2NmwtNDgtNDYuNGwyLjQsMTIuOGMwLDAsOCwzNiw5LjYsNDRoLTMzLjYgICBjMy4yLTgsMTYtNDIuNCwxNi00Mi40czMuMi04LjgsNS42LTE0LjQiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
			case 'amex':
				return <i className={"svg-flat-amex"}></i>
			case 'elo': 
				return <i className={"svg-flat-elo"}></i>
		}

	}

	static checkContentExists(content) {
		let returnedContent;
		try {
			returnedContent = content;
		}
		catch (err) {
			returnedContent = "";
		}
		return content;
	}


	static convertEmojiOneToReact(emojiOriginal) {
		let emojiConvertedToReact = emojiOriginal.replace("class", "className");
		// console.log(<div dangerouslySetInnerHTML={emojiConvertedToReact} />);
		// console.log($(emojiConvertedToReact));
		// let d = document.createElement('div');
		// d.innerHTML = emojiConvertedToReact;
		return <div className='emojione-unit' dangerouslySetInnerHTML={{ __html: emojiConvertedToReact }} />;
	}

	/*
	- Defining the standard language for the app according
	to the navigator language
	*/
	static defineLanguage() {

		switch (navigator.languages[0]) {
			case 'en-US':
				i18n.setLocale('en-US');
				//alert(`selected ${eventKey}`);
				break;
			case 'ja-JP':
				i18n.setLocale('ja-JP');
				//alert(`selected ${eventKey}`);
				break;
			case 'de-DE':
				i18n.setLocale('de-DE');
				//alert(`selected ${eventKey}`);
				break;
			case 'pt-BR':
				i18n.setLocale('pt-BR');
				//alert(`selected ${eventKey}`);
				break;
			default:
				i18n.setLocale('en-US');
				break;
		}
		//console.log(i18n.getLocale());
	}

}

export { Repeatable, DataSelect, Helpers, CheckboxList };
