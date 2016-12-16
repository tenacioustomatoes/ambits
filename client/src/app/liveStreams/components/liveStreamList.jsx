import React from 'react';
import LiveStreamSingle from './liveStreamSingle.jsx';

const LiveStreamList = (props) => {
  return (<div className='liveStreamList'>
  {
    props.streams.map((item, i) => (
      <LiveStreamSingle stream={item} key={i} handleWatchStream={props.handleWatchStream}/>
    ))
  }
  </div>);
}

export default LiveStreamList;
