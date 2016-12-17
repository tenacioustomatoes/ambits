import React from 'react';
import Ambit from './ambit.jsx';

const AmbitList = (props) => {
  return (<div className='ambitList'>
  {
    props.ambits.map((item, i) => (
      <Ambit ambit={item} key={i}
      handleCreatePeerConnection={props.handleCreatePeerConnection}/>
    ))
  }
  </div>);
}

export default AmbitList;
