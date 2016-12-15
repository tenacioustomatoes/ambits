import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Messages from '../../../feed/Messages.jsx';
import TextField from 'material-ui/TextField';
import * as Utils from '../../../utils/utils.js';

export default class AmbitGeneric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      ambitId: null, 
      comment: ''
    }
  }

  componentDidMount() {
    this.setState({ambitId: this.props.data._id});
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  handleCommentChange = (event) => {
    this.setState({comment: event});
  };

  handleSubmit = () => {
    console.log(this);
    Utils.submitComment(this.state.ambitId, this.state.comment);
  };

  render () {
    return(
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.data.name}
          subtitle="Subtitle"
          avatar="images/ok-128.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <Messages />
        <TextField hintText="Comment on the ambit"
          multiLine={true}
          onChange={this.handleCommentChange}
        />
        <FlatButton label="SEND" onTouchTap={this.handleSubmit}/>
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="http://i.dailymail.co.uk/i/pix/2015/05/27/10/2919D22C00000578-3098876-image-a-12_1432718913512.jpg" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="BET" />
        </CardActions>
      </Card>
    );
  }

}
