import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const CommitButton = (props) => (
  <div>
    <RaisedButton
    label="SCHEDULE"
    style={style}
    onTouchTap= {props.CreatePeerConnection
    } // create ambit using date, name etc from current state
    />
  </div>
);


export default CommitButton;
