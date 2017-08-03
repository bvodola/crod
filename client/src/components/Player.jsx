import Meteor from  'react-meteor-client';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';
import i18n from 'meteor/universe:i18n';
import TextField from 'material-ui/TextField';
import { GoogleLoginButton } from './LoginButtons';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

/*
- Component to translate the others according
to the language defined on the method "defineLanguage"
*/
const T = i18n.createComponent();
const style = {
  marginRight: 20
};

class Player extends Component {



/*
== States ===
- show state is used to define if there are or not videos
- div_result_videos is used to save the videos returned from searchYoutube method
- playerAvailable is used make avaiable or not search videos on Youtube according to the user
=============
*/

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      div_result_videos: false,
      playerAvailable: false
    };
  }

  componentDidMount() {
    //Defining the language according to the browser
    Helpers.defineLanguage();
    this.checkLoginGoogle();
    this.searchVideoYoutube(false, 'Crodity')
  }

  //This method search videos on Youtube and displays it
  searchVideoYoutube(ev, search_term){

    if(typeof ev !== 'undefined' && ev) ev.preventDefault();
    let self = this;

    if(search_term !== ''){

      Meteor.call('searchYoutube', search_term, function (error, result) {
        console.log("Ref has value");
        self.setState({ show: true });

        if (error){
          console.log(error);
        }else{
          self.setState({
            div_result_videos: <div className='result-videos'>

            <div className="row">
              <div className="col-60">
                  <iframe width="100%" src={"//www.youtube.com/embed/"+result[0].id.videoId} frameBorder="0" allowFullScreen></iframe>
              </div>
              <div className="col-40">
                {result[0].snippet.title}
              </div>
            </div>

            <div className="row">
              <div className="col-60">
                <div className="video-container">

                  <iframe width="100%" src={"//www.youtube.com/embed/"+result[1].id.videoId} frameBorder="0" allowFullScreen></iframe>

                </div>
              </div>
              <div className="col-40">
                {result[1].snippet.title}
              </div>
            </div>

            <div className="row">
              <div className="col-60">
                <div className="video-container">

                  <iframe width="100%" src={"//www.youtube.com/embed/"+result[2].id.videoId} frameBorder="0" allowFullScreen></iframe>

                </div>
              </div>
              <div className="col-40">
                {result[2].snippet.title}
              </div>
            </div>

            <div className="row">
              <div className="col-60">
                <div className="video-container">
                  <iframe width="100%" src={"//www.youtube.com/embed/"+result[3].id.videoId} frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-40">
                {result[3].snippet.title}
              </div>
            </div>

            <div className="row">
              <div className="col-60">
                <div className="video-container">
                  <iframe width="100%" src={"//www.youtube.com/embed/"+result[4].id.videoId} frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
              <div className="col-40">
                {result[4].snippet.title}
              </div>
            </div>

          </div>});
        }
      });
    }else{
      this.setState({ show: false });
      this.setState({div_result_videos: false});
    }
  }

/*
=== This method checks if the user is logged
*/
  checkLoginGoogle(){
    if(Helpers.get(this.props, 'currentUser.services.google')){
      this.setState({ playerAvailable: true });
    }
  }

  render() {
    return (
      <div className='player-component'>
        {this.state.playerAvailable?(
          <div className="player-header">
            <form className='player' onSubmit={(ev) => this.searchVideoYoutube(ev, this.refs.input_search.value)}>
              <div className="row">
                <div className="col s8">
                  <div className="row">
                    <div className="col s1">
                        <FloatingActionButton style={{
                            height: '50px',
                            marginTop: '-15px',
                            marginLeft: '-30px'
                          }} >
                          <img src="/img/player_crodity.png"></img>
                      </FloatingActionButton>
                    </div>
                    <div className="col s11">
                      <input ref='input_search' placeholder="Procurar músicas, vídeos, podcasts..." type="text" className="ui search" required/>
                    </div>
                  </div>
                </div>
                <div className="col s4">
                  <button type="submit" className="search button full">
                    <T>common.Form_actions.find</T>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ):(
          <div>
            <div className="player-header">
              <div className='player'>
                <div className="row">
                  <div className="col s12">
                    <div className="row">
                      <div className="col s1">
                          <FloatingActionButton style={{
                              height: '50px',
                              marginTop: '-15px',
                              marginLeft: '-30px'
                            }} >
                            <img src="/img/player_crodity.png"></img>
                        </FloatingActionButton>
                      </div>
                      <div className="col s11">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="player-content">
              <div className="row">
                <div className="col s10 offset-s1 center" style={{paddingTop: '20px'}}>
                  Faça login com Google para ativar esse recurso.
                  <GoogleLoginButton />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="player-content">
          <div className="row">
          <div className="col s10 offset-s1">
            {this.state.show ? this.state.div_result_videos : ""}
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Player;
