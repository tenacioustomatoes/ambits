import React from 'react';
import LiveStreamSingle from './liveStreamSingle.jsx';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const searchFieldStyle = {
  margin: '10px'
};

class SearchField extends React.Component {

  render() {
    return (
      <div className='searchField'>
        <TextField
          ref='searchField'
          floatingLabelText="Enter a PeerID"
          style={searchFieldStyle}/>

        <RaisedButton 
          label="I'm feeling lucky"
          primary={true}
          onTouchTap={()=>{
            this.props.handleWatchStream(this.refs.searchField.getValue());
            }
          }
        />
      </div>
    );
  }
};

export default SearchField;