import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import Peer from 'peerjs';

var peer = new Peer({
    key: '7inh9zl1wy9l766r',
    debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
      credential: 'muazkh', username: 'webrtc@live.com' }
    ]}
  });

const currentVideoStyle = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  'margin-right': '-50%',
  'z-index': '10000'
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleCall = this.handleCall.bind(this);
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
      console.log('got a call', call);
      // this.handleCall(call)
      call.on('stream', (stream) => {
        console.log('getting a stream', stream);
        this.setState({src: window.URL.createObjectURL(stream)});
      });
    });
  }

  componentDidMount() {
    this.state.peer.connect(this.props.peerId, {metadata: {
      'username': 'Forrest'
    }});
    console.log(this.props.peerId);
  }

  handleChange(event) {
    console.log('update form value');
    this.setState({enterPeerId: event.target.value});
  }

  handleSubmit(event) {
    // event.preventDefault();
    this.setState({peerId: this.state.enterPeerId});
  }

  // handleCall(call) {
  //   call.on('stream', (stream) => {
  //     console.log('getting a stream', stream);
  //     this.state.stream = stream;
  //     this.state.src = window.URL.createObjectURL(stream);
  //   });
  // }


  render() {
    return (
      <div>
        <video 
        autoPlay
        src={this.state.src}
        style={currentVideoStyle}></video>
      </div>
    );
  }
};

export default LiveStream;
        //   <label>
        //     PEERID:
        //     <input type="text" name="name" value={this.state.enterPeerId} onChange={this.handleChange}/>
        //   </label>
        //   <input type="button" value="Submit" onClick={this.handleSubmit}/>
        // </form>
        // <button type="button" onClick={this.handleCall}>CALL</button>
