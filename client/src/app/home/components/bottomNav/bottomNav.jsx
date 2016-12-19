import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FriendsIcon from 'material-ui/svg-icons/social/people';
import CreateIcon from 'material-ui/svg-icons/content/add-circle-outline';
import LedgerIcon from 'material-ui/svg-icons/editor/monetization-on';
import HomeIcon from 'material-ui/svg-icons/action/home';
import {Link} from 'react-router';

const friendsIcon = <FriendsIcon />;
const createIcon = <CreateIcon />;
const ledgerIcon = <LedgerIcon />;
const homeIcon = <HomeIcon />;

const style = {
  position: 'fixed',
  top: '97.3%',
  left: '50%',
  height: '50px',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  zIndex: '2000'
}

const linkStyle = {
  textDecoration:'none',
  margin: '0'
};

class BottomNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={style}>
        <BottomNavigation selectedIndex={this.props.selectedIndex} style={{backgroundColor: '#737373'}}>


          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            style={{textAlign: 'center'}}
            containerElement={<Link to='/'></Link>}
            onTouchTap={() => this.props.select(0)}
          />

          <BottomNavigationItem
            icon={createIcon}
            label="Create"
            style={{textAlign: 'center'}}
            containerElement={<Link to='/schedule'></Link>}
            onTouchTap={() => this.props.select(1)}
          />

          <BottomNavigationItem
            label="Ledger"
            icon={ledgerIcon}
            onTouchTap={() => {this.props.select(2); this.props.ledgerToggle();}}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

// <BottomNavigationItem
//   label="Friends"
//   icon={friendsIcon}
//   onTouchTap={() => this.props.select(0)}
// />

export default BottomNav;
