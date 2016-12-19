import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const style = {
  paddingTop: '25%'
}

export default class LedgerDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.props.open}
          docked={false}
          width={300}
          onRequestChange={() => this.props.ledgerClose()}
        >
          <div style={style}></div>
          <MenuItem style={{textDecoration: 'underline'}}>Ledger</MenuItem>
          <MenuItem>{'Token Balance:  ' + (this.props.balance || '0')}</MenuItem>
        </Drawer>
      </div>
    );
  }
}
