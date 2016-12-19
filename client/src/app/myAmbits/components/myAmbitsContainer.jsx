import React from 'react';
import * as Utils from '../../utils/utils.js';
import AmbitList from './ambitList.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CreatePeerConnection from '../../utils/createPeerConnection.js';
import Webcam from 'react-webcam';

const spinnerStyle  = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const userFeedback = {
  default: '',
  cheat:'Not at the Location',
  geoNotFount: 'Geolocation feature is not enabled',
  successfulCheckin: 'Check in successful',
  checkInternetConnection:'Cannot fetch ambits:( Check internet connection'
};

const statsStyle = {
  color: 'white',
  backgroundColor:'red',
};

const currentVideoStyle = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  'margin-right': '-50%',
  'z-index': '10000'
};


class MyAmbitsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ambits: [],
      loading: false,
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: userFeedback.default
      },
      broadcast: false,
      broadcastAmbit: ''
    };
    this.handleCreatePeerConnection = this.handleCreatePeerConnection.bind(this);
    this.handleEndPeerConnection = this.handleEndPeerConnection.bind(this);
  }
  componentDidMount() {
    Utils.getAllAmbits((data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
        console.log(data);
        this.setState({ambits: data});
      }
    });
  }

  handleCreatePeerConnection(ambitName, ambitRefId) {
    this.setState({broadcast: true});
    this.setState({broadcastAmbit: ambitRefId});
    CreatePeerConnection(ambitName, ambitRefId);
  }

  handleEndPeerConnection() {
    this.setState({broadcast: false});
    Utils.deleteLiveStream(this.state.broadcastAmbit);

  }

  render() {
    let broadcast = null;
    if (this.state.broadcast) {
      broadcast = <div><Webcam
      style={currentVideoStyle}/>
      <FlatButton
        label='End Stream'
        onTouchTap={() => {
          this.handleEndPeerConnection();
          }
        }
        style={statsStyle}/>
      </div>
    }


    if(!this.state.loading) {
      return (
        <div>
          {broadcast}
          <AmbitList ambits={this.state.ambits}
          handleCreatePeerConnection={this.handleCreatePeerConnection}/>

          <Snackbar
          open={this.state.feedback.open}
          message={this.state.feedback.message}
          autoHideDuration={this.state.feedback.autoHideDuration}
          />
        </div>
      );
    } else {
      return (
        <div>
          <CircularProgress size={60} thickness={7} style={spinnerStyle}/>
        </div>
        );
    }
  }
};

export default MyAmbitsContainer;
