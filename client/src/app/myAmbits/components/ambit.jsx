import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router';

const notCheckedStyle = {
  color: 'white', //TODO: not working colors...
  rippleColor: 'green',
  backgroundColor:'green',
};

const checkedStyle = {
  color: 'white',
  backgroundColor:'blue',
};

const statsStyle = {
  color: 'white',
  backgroundColor:'#9f0026',
};

const cardStyle = {
  'margin': '10px'
};

const linkStyle = {
  color:'white',
  'textDecoration':'none'
};

class Ambit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Card style={cardStyle}>
        <CardHeader
          title = {this.props.ambit.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
        />
        <CardActions>
          <FlatButton
            label='Broadcast'
            onTouchTap={() => {
              this.props.handleCreatePeerConnection(this.props.ambit.name, this.props.ambit.refId);
              }
            }
            style={statsStyle}
          />
        </CardActions>
      </Card>
    );
  }
};

export default Ambit;
