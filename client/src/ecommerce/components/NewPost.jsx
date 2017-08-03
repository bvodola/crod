import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Helpers } from '../../helpers/Helpers.jsx';

// Material UI
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
// import {  } from 'react-router-dom'
import { Route, Redirect, withRouter } from 'react-router'

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: this.getPermissionServices(),
            images: [],
            images64: [],
            socialNetworks: [],
            text: '',
            open: false
        }
    }

    post() {

        let self = this;
        let socialNetworks = this.state.socialNetworks
        socialNetworks.map((socialNetwork, i) => {
            console.log('text = ', this.state.text)
            console.log('images = ', this.state.images)
            if (socialNetwork == 'facebook') {
                Meteor.call('postFacebook', this.state.text, this.state.images, function (e, r) {
                    if (!e) {
                        self.setState({ open: true });
                    } else {
                    }
                })
            }
            if (socialNetwork == 'twitter') {
                Meteor.call('postTwitter', self.state.text, self.state.images64, function (e, r) {
                    if (!e) {
                        self.setState({ open: true })
                        console.log('Deu certo uhuhuhuhuhuh!!!!');
                    } else {
                        console.log('Deu ruim!!!!')
                    }
                })
            }

        })
    }

    share(ev) {
        //Expects props.text and props.imagesLinks/props.images64(Twitter) in order to share your content in the form of a new post. 
        //() => this.props.handlePublishClose()
        console.log('props images64 = ', this.props.images64)
        ev.preventDefault();

        this.setState({ text: this.props.text, images64: this.props.images64 }, () => {
            if (typeof this.props.imagesLinks !== 'undefined') {
                this.setState({ images: this.props.imagesLinks }, () => this.post())
            }
            else
                this.post()
        })
    }

    newPost(imagesLinks, text) {

        if (imagesLinks != 'undefined') {

            this.setState({ images: this.props.imagesLinks })
            let images = this.props.imagesLinks
            let images64 = []

            /*images.map((image, i) => {
                images64[i] = convert64(image)
                this.setState({images64: images64})
            })*/

        }
        this.setState({ text: text })
        this.post()

    }

    handleSocialNetworks(service, isChecked) {
        //Insert or remove services from the Social Networks array

        let socialNetworksAux = this.state.socialNetworks
        console.log('service = ' + service + ', isChecked = ' + isChecked)

        if (isChecked)
            socialNetworksAux.push(service)

        else {

            socialNetworksAux.map((socialNetwork, i) => {

                if (service == socialNetwork) {
                    socialNetworksAux.splice(i, 1);
                }
            })
        }

        console.log(socialNetworksAux)
        this.setState({ socialNetworks: socialNetworksAux },
            () => console.log('Estado do array de Social Networks = '),
            console.log(this.state.socialNetworks))
    }

    getPermissionServices() {
        Meteor.call('getPermissionsServices', (e, response) => {
            if (!e) {
                this.setState({ services: response })
            }
            else console.log(e);
        });
    }


    handleRequestClose() {
        this.setState({ open: false }, () => {
         this.props.router.history.push("/adPage/" + this.props._idAd)
        });
    };

    renderSocialNetworks() {
        let services = []
        services = this.state.services
        let render = []
        let social_name
        if (typeof services !== 'undefined') {

            return (
                <div style={{ marginTop: '3vh' }} >
                    <Divider />
                    <div className="select-social-networks" style={{ marginTop: '3vh' }}>
                        {Object.keys(services).map((service, i) => (
                            <div className="list-block-check-social">
                                <Checkbox
                                    style={{ marginBottom: '1px', fontWeight: '300' }}
                                    key={i}
                                    value={service}
                                    labelStyle={{ width: 'auto', marginLeft: '-16px', marginRight: '10px', fontWeight: '300' }}
                                    label={
                                        <span><i style={{ marginLeft: '0.5vw' }}>{Helpers.socialIcon(service, 2)}</i> {service}</span>}
                                    //style={{ fontWeight: '100%' }}
                                    onCheck={(ev, isChecked) => this.handleSocialNetworks(service, isChecked)}
                                />
                            </div>
                        ))}
                    </div>
                    <Divider />
                </div>
            );

        }
    }

    renderShare() {
        return (
            <div>
                {this.renderSocialNetworks()}
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col s12">
                        <RaisedButton
                            style={{ float: 'right' }}
                            label='Não Postar'
                            primary={true}
                            //onClick={(ev) => this.post(ev)}
                            onClick={() => this.props.handlePublishClose()}
                        />
                        <RaisedButton
                            style={{ float: 'left' }}
                            label='Postar'
                            primary={true}
                            //onClick={(ev) => this.post(ev)}
                            onClick={(ev) => this.share(ev)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderShare()}
                <Snackbar
                    open={this.state.open}
                    message="Anúncio Publicado em suas redes"
                    autoHideDuration={2000}
                    onRequestClose={() => this.handleRequestClose()}
                />
            </div>
        )
    }
}
export default withRouter(NewPost);