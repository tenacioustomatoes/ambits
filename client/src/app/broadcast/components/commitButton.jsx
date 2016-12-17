import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CommitButton = (props) => (
  <div>
    <RaisedButton
    label="SCHEDULE"
    primary = {true}
    onTouchTap= {props.CreatePeerConnection}
    />
  </div>
);


export default CommitButton;
