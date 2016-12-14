import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

const actionStyle = {
  color: 'white',
  backgroundColor:'purple',
  position: 'fixed',
  top: '80%',
  left: '50%',
  height:'50px',
  width:'240px',
  transform: 'translate(-50%, -50%)'
};

const linkStyle = {
  color:'white',
  'text-decoration':'none'
};

export default class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
          <div>
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
              >
              <Tab label="Tab One" value={0} />
              <Tab label="Tab Two" value={1} />
              <Tab label="Tab Three" value={2} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
              >
              <div>
                <h2 style={styles.headline}>Tabs with slide effect</h2>
                Swipe to see the next slide.<br />
            </div>
            <div style={styles.slide}>
              slide n°2
            </div>
            <div style={styles.slide}>
              slide n°3
            </div>
          </SwipeableViews>
        </div>
        <RaisedButton
        label ={<Link to='/schedule' style ={linkStyle} >Create</Link> }
        buttonStyle={actionStyle}
        primary = {true}
        fullWidth={false}
        ></RaisedButton>
      </div>
    );
  }
}
