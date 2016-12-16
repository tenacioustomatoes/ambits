import React from 'react';
import * as Utils from '../../utils/utils.js';
import LiveStreamList from './liveStreamList.jsx';
import LiveStream from './liveStream.jsx';
import SearchField from './SearchField.jsx';

import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
//import Controls from './controls.jsx';




//styling
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const createStyle = {
  color: 'white',
  backgroundColor:'orange',
  'margin-top': '6px'
};


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

const currentVideoStyle = {
  position: 'absolute',
  'margin-right': '-50%',
  'z-index': 10000,
  top: '50%',
  left: '20%'
};

const searchFieldStyle = {
  margin: '10px'
};


class LiveStreamContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: userFeedback.default
      },
      streams: [],
      currentVideo: ''
    };
    this.handleWatchStream = this.handleWatchStream.bind(this);
  }


  // getAllStreams() {
  //   console.log('gonna get streams');
  //   axios.get('/live')
  //   .then(streams => {
  //     this.setState({streams: streams.data, loading: false});
  //   })
  //   .catch(err => {
  //     console.error('Error retrieving streams from DB', err);
  //   });
  // };

  componentDidMount() {
    Utils.getAllStreams()
    .then(streams => {
      this.setState({streams: streams.data, loading: false});
    })
    .catch(err => {
      console.error('Error retrieving streams from DB', err);
    });
  }







  handleWatchStream(peerId) {
    this.setState({currentVideo: peerId});
  }

  render() {
    let currentVideo = null;
    let streams = this.state.streams;
    if (this.state.currentVideo) {
      currentVideo = <div><LiveStream 
      peerId={this.state.currentVideo} 
      style={currentVideoStyle}/></div>;
    }

    if(!this.state.loading) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {currentVideo}
            <SearchField handleWatchStream={this.handleWatchStream}/>
            <LiveStreamList streams={streams}
            handleWatchStream={this.handleWatchStream}/>

            <Snackbar
            open={this.state.feedback.open}
            message={this.state.feedback.message}
            autoHideDuration={this.state.feedback.autoHideDuration}
            />
          </div>
        </MuiThemeProvider>
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

export default LiveStreamContainer;

// /<Controls handleCreateAmbit={this.handleCreateAmbit}/>
