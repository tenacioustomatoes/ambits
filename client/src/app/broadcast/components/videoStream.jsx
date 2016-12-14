import React from 'react';
import * as Utils from '../../utils/utils.js';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const videoStyle = {
  width: '320px',
  maxWidth: '100%',
};


export default class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      constraints: { audio: false, video: true },
      stream: {},
      video: null
    };

    this.successCallback = this.successCallback.bind(this);
  }

  componentDidMount() {
    this.getVideo();
  }

  successCallback(stream) {
    this.setState({
      stream: stream,
      video: stream.getTracks()[0].id
    });
  }

  errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  getVideo() {
    navigator.getUserMedia(this.state.constraints, this.successCallback, this.errorCallback);
  };

  render() {
    return (
      <div>
       <h1>User Video</h1> 
       <video autoPlay src={'blob:http://127.0.0.1:3000/' + this.state.video}></video>
      </div>
    );
  }

}