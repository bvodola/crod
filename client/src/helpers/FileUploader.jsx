import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';

// UploadedFiles
// Renders the array of uploaded files
class UploadedFiles extends Component {

	constructor(props) {
		super(props);

		this.style = {
			removeImageIcon: {
				"fontSize":"35px",
				"color":"rgb(183, 28, 28)",
				"position":"absolute",
				"right":"5px","opacity":"0.7",
				"background":"rgba(255,255,255,0.8)",
				"top":"3px",
				"borderRadius":"100px",
				"lineHeight":"30px",
				"padding":"0 5px",
				"cursor":"pointer"
			},

			image: {
				maxWidth: '250px',
				maxHeight: '150px'
			},

			imageDiv: {
				"display": "inline-block",
				"borderRadius": "5px",
				"position": "relative",
				"margin": "10px 0"
			}
		}
	}

	removeImage(event){
		let image = $(event.target).closest('div').children('img').attr('src');
		this.props.removeImage(image);
	}

	render() {
		return(
			<div>
				{this.props.files.map((src, index) => (
					<div style={this.style.imageDiv} key={src.split('/').splice(-1)}>
						<span onClick={this.removeImage.bind(this)} style={this.style.removeImageIcon}>&times;</span>
						<img style={this.style.image} src={src} />
						<div ref='filesDiv'>
							<input type="hidden" value={src} ref="files" name="files[]"/>
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
				width: '100%',
				textAlign: 'center'
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
			uploadedFiles: props.defaultValue || [],
			maxFilesReached: false, 
			loader: false
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

		for(let i=0; i<uploadedFiles.length; i++) {
			if(image === uploadedFiles[i]) {
				uploadedFiles.splice(i, 1);
				break;
			}
		}

		this.setState({uploadedFiles, uploadedFiles});
	}

	// ============
	// handleSubmit
	// ============
	handleSubmit(event) {

		event.preventDefault();

		// Checks if the maximum number of files was reached (if there's a maximum)
		if(typeof this.props.maxFiles === 'undefined' || this.state.uploadedFiles.length < this.props.maxFiles) {

			// Checks if a file was selected
			if(ReactDOM.findDOMNode(this.refs[this.inputName]).files && ReactDOM.findDOMNode(this.refs[this.inputName]).files[0]) {

				// Sets the data to be sent using the FormData() class
				let file = ReactDOM.findDOMNode(this.refs[this.inputName]).files[0];
				let data = new FormData();
				data.append('file',file);

				//Sends the file back to the productAd Component (To convert it later to a base64 url)
				if(typeof this.props.convertImageFiles64 !== 'undefined')
					this.props.convertImageFiles64(file)

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
					success: function(data){
						// Appends Uploaded Image to the state of the Component
						console.log(data);
						let uploadedFiles = fileUploader.state.uploadedFiles.concat(data);
						fileUploader.setState({uploadedFiles: uploadedFiles});
						fileUploader.props.handleImagesLinks(data)
					}, 
				});
			}

		}
	}

	render() {
		if(typeof this.props.maxFiles !== 'undefined' && this.state.uploadedFiles.length >= this.props.maxFiles) {
			let disabled = true;
		} else {
			let disabled = false;
		}

		return(
			<div style={this.inlineStyle.div}>
				<input disabled={this.disabled} style={this.inlineStyle.input} name={this.inputName} id={this.inputName} type="file" ref={this.inputName} onChange={this.handleSubmit.bind(this)} />
				<label disabled={this.disabled} htmlFor={this.inputName} style={this.inlineStyle.label}>
					<FontIcon style={{color: "#FFCA43", fontSize: '60px'}} className="material-icons">add_a_photo</FontIcon>
				</label>
				{this.state.loader ? <CircularProgress /> : ''}
				<UploadedFiles ref="UploadedFiles" removeImage={this.removeImage.bind(this)} files={this.state.uploadedFiles} />
			</div>
		)
	}

}

export default FileUploader;
