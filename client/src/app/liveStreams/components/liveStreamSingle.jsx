import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router';

import LiveStream from './liveStream.jsx';

const notCheckedStyle = {
  color: 'white', //TODO: not working colors...
  rippleColor: 'green',
  backgroundColor:'green',
};

const checkedStyle = {
  color: 'white',
  backgroundColor:'blue',
};

const statsStyle = {
  color: 'white',
  backgroundColor:'red',
};

const cardStyle = {
  'margin': '10px'
};

const linkStyle = {
  color:'white',
  'textDecoration':'none'
};

class LiveStreamSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peerId: this.props.stream.peerId,
      watching: false
    };
  }

  handleWatchPress () {
    this.setState({watching: !this.state.watching});

  }

  render () {
    let videoStream = <div></div> ;
    if (this.state.watching) {
      videoStream = <LiveStream peerId={this.state.peerId} />
    }

    return (
      <Card style={cardStyle}>
        <CardHeader
          title = {this.props.stream.user + ' - ' + this.props.stream.ambitName}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
        />
        {videoStream}
        <CardActions>
          <FlatButton
            label={this.state.watching ? 'Stop Watching' : 'Watch Now'}
            onTouchTap={() => this.handleWatchPress() }
          />
        </CardActions>
      </Card>
    );
  }
};


// LiveStreamSingle.propTypes = {
//   LiveStreamSingle: React.PropTypes.object.isRequired,
//   handleCheckinLiveStreamSingle: React.PropTypes.func.isRequired
// };

export default LiveStreamSingle;

          // subtitle = {this.props.stream}
          // <FlatButton
          //   label={<Link to='/display' style={linkStyle}>Stats</Link>}//send to the stats page of the LiveStreamSingle.
          //   style={statsStyle}
          // />

            // disabled = {this.props.LiveStreamSingle.checkedIn}
            // style={this.props.LiveStreamSingle.checkedIn ? checkedStyle : notCheckedStyle}