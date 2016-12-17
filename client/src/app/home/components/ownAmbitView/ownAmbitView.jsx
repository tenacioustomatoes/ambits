import React from 'react';
import AmbitGeneric from '../ambitGeneric/ambitGeneric.jsx';
import * as Utils from '../../../utils/utils.js';
import {Router, Route, Link} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import AmbitList from '../../../checkin/components/ambitList.jsx';

const createStyle = {
  color: 'white',
  backgroundColor:'orange',
  'margin-top': '6px'
};


const spinnerStyle  = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const userFeedback = {
  default: '',
  cheat:'Not at the Location',
  geoNotFount: 'Geolocation feature is not enabled',
  successfulCheckin: 'Check in successful',
  checkInternetConnection:'Cannot fetch ambits:( Check internet connection'
};


export default class OwnAmbitView extends React.Component {
  constructor(props) {
    super(props);
    console.log('loaded OwnAmbitView');
    this.state = {
      ambits: [],
      loading: false,
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: userFeedback.default
      }
    };
    this.handleCheckinAmbit = this.handleCheckinAmbit.bind(this);
  }
  componentDidMount() {
    Utils.getUserAmbits(this.context.user, (data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
        console.log(data);
        this.setState({ambits: data});
      }
    });
  }

  getAmbits() {
    Utils.getAllAmbits((data) => {
      this.setState({
        ambits: data
      });
    });
  }

  handleCheckinAmbit(ambit) {
    this.setState({loading: true}); //loading...
    //validate checkin:
    Utils.checkinAmbit(ambit, () => {
      //if valid update the state
      this.state.ambits.find(item => ambit.name === item.name).checkedIn = true;
      this.setState({
        loading:false,
        ambits: this.state.ambits,
        feedback: {open: true, message: userFeedback.successfulCheckin}
      });
      //update the database
      Utils.postCheckin(ambit.refId, () => {
        console.log('delivered');
      });
    }, ()=>{
      //you can't cheat message:
      this.setState({loading:false, feedback: { open: true, message:userFeedback.cheat}});
    });
  }

  handleShowStats(){}

  render() {
    if(!this.state.loading) {
      return (
        <div>
          <AmbitList ambits={this.state.ambits}
          handleCheckinAmbit={this.handleCheckinAmbit}/>
        </div>
      );
    } else {
      return (
        <div>
          <CircularProgress size={60} thickness={7} style={spinnerStyle}/>
        </div>
        );
    }
  }
};

OwnAmbitView.contextTypes = {
  user: React.PropTypes.string
};