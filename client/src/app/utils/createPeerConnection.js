import axios from 'axios';
import Peer from 'peerjs';


const createPeerConnection = (ambitName, ambitRefId) => {
//Need to pass in amibitId and username/uId to function to pass to get 

  var peer = new Peer({
    key: '7inh9zl1wy9l766r',
    debug: 3,
    config: {'iceServers': [
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'turn:numb.viagenie.ca',
      credential: 'muazkh', username: 'webrtc@live.com' }
    ]}
  });

  var peerId, conn;
   
  peer.on('open', (id) => {
    peerId = id;
    console.log('Peer ID is', peerId);
    console.log(peer);
    conn = peer.connect(peerId, {metadata: {
      'username': 'Emerson' //username
    }});
    axios.post('/live', {peerId: peerId, ambitName: ambitName, user: window.UserName, ambitRefId: ambitRefId})
    .then(response => console.log(response))
    .catch(err => console.error('Error posting peer ID to server', err));
  });
  

  function getVideo(callback){
    navigator.getUserMedia({audio: true, video: true}, callback, error => {
      console.error(error);
      alert('An error occured. Please try again');
    });
  }

  getVideo(stream => {
    window.localStream = stream;
    console.log(window.localStream);
  });

  peer.on('call', call => {
    console.log('getting called');
    onReceiveCall(call);
  });

  function onReceiveCall(call){
    call.answer(window.localStream);
  }

  // peer.on('close', () => {
  //   axios.post('/live/delete', {peerId: peerId})
  //   .then(response => console.log('Successfully deleted:', response))
  //   .catch(err => console.error('Error sending delete request to server', err));
  // });

  peer.on('connection', (conn) => {
    peer.call(conn.peer, window.localStream);
  });

  // setTimeout(()=>peer.destroy(), 6000);

};

export default createPeerConnection;
