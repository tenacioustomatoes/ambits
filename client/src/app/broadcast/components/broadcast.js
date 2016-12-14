import React from 'react';
import * as Utils from '../../utils/utils.js';
import AmbitList from './ambitList.jsx';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class BroadcastContainer extends React.Component {
  'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream) {
  window.stream = stream; // stream available to console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

  render() {
    return (
      <div>
       <h1>User Video</h1> 
       <video id='localVideo' autoplay></video>
      </div>
    );
  }

}