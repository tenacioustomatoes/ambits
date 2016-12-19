import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const style = {
  paddingTop: '45%'
}

export default class LedgerDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: this.props.open};
  }

  render() {
    return (
      <div>
        <Drawer open={this.state.open} >
          <div style={style}></div>
          <MenuItem style={{textDecoration: 'underline'}}>Ledger</MenuItem>
          <MenuItem>Token Balance:</MenuItem>
        </Drawer>
      </div>
    );
  }
}
