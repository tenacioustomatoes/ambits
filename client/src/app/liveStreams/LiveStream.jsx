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

export default class LiveStream extends React.Component {
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

  constructor() {
    super();
    this.state = {
      hasStream: false,
      src: null, 
      peerId: null,
      peers: []
    };
  }

  componentDidMount() {
  	this.state.peer = new Peer({
      key: '7inh9zl1wy9l766r',
      debug: 3,
      config: {'iceServers': [
      { url: 'stun:stun1.l.google.com:19302' },
      { url: 'turn:numb.viagenie.ca',
      credential: 'muazkh', username: 'webrtc@live.com' }
      ]}
    });
  }

  render() {
    return (
      <div> 
        STREAM
      </div>
    );
  }
}