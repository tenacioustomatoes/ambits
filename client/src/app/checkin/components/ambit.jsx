import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

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
  backgroundColor:'red',
};

class Ambit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Card>
        <CardHeader
          title = {this.props.ambit.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
          subtitle = {this.props.ambit.frequency}
        />
        <CardActions>
          <FlatButton
            label= {
              this.props.ambit.checkedIn ? "Checked In":"Check In!"
            }
            onTouchTap={() => { 
              this.props.handleCheckinAmbit(this.props.ambit); 
              } 
            }
            disabled = {this.props.ambit.checkedIn}
            style={this.props.ambit.checkedIn ? checkedStyle : notCheckedStyle}
          />
          <FlatButton
            label="Stats" //send to the stats page of the ambit.
            style={statsStyle}
          />
        </CardActions> 
      </Card>
    );
  }
};


Ambit.propTypes = {
  ambit: React.PropTypes.object.isRequired,
  handleCheckinAmbit: React.PropTypes.func.isRequired
};

export default Ambit;









