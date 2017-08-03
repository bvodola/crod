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
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

let depth = 1;


class AdList extends Component {



  constructor(props) {
    super(props);

    this.state = {
      open: false,
      shadow: 1,
    };

    this.style = {
      footerButton: {
        label: {
          fontSize: '14px',
          width: '10vw',
          margin: 'none'
        },
        icon: {
          fontSize: '16px',
          marginLeft: '0'
        }
      }
    }
  }


  componentWillMount() {
    console.log(this.props.ad)
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };


  onMouseOver() {
    depth = 3
    this.setState({ shadow: 3 })
  }

  onMouseOut() {
    depth = 1
    this.setState({ shadow: 1 })
  }



  productList() {

    let product;
    let render = []

    console.log(this.props.ad.length)
    console.log(this.props.ad)

    for (let i = 0; i < this.props.ad.length; i++) {

      let ad = this.props.ad[i];

      console.log(this.props.ad[i])
      if (typeof this.props.ad !== 'undefined') {
        let ads = this.props.ad
        let dateFinished = new Date();
        dateFinished.setDate(dateFinished.getDate() + 10);
        dateFinished = moment(dateFinished).format('YYYY-MM-DD HH:mm:ss')

        if (ads[i].is_active == true && dateFinished > ads[i].created) {
          render[i] = (

            <div className="col s6 m6 l6" style={{ marginBottom: '1em' }} key={i} >
              <Paper zDepth={1}>
                <Card style={{ minHeight: 'none', }} expandable={false}>
                  <CardHeader
                    title={ad.seller.profile.name}
                    subtitle={
                      <div style={{ fontSize: '10px' }} >
                        <i className="fa fa-star star-color star-color" ></i><i className="fa fa-star star-color"></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i>
                      </div>}
                    avatar={ad.seller.profile.image}
                  />

                  <List>
                    <CardMedia  >
                      <div style={{height: '150px', overflow: 'hidden'}} >
                        <img style={{marginTop: '24px', width: '100%'}}  src={ad.images[0]} />
                      </div>
                    </CardMedia>
                    <Link to={'/adPage/' + ad._id}>
                      <h3 style={{
                        textAlign: 'center',
                        color: 'black',
                        fontWeight: '300',
                        fontSize: '115%'
                      }}>
                        {/* Product Name  */}
                        {ad.title}
                      </h3>
                      <h3 className="price-layout" >
                        {/* Product Price  */}
                        {"R$ " + ad.price}

                      </h3>
                    </Link>
                  </List>
                </Card>
              </ Paper >
            </div>
          )
        }
      }
    }
    return render;
  }


  render() {

    if (!this.props.loading) {
      return (
        <div className="row">

          {this.productList()}

        </div>
      );
    }
    else {
      return <div>{this.props.loading}</div>
    }
  }

}
export default AdList;
