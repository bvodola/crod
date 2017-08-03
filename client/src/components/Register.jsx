import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import Meteor from  'react-meteor-client';
import i18n from 'meteor/universe:i18n';
import { Helpers } from '../helpers/Helpers';


/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();


const styles = {

  btn: {
    backgroundColor: '#ffca43'
  },

  img: {
    marginTop: 50,
  }
}

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNameInput: "",
      classNamePass: "",
      classNamePassA: ""
    }
  }

  // handleChange(name) {
  //     console.log(
  //    // console.log(Accounts.findUserByUsername('teste'));

  // }


  handleSubmit(event) {

    event.preventDefault();

    // validation email account
    let regexEmail = /(((?=.*[a-zA-Z])(?=.*[._@#$%])[a-zA-Z0-9@$$%._-]{5,}))/;

    // Regex validation password
    let reg = /(((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9@$$%#&*()]{6,15}))/;

    let options = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      emailAgain: this.refs.emailAgain.value,
      password: this.refs.password.value,
      passwordAgain: this.refs.passwordAgain.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value
    }


    //Function for validation password
    let isValidPassword = function (pwd, pwd2) {
      if (pwd === pwd2 && pwd.length >= 6) {
        if (!reg.exec(pwd)) {
          return alert("A senha deve conter ao minimo 1 letra e 1 numero");

        } else return true;
      }

      if (pwd.length < 6) {
        return alert("Minimo 6 caracteres para senha ");
      }

      else {
        return alert("As senhas digitadas estão diferentes");

      }
    }

    isValidEmailAccountForm = function (email, email2) {
      if (regexEmail.exec(email)) {
        return
      }


      //if(email === email2 && email.length >=5)

    }




    if (isValidPassword(options.password, options.passwordAgain)) {
      Accounts.createUser({
        username: options.username,
        email: options.email,
        password: options.password,
        firstName: options.firstName,
        lastName: options.lastName

      }, function (e) {
        if (e) {
          console.log(e.message);
          if (e.message === "Email already exists. [403]") {
            alert("Esta conta de email ja esta vinculada a putro usuario");
          }
          if (e.message === "Username already exists. [403]") {
            console.log(e);
          }
        }
      },
      console.log(options));
      ReactDOM.findDOMNode(this.refs.email).value = '';
      ReactDOM.findDOMNode(this.refs.username).value = '';
      ReactDOM.findDOMNode(this.refs.firstName).value = '';
      ReactDOM.findDOMNode(this.refs.lastName).value = '';
      ReactDOM.findDOMNode(this.refs.password).value = '';
      ReactDOM.findDOMNode(this.refs.passwordAgain).value = '';
    }

  }


  componentDidMount() {

    Helpers.defineLanguage();

  }


  // function for find User
  findUser() {
    let user = this.refs.username.value;
    let self = this;
    console.log(user);

    Meteor.call('doesUserExist', user, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result === true) {
        console.log(result);
        self.setState({ classNameInput: "invalid" }, function () {
          return true;
        });

      }
      if (result === false) {
        console.log(result);
        self.setState({ classNameInput: "valid" }, function () {
          return false;
        });

      }
    });
  }



  //function for validation input form password
  passwordCompare() {

    let pwd = this.refs.password.value;
    let pwd2 = this.refs.passwordAgain.value;
    let self = this;
    console.log(pwd, pwd2);

    if (pwd.length >= 6 && pwd === pwd2) {
      console.log(pwd.length + 'TO NO IF ');
      self.setState({
        classNamePass: "valid",
        classNamePassA: "valid"
      }, function () {
        return true;
      });
    }

    if (pwd2 != pwd) {
      self.setState({
        classNamePass: "valid",
        classNamePassA: "invalid"
      }, function () {
        return false;
      });
    }

    if (pwd == "") {
      self.setState({
        classNamePass: "",
        classNamePassA: "invalid"
      }, function () {
        return false;
      });
    }
  }

  //
  render() {

    return (
      <div className="page">
        <div className="page-content login-screen-content">

          <div className="login-screen-title"><img src="/img/CrodityLogo.jpg" alt="Crodity Logo" /></div>

          <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">

            <div className="list-block">
              <ul>
                <li className="item-content">
                  <div className="item-media">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="row">
                    <div className="col-50">
                      <div className="item-inner">
                        <div className="item-input">
                          <input ref="firstName" placeholder="First Name" id="first_name" type="text" className="validate"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-50">
                      <div className="item-inner">
                        <div className="item-input">
                          <input ref="lastName" placeholder="Last Name" id="last_name" type="text" className="validate"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="item-content">
                  <div className="item-media">
                    <i className="fa fa-lock fa-2x"></i>
                  </div>
                  <div className="row">
                    <div className="col-50">
                      <div className="item-inner">
                        <div className="item-input">
                          // Fazer diferente aqui embaixo
                          <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                            data-tooltip="A senha deve conter ao minimo seis caracterer com uma letra e um número.">
                            <input ref="password" placeholder="Password"
                              onChange={this.passwordCompare.bind(this)} id="password" type="password"
                              className={this.state.classNamePass}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-50">
                      <div className="item-inner">
                        <div className="item-input">
                          // Fazer diferente aqui embaixo
                          <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                            data-tooltip="Confirme a senha digitada.">
                            <input ref="passwordAgain" placeholder="Confirm Password"
                              onChange={this.passwordCompare.bind(this)} id="password" type="password"
                              className={this.state.classNamePassA}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="item-content">
                  <div className="item-media">
                    <i className="fa fa-envelope-o fa-2x"></i>
                  </div>
                  <div className="item-inner">
                    <div className="item-input">
                      // Fazer diferente aqui embaixo
                      <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                        data-tooltip="Digite um email válido.">
                        <input ref="email" id="email" type="email" placeholder="Insert e-mail"/>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="item-content">
                  <div className="item-media">
                    <i className="fa fa-envelope fa-2x"></i>
                  </div>
                  <div className="item-inner">
                    <div className="item-input">
                      // Fazer diferente aqui embaixo
                      <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                        data-tooltip="Confirme seu email.">
                        <input ref="emailAgain" id="email" type="email" placeholder="Confirm e-mail"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="item-content">
                  <div className="item-media">
                    <i className="fa fa-address-card fa-2x"></i>
                  </div>
                  <div className="item-inner">
                    <div className="item-input">
                      <input ref="username" placeholder="Username" onChange={this.findUser.bind(this)}
                        id="username" type="text" className={this.state.classNameInput}/>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="row">
                    <div className="col-20"></div>
                    <div className="col-70">
                      <p><a href="#" className="item-link button button-fill crodity-background-color">
                        <T>common.Form_actions.send</T>
                      </a></p>
                    </div>
                    <div className="col-10"></div>
                  </div>

                </li>
              </ul>
            </div>

          </form>

        </div>

      </div>
    );
  }
}

export default Register;
