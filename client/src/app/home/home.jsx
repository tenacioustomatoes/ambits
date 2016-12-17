import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Feed from '../feed/Feed.jsx';
import LiveStreamContainer from './../liveStreams/components/liveStreamContainer.jsx';
import MyAmbitsContainer from './../myAmbits/components/myAmbitsContainer.jsx';



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
  position: 'fixed',
  paddingTop: '7px',
  top: '95%',
  left: '50%',
  height:'50px',
  width:'240px',
  transform: 'translate(-50%, -50%)'
};

const linkStyle = {
  color:'white',
  textDecoration:'none',
  margin: '0',
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
              <Tab label="LIVE FEED" value={0} />
              <Tab label="UPCOMING" value={1} />
              <Tab label="MY AMBETS" value={2} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
              >
            <div style={styles.slide}>
              <LiveStreamContainer />
            </div>
            <div style={styles.slide}>
              <Feed />
            </div>
            <div style={styles.slide}>
              <MyAmbitsContainer />
            </div>
          </SwipeableViews>
        </div>

      </div>
    );
  }
}
