import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Peer from 'peerjs';

const currentVideoStyle = {
  margin: '10px'
};

class LiveStream extends React.Component {
	static defaultProps = {
		audio: true,
		height: 480,
		width: 640,
		screenshotFormat: 'image/webp',
		onUserMedia: () => {}
	};

  static propTypes = {
  	audio: PropTypes.bool,
    muted: PropTypes.bool,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    screenshotFormat: PropTypes.oneOf([
      'image/webp',
      'image/png',
      'image/jpeg'
    ]),
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      hasStream: false,
      src: null,
      connections: [],
      enterPeerId: ''
    };
  }

  componentWillMount() {
  	this.state.peer = new Peer({
      key: '7inh9zl1wy9l766r',
      debug: 3,
      config: {'iceServers': [
      { url: 'stun:stun1.l.google.com:19302' },
      { url: 'turn:numb.viagenie.ca',
      credential: 'muazkh', username: 'webrtc@live.com' }
      ]}
    });

    this.state.peer.on('call', (call) => {
      call.answer();
      // console.log('got a call', call);
      call.on('stream', (stream) => {
        // console.log('getting a stream', stream);
        this.setState({src: window.URL.createObjectURL(stream)});
      });
    });
  }

  componentDidMount() {
    this.state.peer.connect(this.props.peerId, {metadata: {
      'username': 'Logged in user'
    }});
    console.log(this.props.peerId);
  }

  render() {
    return (
      <div>
        <video 
        autoPlay
        src={this.state.src}
        style={currentVideoStyle}>
        </video>
      </div>
    );
  }
};

export default LiveStream;
