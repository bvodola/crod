import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';


class ConfirmationOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {},
      status: ''
    };
  }


  componentDidMount() {
  }


  paymentStatus() {

    if (typeof this.props.payment_info !== 'undefined') {
      let captures = this.props.payment_info.captures
      return captures.map((capture, i) => {
        if (capture.status_code == "0") {
          return <div>
            <div style={{ marginTop: '15px', color: "gray" }}> Transação: Compra aprovada  <FontIcon color="gray" style={{ fontSize: '30px' }} className="material-icons">sentiment_very_satisfied</FontIcon></div>
          </div>
        }
        if (capture.status_code == "9") {
          return <div>
            <div style={{ marginTop: '15px', color: "gray" }}>Transação: Ops! Tivemos um problema na transação, entre em contato com a sua administradora <FontIcon color="gray" style={{ fontSize: '30px' }} className="material-icons">sentiment_very_dissatisfied</FontIcon> </div>
          </div>
        }
        if (typeof capture.status_code == "undefined") {
          return <div>
            <div style={{ marginTop: '15px', color: "gray" }}>Transação: Aguardando...</div>
          </div>
        }
      })
    }

  }

  render() {
    console.log(typeof this.props.order, '<--- Props')
    console.log(this.state, '<<-- State')
    let order = this.props.order
    console.log(this.props.order)
    console.log(this.props.payment_info)
    if (typeof this.props.order !== 'undefined') {

      console.log(this.props.order, '<--- Props TYPE')
      return (
        <div className="row">
          <CardTitle title={"Order Nº: " + this.props.order._id} subtitle={this.paymentStatus()} />

          <Link to="/shopping/" >
            <ListItem primaryText='Comprar mais' leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>} />
          </Link>
          <Link to="/orders/buyer">
            <ListItem primaryText="Detalhes das minhas compras" key={2} leftIcon={<FontIcon className="material-icons">shop_two</FontIcon>} />
          </Link>
        </div>
      );
    }

    else {
      return <div>{this.props.loading}</div>
    }

  }



}


export default ConfirmationOrder 