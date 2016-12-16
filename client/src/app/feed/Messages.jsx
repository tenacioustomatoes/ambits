import React, {Component, PropTypes} from 'react'; 
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

const Messages = (props) => (
  <List>
    <Subheader>MESSAGES</Subheader>
    {props.data.map((message) => (
	    	<ListItem
	      primaryText={message.name}
	      leftAvatar={<Avatar src="images/ok-128.jpg" />}
	      secondaryText={
            <p>
              {message.text}
            </p>
          }
	      />
	    )
    )}
  </List>
);

export default Messages;
