import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import axios from 'axios';

class BetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.UserName,
      ambitRefId: this.props.ambitRefId,
      betIsOpen: true


    };
  }

  submitBet(betAmount) {
    axios.post('/placeBet', {ambitRefId: this.state.ambitRefId, betAmount: betAmount})
    .then(response => {
      alert('Placed bet successfully!');
      this.setState({betIsOpen: !this.state.betIsOpen});
    })
    .catch(err => alert('Error placing bet', err));
  }

  

  render() {
    const standardActions = [
      <RaisedButton
        label='Place Bet'
        primary={true}
        onTouchTap={() => submitBet(this.refs.betField.getValue())} />
    ];

    return (
          <Dialog
            autoDetectWindowHeight={false}
            overlayClassName='hidden'
            open={this.state.betIsOpen}
            title='Place a bet'
            actions={standardActions}
            modal={true}>
            <TextField
              ref='betField'
              fullWidth={true}
              hintText='Amount' />
          </Dialog>
    );
  }
}

export default BetContainer;
