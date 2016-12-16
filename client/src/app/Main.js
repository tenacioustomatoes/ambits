/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Login from './login/login.jsx';
import * as loginCtrl from './login/loginCtrl';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#80c9ff',
    primary1Color: '#e41017',
    primary2Color: '#e41017',
    primary3Color: '#e41017',
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: !!loginCtrl.getJwt(),
      drawerOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDrawer(e) {
    console.log('toggled nav menu!');
    e.preventDefault();
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleLogout() {
    loginCtrl.logout();
    this.setState({
      isLoggedIn: false
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({drawerOpen: false});
  }

  render() {
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
          <Drawer
            width={250}
            open={this.state.drawerOpen}
            docked={false}
            onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
            >
            <MenuItem onTouchTap={this.handleClose}>Home</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Profile</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Friends</MenuItem>
          </Drawer>
          <AppBar
            title='Ambet'
            iconElementRight={logOutButton}
            onLeftIconButtonTouchTap={this.toggleDrawer}
          />
          {LoginModal}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
