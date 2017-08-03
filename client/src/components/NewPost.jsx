import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';
import i18n from 'meteor/universe:i18n';
import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';

// Material UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Tappable from 'react-tappable';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// import FileUploader from '../helpers/FileUploader.jsx'

/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();

let img_url;
let img_64;
let self = this;

class UploadedFiles extends Component {

	constructor(props) {
		super(props);

		this.style = {
			removeImageIcon: {
				"fontSize": "35px",
				"color": "rgb(183, 28, 28)",
				"position": "absolute",
				"right": "5px", "opacity": "0.7",
				"background": "rgba(255,255,255,0.8)",
				"top": "3px",
				"borderRadius": "100px",
				"lineHeight": "30px",
				"padding": "0 5px",
				"cursor": "pointer"
			},

			image: {
				maxWidth: '100%',
				height: 'auto'
			},

			imageDiv: {
				"display": "inline-block",
				"borderRadius": "5px",
				"position": "relative",
				"margin": "10px 0"
			}
		}
	}

	removeImage(event) {
		let image = $(event.target).closest('div').children('img').attr('src');
		this.props.removeImage(image);
	}

	render() {
		return (
			<div>
				{this.props.files.map((src, index) => (
					<div style={this.style.imageDiv} key={src.split('/').splice(-1)}>
						<span className="font-app" onClick={this.removeImage.bind(this)} style={this.style.removeImageIcon}>&times;</span>
						<img style={this.style.image} src={src} />
						<div ref='filesDiv'>
							<input type="hidden" value={src} ref="files" name="files[]" />
						</div>
					</div>
				))}
			</div>
		);
	}

}

class FileUploader extends Component {

	// ===========
	// constructor
	// ===========
	constructor(props) {
		super(props);

		// Inline Style
		this.inlineStyle = {
			div: {
				width: '100%'
			},

			input: {
				width: 0.1,
				height: 0.1,
				opacity: 0,
				overflow: 'hidden',
				position: 'absolute',
				zIndex: -1
			},

			uploadIcon: {
				width: 30,
				fontSize: 20,
				lineHeight: '8px'
			},

			label: {
				fontSize: 15,
				// pointerEvents: 'none',
				display: 'inline-block',
				cursor: 'pointer'
			}
		}


		// Initial State
		this.state = {
			loader: false,
			uploadedFiles: props.defaultValue || [],
			maxFilesReached: false
		}

		this.inputName = Math.random().toString(36).substring(7);
	}

	// ===========
	// removeImage
	// ===========
	removeImage(image) {
		let uploadedFiles = this.state.uploadedFiles;

		$.ajax({
			url: image,
			type: 'DELETE',
			cache: false,
			crossDomain: true,
			data: {}
		});

		for (let i = 0; i < uploadedFiles.length; i++) {
			if (image === uploadedFiles[i]) {
				uploadedFiles.splice(i, 1);
				break;
			}
		}

		this.setState({ uploadedFiles, uploadedFiles });
	}

	// ============
	// handleSubmit
	// ============
	handleSubmit(event) {

		event.preventDefault();

		// Checks if the maximum number of files was reached (if there's a maximum)
		if (typeof this.props.maxFiles === 'undefined' || this.state.uploadedFiles.length < this.props.maxFiles) {

			// Checks if a file was selected
			if (ReactDOM.findDOMNode(this.refs[this.inputName]).files && ReactDOM.findDOMNode(this.refs[this.inputName]).files[0]) {

				// Sets the data to be sent using the FormData() class
				let file = ReactDOM.findDOMNode(this.refs[this.inputName]).files[0];
				let data = new FormData();
				console.log('Arquivo -> ', file)
				data.append('file', file);

				//========================================================

				//Here I use the FileReader to read the image and convert to 64 base
				let reader = new FileReader();
				reader.readAsDataURL(file);

				//This is the method called after readAsDataURL
				reader.onloadend = function (e) {
					let index = reader.result.indexOf("base64,") + 7;
					img_64 = reader.result.substring(index);
				}.bind(this);
				console.log(img_64);

				//=========================================================

				// Setting the FileUploader() class instance as fileUploader
				// to be used inside the $.ajax() success callback function
				let fileUploader = this;

				// Sends the data using jQuery.ajax function
				$.ajax({
					url: 'http://fs.bvodola.webfactional.com/upload/',
					data: data,
					cache: false,
					contentType: false,
					processData: false,
					type: 'POST',
					beforeSend: function () {
						console.log('beforeSend')
						fileUploader.setState({ loader: true })
					},
					complete: function () {
						fileUploader.setState({ loader: false })
					},
					success: function (data) {
						// Appends Uploaded Image to the state of the Component
						img_url = data;
						console.log(img_url);
						let uploadedFiles = fileUploader.state.uploadedFiles.concat(data);
						fileUploader.setState({ uploadedFiles: uploadedFiles });
					}
				});
			}

		}
	}

	render() {
		if (typeof this.props.maxFiles !== 'undefined' && this.state.uploadedFiles.length >= this.props.maxFiles) {
			let disabled = true;
		} else {
			let disabled = false;
		}

		return (
			<div style={this.inlineStyle.div}>
				<input disabled={this.disabled} style={this.inlineStyle.input} name={this.inputName} id={this.inputName} type="file" ref={this.inputName} onChange={this.handleSubmit.bind(this)} />
				<label disabled={this.disabled} htmlFor={this.inputName} style={this.inlineStyle.label}>
					<i className="fa fa-camera fa-2x" aria-hidden="true"></i>
				</label>
				{this.state.loader ? <CircularProgress /> : ''}
				<UploadedFiles ref="UploadedFiles" removeImage={this.removeImage.bind(this)} files={this.state.uploadedFiles} />
			</div>
		)
	}

}

class NewPost extends Component {

	/*
	=== States ===
	- facebookCheckBox, twitterCheckBox, etc are to define which network will be used o post
	- size is used to define the layouts
	*/

	constructor(props) {
		super(props);
		this.state = {
			facebookCheckBox: false,
			twitterCheckBox: false,
			instagramCheckBox: false,
			linkedinCheckBox: false,
			selectSocialNetworks: false,
			overlay: false,
			text: "",
			image: img_url,
			image64: img_64,
			profileImage: Helpers.get(this.props, 'currentUser.profile.image'),
			size: $(window).width(), // returns height of browser viewport
			open: false
		};
	}

	componentDidMount() {
		//defining the language
		Helpers.defineLanguage();
	}

	componentWillReceiveProps(nextProps) {
		
				this.setState({
					profileImage: nextProps.currentUser.profile.image,
				});
	}


	toPost(ev) {
		ev.preventDefault();
		let self = this;
		console.log(this.textarea.getValue());
		let text = this.textarea.getValue();

		this.setState({ image: img_url }, () => {
			self.state.facebookCheckBox ? Meteor.call('postFacebook', text, self.state.image, function (e, r) {
				if (!e) {
					self.setState({ open: true });
					self.textarea.getInputNode().value = '';
				} else {
				}
			}) : false;
		});



		this.setState({ image64: img_64 }, () => {
			self.state.twitterCheckBox ?
				Meteor.call('postTwitter', text, self.state.image64, function (e, r) {
					if (!e) {
						self.setState({ open: true })
						console.log('Deu certo uhuhuhuhuhuh!!!!');
					} else {
						console.log('Deu ruim!!!!')
					}
				}) : false;
		})



		this.state.instagramCheckBox ? 'posted on Instagram' : false;
		this.setState({ text: "" });

	}

	handleCheckBoxFacebook(event) {
		// window.addEventListener("touchstart", ()=>{});
		let checkFb = this.state.facebookCheckBox;

		this.state.facebookCheckBox = this.state.facebookCheckBox ? false : true;
		console.log(this.state.facebookCheckBox);
		this.forceUpdate();

		// this.state.facebookCheckBox ? false : true;
		// this.forceUpdate();
		// console.log('fb');
		// alert('fb');
	}

	handleCheckBoxTwitter(event) {
		this.state.twitterCheckBox = this.state.twitterCheckBox ? false : true;
		this.forceUpdate();
	}

	handleCheckBoxInstagram(event) {
		this.state.instagramCheckBox = this.state.instagramCheckBox ? false : true;
		this.forceUpdate();
	}

	handleCheckBoxLinkedin(event) {
		this.state.linkedinCheckBox = this.state.linkedinCheckBox ? false : true;
		this.forceUpdate();
	}

	handleButtonSocialNetworks() {

		this.state.selectSocialNetworks = this.state.selectSocialNetworks ? false : true;
		this.handleOverlay();
		this.forceUpdate();
	}

	handleOverlay() {
		// event.addEventListener();
		this.state.overlay = this.state.overlay ? false : true;
		this.forceUpdate();
	}

	handleChangeText(event) {
		this.setState({ text: event.target.value });
	}


	handleRequestClose() {
		this.setState({ open: false });
	};



	render() {
		return (
			<div>
				{this.state.overlay ? <div className='overlay' onClick={this.handleButtonSocialNetworks.bind(this)}></div> : ""}
				<Card className='mui-card' style={{position: 'relative', zIndex: '901'}}>
			    <CardHeader
			      title={
							<div style={{marginTop: '-4px'}}>
								<TextField
									hintText="No que você está pensando?"
									multiLine={true}
									rows={1}
									ref={(e) => {this.textarea = e;}}
									underlineShow={false}
									onFocus={() => { if (!this.state.overlay) this.handleButtonSocialNetworks() }}
								/>
						</div>
						}
			      avatar={this.state.profileImage}
			    />
				{this.state.selectSocialNetworks ?
					<CardText>
						<Divider />
						<div className="select-social-networks" style={{marginTop:'10px'}}>
							<p><T>common.NewPost.selectSocialNetworks</T></p>
							<div className="list-block-check-social">
								<Checkbox
									onTouchTap={(ev) => this.handleCheckBoxFacebook(ev)}
									onClick={(ev) => this.handleCheckBoxFacebook(ev)}
									checked={this.state.facebookCheckBox}
									labelStyle={{width: 'auto', marginLeft: '-16px', marginRight: '10px'}}
									label={<span><i style={{ marginLeft: '0.5vw' }} className="facebook-color fa fa-facebook-square fa-lg"></i> Facebook</span>}
								/>
							</div>

							<div className="list-block-check-social">
								<Checkbox
									onTouchTap={(ev) => this.handleCheckBoxTwitter(ev)}
									onClick={(ev) => this.handleCheckBoxTwitter(ev)}
									checked={this.state.twitterCheckBox}
									inputStyle={{marginRight: '0px'}}
									labelStyle={{width: 'auto', marginLeft: '-16px', marginRight: '10px'}}
									label={<span><i style={{ marginLeft: '0.5vw' }} className="twitter-color fa fa-twitter-square fa-lg"></i> Twitter</span>}
								/>
							</div>

							<div className="list-block-check-social">
								<Checkbox
									disabled={true}
									inputStyle={{marginRight: '0px'}}
									labelStyle={{width: 'auto', marginLeft: '-16px', marginRight: '10px'}}
									label={<span><i style={{ marginLeft: '0.5vw' }} className="instagram-color fa fa-instagram fa-lg"></i> Instagram</span>}
								/>
							</div>

							<div className="list-block-check-social">
								<Checkbox
									disabled={true}
									inputStyle={{marginRight: '0px'}}
									labelStyle={{width: 'auto', marginLeft: '-16px', marginRight: '10px'}}
									label={<span><i style={{ marginLeft: '0.5vw' }} className="linkedin-color fa fa-linkedin fa-lg"></i> LinkedIn</span>}
								/>
							</div>
						</div>
					<Divider />

					<div className="row" style={{marginTop:'10px'}}>
						<div className="col s6">
							<FileUploader />
						</div>
						<div className="col s6">
							<RaisedButton style={{float: 'right'}} label={<T>common.Form_actions.send</T>} primary={true} onClick={(ev) => this.toPost(ev)} />
						</div>
					</div>

					<Snackbar
						open={this.state.open}
						message="Sent successfully"
						autoHideDuration={2000}
						onRequestClose={() => this.handleRequestClose()}
					/>

				</CardText>
						: ""}
			  </Card>

			</div>
		);


	}
}
export default NewPost;
