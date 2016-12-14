import React from 'react';
import * as Utils from '../../utils/utils.js';

import Webcam from 'react-webcam';

import VideoStream from './videoStream.jsx'

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class BroadcastContainer extends React.Component {

  render() {
    return (
      <div>
       <h1>User Video</h1> 
        <Webcam />
      </div>
    );
  }

}