import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const style = {
  margin: 12,
};

const CommitButton = (props) => (
  <div>
    <RaisedButton
    label="SCHEDULE"
    primary = {true}
    containerElement={<Link to='/'/>}
    onTouchTap= {props.onScheduleAmbit}
    />
  </div>
);


export default CommitButton;
