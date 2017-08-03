import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Chip from 'material-ui/Chip';



let depth = 1;


class Product extends Component {



  constructor(props) {
    super(props);

    this.state = {
      open: false,
      shadow: 1,
      parentId: '',
      categoryId: '',
      quantity: 1,
      parentCategory: []
    };


    this.style = {
      priceLayout: {
        color: 'darkgreen',
        fontSize: '14px',
        fontWeight: '100',
        textAlign: 'center'
      },
      img: {
        maxHeigth: '400px'
      },
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
      },
      starColor: {
        textColor: '#ffd700'
      },

      quantityStyle: {
        textAlign: 'end',
        justifyContent: 'center',
        padding: '4px',
        marginBottom: '4px',
        marginTop: '4px'
      },
      quantity: {
        textAlign: 'right',
        marginTop: '-4em'
      },
      medium: {
        width: 36,
        height: 36,
        padding: 16,
      },
      mediumIcon: {
        width: 36,
        height: 36,
      },

    }
  }

  addItens() {

    let quantity = this.state.quantity;
    let self = this;
    this.setState({ quantity: quantity + 1 }, () => {
      console.log(quantity);
      self.props.handleQuantity(quantity);
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

  setCart() {

    let obj = {
      _id: this.props.ad._id,
      qty: this.state.quantity
    }
    let arr = [obj];
    let cart = JSON.stringify(arr);

    localStorage.setItem('cart', cart);

  }

  getItemCart() {

    let cart = localStorage.getItem('cart')
    cart = JSON.parse(cart);

    return cart;

  }

  onMouseOver() {
    depth = 3
    this.setState({ shadow: 3 })
  }

  onMouseOut() {
    depth = 1
    this.setState({ shadow: 1 })
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

  renderImages(array) {
    //returns a Image Galery
    console.log('images array = ', array)
    let images = []
    
    array.map((image, i) => (
      images.push({ 'original': image, 'thumbnail': image, originalClass: this.style.img, 'sizes': "10x10" })
    ))

    return (
      <div>
        <ImageGallery
          items={images}
          showPlayButton={false}
          onImageLoad={this.handleImageLoad}
          showBullets={true}
          slideOnThumbnailHover={true}

        />
      </div>
    )
  }

  getParentCategory(category) {

    Meteor.call('getCategory', category, (e, r) => {

      if (!e) {

        console.log('response = ', r)
        Meteor.call('getParentCategory', r._id, (e, r) => {

          if (!e) {
            this.setState({ parentCategory: r }, () => { console.log(this.state.parentCategory) })
          }
        })
      }
    })

  }

  componentDidMount() {
    let category = this.props.ad.category
    this.getParentCategory(category)
  }

  handleRenderMedia() {

    if (this.props.ad) {

      let ad = this.props.ad;
      if (this.props.rev) {

        let installmentPrice = this.props.purchaseTotal / this.props.paymentMethod;
        installmentPrice = parseFloat(installmentPrice.toFixed(2));

        return (<CardMedia overlay={<CardTitle title={this.props.paymentMethod + 'x   R$ ' + installmentPrice} />}>
          <a onTouchTap={() => this.handleOpen()} >
            <img style={{ width: 'inherit' }} src={ad.images[0]} />
          </a>
          <Dialog
            onRequestClose={() => this.handleClose()}
            open={this.state.open}
            modal={false}
            contentStyle={{ maxWidth: 'none', maxHeigth: 'none' }}
          >
          </Dialog>
        </CardMedia>);

      } else {

        return (

          <div>
            {this.renderImages(this.props.ad.images)}
          </div>
        );
      }
    }
  }

  render() {

    if (typeof this.props.ad !== 'undefined' && !this.props.adRev) {
      let ad = this.props.ad;
      let seller = this.props.currentUser;



      console.log(this.props.currentUser);
      console.log(ad)


      return (
        <div className="row">
          <div className="col s12 m10 l10 " style={{ marginBottom: '1vw' }}>
            <Paper zDepth={2}>
              <Card >

                {this.props.rev ? "" : <CardHeader
                  title={this.props.seller.profile.name}
                  subtitle={
                    <div className=" ">
                      {this.props.seller.profile.name} &nbsp;
                    <i className="fa fa-star star-color star-color" ></i><i className="fa fa-star star-color"></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i>
                    </div>
                  }
                  avatar={this.props.seller.profile.image}
                />
                }
                <Divider />


                <List>

                  {this.handleRenderMedia()}

                  <h3 style={{
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '300',
                    fontSize: '115%'
                  }}>

                    {/* Product Info  */}
                    {this.props.rev ? 'Quantidade: ' + this.props.qty + ' x ' +
                      'R$' + ad.price : ad.title}
                    {this.props.rev ? <h6>{'Total da compra R$' + this.props.purchaseTotal}</h6> : ""}
                  </h3>
                  <div>
                    {/* Product Price  */}
                    {this.props.rev ? "" :
                      <div style={{ width: '100%', textAlign: 'center' }} >
                        <Chip className="price-layout"
                          labelStyle={this.style.priceLayout}
                          style={{ display: 'inline-block' }}> {'R$' + ad.price}</Chip>
                      </div>}

                    {this.props.rev ? "" :
                      <div style={this.style.quantityStyle}>
                        <Chip
                          backgroundColor="#FFFFFF"
                          style={{ display: 'inline-block' }}
                          onTouchTap={() => this.removeItens()}>
                          <Avatar backgroundColor="#FFFFFF" icon={<FontIcon color="black" style={{ color: 'black' }} className="material-icons">remove</FontIcon>} />
                        </Chip>

                        <Chip style={{ display: 'inline-block' }}>{this.state.quantity}</Chip>

                        <Chip
                          backgroundColor="#FFFFFF"
                          style={{ display: 'inline-block' }}
                          onTouchTap={() => this.addItens()}>
                          <Avatar backgroundColor="#FFFFFF" icon={<FontIcon color="black" style={{ color: 'black' }} className="material-icons">add</FontIcon>} />
                        </Chip>


                      </div>
                    }
                  </div>
                  <Divider />
                  {/* Product about  */}
                  {this.props.rev ?
                    <h5 style={{
                      padding: '1em',
                      fontWeight: '400'
                    }}>
                      <p style={{ textAlign: 'center' }} > Endereço: </p>
                      <p style={{ textAlign: 'center', marginTop: '1vh' }}> {'Rua: ' + this.props.address.street + '  Nº' + this.props.address.number}  </p>
                      <p style={{ textAlign: 'center', marginTop: '2vh' }}> {'Complemento: ' + this.props.address.complement}  </p>
                      <p style={{ textAlign: 'center', marginTop: '2vh' }}> {'Bairro: ' + this.props.address.neighborhood}  </p>
                      <p style={{ textAlign: 'center', marginTop: '2vh' }}> {'Cidade: ' + this.props.address.city}  </p>
                      <p style={{ textAlign: 'center', marginTop: '2vh' }}> {'Estado: ' + this.props.address.state}  </p>

                    </h5> :
                    <div style={{
                      padding: '2em',
                      fontWeight: '300',
                      textAlign: 'center',
                      width: '100%'
                    }}>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {ad.status} </Chip>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {ad.categories} </Chip>
                      <p style={{ textAlign: 'center', fontWeight: '500' }} > Descrição: </p>
                      <p style={{ textAlign: 'center', marginTop: '2vh' }}> {ad.description}  </p>
                    </div>}
                </List>
                <Divider />
                {this.props.rev ? "" : <CardActions style={{ display: 'flex', margin: 'none' }} >
                  <Link to={"/checkout/" + ad._id} style={{ width: '100%', textAlign: 'center' }}>
                    <FlatButton
                      label="COMPRAR"
                      labelPosition="after"
                      style={{ width: '100%' }}
                      onTouchTap={() => this.setCart()}
                      icon={<FontIcon color="black" style={{ color: 'black' }} className="material-icons">shopping_cart</FontIcon>}
                    />
                  </Link>
                </CardActions>}
              </Card>
            </Paper>
          </div>
        </div>
      );
    }
    else if (typeof this.props.ad !== 'undefined' && this.props.adRev) {
      let ad = this.props.ad;
      let seller = this.props.currentUser;
      let installment;


      console.log(this.props.currentUser);
      console.log(ad)
      return (
        <div className="row">
          <div className="col s12 m10 l10 " style={{ marginBottom: '1vw' }}>
            <Paper zDepth={2}>
              <Card >

                {/*{<CardHeader
                  title={this.props.seller.profile.name}
                  subtitle={
                    <div className=" ">
                      {this.props.seller.profile.name} &nbsp;
                    <i className="fa fa-star star-color star-color" ></i><i className="fa fa-star star-color"></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i><i className="fa fa-star star-color" ></i>
                    </div>
                  }
                  avatar={this.props.seller.profile.image}
                />
                }*/}
                <Divider />


                <List>
                  <Paper zDepth={1}>
                    {this.handleRenderMedia()}
                  </Paper>
                  <h3 style={{
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '300',
                    fontSize: '115%'
                  }}>
                    {/* Product Info  */}
                    {ad.title}
                  </h3>
                  <h3 className="price-layout">
                    {/* Product Price  */}
                    {"R$ " + ad.price / 100}
                  </h3>
                  <h4 style={{
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '300',
                    fontSize: '100%'
                  }}>Quais métodos de pagamento serão aceitos: {ad.payment_methods.map((payment, i) => payment ? payment.name + ', ' : '')}</h4>
                  <h4 style={{
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '300',
                    fontSize: '100%'
                  }}>Cartão de crédito - Quantidade máxima de parcelas {ad.installments}</h4>
                  <Divider />
                  {/* Product about  */}
                  {
                    <div style={{
                      padding: '2em',
                      fontWeight: '300',
                      textAlign: 'center',
                      width: '100%'
                    }}>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '300', fontSize: '115%', marginTop: '1vh' }}> Categoria:</p>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {this.state.parentCategory ? this.state.parentCategory.name : ''}</Chip>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '300', fontSize: '115%', marginTop: '1vh' }}> Sub Categoria: </p>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {ad.category} </Chip>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '300', fontSize: '115%', marginTop: '1vh' }}> Status:  </p>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {ad.status} </Chip>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '300', fontSize: '115%', marginTop: '1vh' }}> Quantidade à venda: </p>
                      <Chip style={{ display: 'inline-block', 'margin': '0 10px 10px 0' }}> {ad.quantity} </Chip>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '300', fontSize: '115%', marginTop: '1vh' }}> Métodos de envio da mercadoria:</p>
                      <p style={{ textAlign: 'center', marginTop: '1vh' }}> {ad.delivery_options.map((delivery, i) => delivery ? delivery.name + ', ' : '')}</p>
                      <p style={{ textAlign: 'center', color: 'black', fontWeight: '500', fontSize: '115%' }} > Descrição: </p>
                      <p style={{ textAlign: 'center', marginTop: '1vh' }}> {ad.description}  </p>
                    </div>}
                </List>
                <Divider />
              </Card>
            </Paper>
          </div>
        </div>
      );
    } else {
      return <div>{this.props.loading}</div>
    }
  }

}
export default Radium(Product);