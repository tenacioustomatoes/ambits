import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const CommitButton = (props) => (
  <div>
    <RaisedButton
    label="SCHEDULE"
    primary = {true}
    onTouchTap= {props.onScheduleAmbit}
    />
  </div>
);


export default CommitButton;
