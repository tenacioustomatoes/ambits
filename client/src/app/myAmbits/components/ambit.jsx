import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router';

import Webcam from 'react-webcam';
import CreatePeerConnection from '../../utils/createPeerConnection.js';
import axios from 'axios';



const notCheckedStyle = {
  color: 'white', //TODO: not working colors...
  rippleColor: 'green',
  backgroundColor:'green',
};

const greenStyle = {
  color: 'white',
  backgroundColor:'green',
};

const redStyle = {
  color: 'white',
  backgroundColor:'red',
};

const statsStyle = {
  color: 'white',
  backgroundColor:'#9f0026',
};

const cardStyle = {
  'margin': '10px'
};

const linkStyle = {
  color:'white',
  'textDecoration':'none'
};


class Ambit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcasting: false
    };
  }
  
  handleBroadcastPress() {
    this.setState({broadcasting: !this.state.broadcasting});
    CreatePeerConnection(this.props.ambit.name, this.props.ambit.refId);
  }

  handleCollectWinnings() {
    axios.put('/collectWinnings', {ambitRefId: this.props.ambit.refId, username: window.UserName})
    .then(response => alert('Successfully claimed winnings'))
    .catch(err => alert('Error claiming winnings'));
  }

  render () {
    let broadcastStream = <div></div>;
    let collectBet = null;
    if (this.state.broadcasting) {
      broadcastStream = <Webcam style={cardStyle}/>;
      collectBet = <FlatButton 
        label='Collect Winnings'
        onTouchTap={() => {
          this.handleCollectWinnings();
          }
        }
        style={greenStyle}/>;
    }

    return (
      <Card style={cardStyle}>
        <CardHeader
          title = {this.props.ambit.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
        />
        {broadcastStream}
        <CardActions>
          <FlatButton
            label={this.state.broadcasting ? 'End Broadcast' : 'Start Broadcast'}
            onTouchTap={() => {
              this.handleBroadcastPress()
              }
            }
            style={this.state.broadcasting ? redStyle : greenStyle}
          />
          {collectBet}
        </CardActions>
      </Card>
    );
  }
};

export default Ambit;
