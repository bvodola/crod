import React, { Component } from 'react';
import Meteor from  'react-meteor-client';
import Cookie from 'js-cookie'
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';



class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      premium: 0,
      freemium: 0,
      value: 0
    }
  }


  countAffiliatesAccount() {
    let affiliates = this.props.myAffiliates;
    let count = 0;
    let freemium = this.state.freemium
    let premium = this.state.premium

    affiliates.map((affiliate, i) => {
      if (affiliate.premium.is_premium) {
        this.setState({ premium: premium + 1 })
      } else {
        console.log('to no map()')
        this.setState({ freemium: freemium + 1 })
      }
    })

  }

  getComission() {
    let premium = this.state.premium

    Meteor.call('getComissionValue', this.props.currentUser._id, (error, result) => {
      if (!error) {
        this.setState({ value: result.total })
        this.setState({ premium: result.total_affiliates })
      } else {
        console.log(error)
      }
    })

  }

  componentWillMount() {
    console.log('to no componentWillMount()')
    let self = this
    setTimeout(function () {
      self.countAffiliatesAccount.bind(self)();
    }, 1000);

  }


  render() {
    let { currentUser } = this.props;
    if (!this.props.loading) {

      console.log(this.props.myAffiliates)

      return (
        <div >
          <button onClick={() => this.getComission()}> TESTE </button>
          <div style={{
            display: '-webkit-box',
            position: 'relative',
            width: '100%',
            margin: '25px 0',
            borderRadius: '3px',
            color: 'rgba(0,0,0, 0.87)',
            background: '#fff',
            width: '100%'
          }}>
            <Card style={{ height: '150px', width: '50%' }}>
              <CardHeader
                style={{ padding: '10px', paddingRight: '90px' }}
                title={<FontIcon style={{ fontSize: '35px', color: '#FFCA43' }} className="material-icons">supervisor_account</FontIcon>}
                subtitle="Afiliados (Premium)" />
              <CardTitle title={this.state.premium} />
            </Card>
            <Card style={{ height: '150px', width: '50%', marginLeft: '5%' }}>
              <CardHeader
                style={{ padding: '10px', paddingRight: '90px' }}
                title={<FontIcon style={{ fontSize: '35px', color: '#FFCA43' }} className="material-icons">supervisor_account</FontIcon>}
                subtitle="Afiliados (Freemium)" />
              <CardTitle title={this.state.freemium} />
            </Card>
          </div>
          <div style={{
            display: '-webkit-box',
            position: 'relative',
            width: '100%',
            margin: '25px 0',
            borderRadius: '3px',
            color: 'rgba(0,0,0, 0.87)',
            background: '#fff',
            width: '100%'
          }}>
            <Card style={{ height: '150px', width: '50%' }}>
              <CardHeader
                style={{ padding: '10px', paddingRight: '90px' }}
                title={<FontIcon style={{ fontSize: '35px', color: '#FFCA43' }} className="material-icons">addd_box</FontIcon>}
                subtitle="Convidar Mais pessoas" />
              <CardTitle title="Convide seus amigos" />
            </Card>
            <Card style={{ height: '150px', width: '50%', marginLeft: '5%' }}>
              <CardHeader
                style={{ padding: '10px', paddingRight: '90px' }}
                title={<FontIcon style={{ fontSize: '35px', color: '#FFCA43' }} className="material-icons">monetization_on</FontIcon>}
                subtitle="Comissão à receber" />
              <CardTitle title={"R$ " + this.state.value.toFixed(2)} />
              <CardActions>
                <RaisedButton
                  label="Calcular valor"
                  primary={true}
                  onTouchTap={() => this.getComission()}
                />
              </CardActions>
            </Card>
          </div>
        </div>
      );
    } else {
      return <div>{this.props.loading}</div>
    }
  }
}

export default Dashboard;
