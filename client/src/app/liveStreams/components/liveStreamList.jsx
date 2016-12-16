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

// AmbitList.propTypes = {
//   ambits: React.PropTypes.array.isRequired,
//   handleCheckinAmbit: React.PropTypes.func.isRequired
// };

export default LiveStreamList;
