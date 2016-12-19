/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Login from './login/login.jsx';
import * as loginCtrl from './login/loginCtrl';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router';
import BottomNav from './home/components/bottomNav/bottomNav.jsx';
import FriendsDrawer from './home/components/friends/friends.jsx';
import LedgerDrawer from './home/components/ledger/ledger.jsx';
import Avatar from 'material-ui/Avatar';

import axios from 'axios';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

var custom_darkBaseTheme = darkBaseTheme;
custom_darkBaseTheme.palette.primary1Color = '#9f0026';
custom_darkBaseTheme.palette.primary2Color = '#9f0026';
custom_darkBaseTheme.palette.accent1Color = '#827d7d';
custom_darkBaseTheme.palette.textColor = '#ffffff';
custom_darkBaseTheme.palette.secondaryTextColor = '#ffffff';
custom_darkBaseTheme.palette.alternateTextColor = '#ffffff';
var muiTheme = getMuiTheme(custom_darkBaseTheme);


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!loginCtrl.getJwt(),
      friendsDrawerOpen: false,
      ledgerDrawerOpen: false,
      user: null,
      previousIndex: null,
      selectedIndex: 0,
      balance: 0,
    };
    this.toggleLedgerDrawer = this.toggleLedgerDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleLedgerDrawer() {
    // console.log('toggled ledger drawer!');
    // e.preventDefault();
    this.getBalance(window.UserName);
    if (this.state.ledgerDrawerOpen) {
      this.previousIndexSet();
    }
    this.setState({ledgerDrawerOpen: !this.state.ledgerDrawerOpen});
  }

  handleLogout() {
    loginCtrl.logout();
    this.setState({
      isLoggedIn: false
    });
  }

  handleClose() {
    // e.preventDefault();
    this.setState({ledgerDrawerOpen: false});
    this.previousIndexSet();
  }

  getChildContext() {
    return {user: this.state.user};
  }

  select = (index) => {
    if (this.state.selectedIndex !== index) {
      // console.log('new previous Index:', this.state.selectedIndex);
      this.setState({previousIndex: this.state.selectedIndex});
    }
    this.setState({selectedIndex: index});
  }

  previousIndexSet() {
    // console.log('change selected to previous!');
    this.setState({
      selectedIndex: this.state.previousIndex,
      previousIndex: null
    });
  }

  getBalance(username) {
    console.log(window.UserName);
    axios.get('/balance/' + window.UserName)
    .then(results => {
      console.log(results);
      this.setState({balance: results.data.tokenBalance});
    })
    .catch(err => {
      console.error('Error fetching user balance');
    });
  }

  render() {
    window.UserName = this.state.user;
    const logOutButton = this.state.isLoggedIn ?
      (<FlatButton label="Logout"
        onTouchTap={this.handleLogout.bind(this)}
       />
      ) :
      null;
    const LoginModal = !this.state.isLoggedIn ?
      (<Login main={this} />) :
      null;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FriendsDrawer open={this.state.friendsDrawerOpen}/>
          <LedgerDrawer open={this.state.ledgerDrawerOpen} ledgerClose={this.handleClose} balance={this.state.balance}/>
          <AppBar
            style={{zIndex: '1500'}}
            title='Ambet'
            iconElementRight={logOutButton}
            showMenuIconButton={false}

          />
          {LoginModal}
          {this.props.children}
          <BottomNav
            ledgerToggle={this.toggleLedgerDrawer}
            setPrevious={this.previousIndexSet}
            selectedIndex={this.state.selectedIndex}
            select={this.select}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.childContextTypes = {
  user: React.PropTypes.string
}
//was in AppBar
// };children={<div><Avatar />{this.state.user}</div>}

// onLeftIconButtonTouchTap={this.toggleDrawer}
export default Main;
