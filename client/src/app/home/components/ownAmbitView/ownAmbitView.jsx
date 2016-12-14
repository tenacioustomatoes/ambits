import React from 'react';
import AmbitGeneric from '../ambitGeneric/ambitGeneric.jsx';
import * as Utils from '../../../utils/utils.js';

export default class OwnAmbitView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Utils.getAllAmbits((data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
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
  render() {
    return (
      <div>
        <AmbitGeneric></AmbitGeneric>
        <AmbitGeneric></AmbitGeneric>
        <AmbitGeneric></AmbitGeneric>
        <AmbitGeneric></AmbitGeneric>
        <AmbitGeneric></AmbitGeneric>
      </div>
    );
  }
};
