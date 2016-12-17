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
  width: '100%'
}

const linkStyle = {
  textDecoration:'none',
  margin: '0'
};

class BottomNav extends Component {
  state = {
    selectedIndex: 1,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={5} style={style}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{backgroundColor: '#737373'}}>
          <BottomNavigationItem
            label="Friends"
            icon={friendsIcon}
            onTouchTap={() => this.select(0)}
          />

          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
            style={{textAlign: 'center'}}
            containerElement={<Link to='/'></Link>}
            onTouchTap={() => this.select(1)}
          />

          <BottomNavigationItem
            icon={createIcon}
            label="Create"
            style={{textAlign: 'center'}}
            containerElement={<Link to='/schedule'></Link>}
            onTouchTap={() => this.select(2)}
          />

          <BottomNavigationItem
            label="Ledger"
            icon={ledgerIcon}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNav;
