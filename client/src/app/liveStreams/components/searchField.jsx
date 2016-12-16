import React from 'react';
import LiveStreamSingle from './liveStreamSingle.jsx';
import TextField from 'material-ui/TextField';

const searchFieldStyle = {
  margin: '10px'
};

const SearchField = (props) => {
  return (
    <div className='searchField'>
      <TextField
      hintText='Feeling Lucky?'
      floatingLabelText="Enter a PeerID"
      floatingLabelFixed={true}
      style={searchFieldStyle}
      value={props.value}
      onChange={props.handleWatchStream}/>
    </div>
    )
  
}

export default SearchField;