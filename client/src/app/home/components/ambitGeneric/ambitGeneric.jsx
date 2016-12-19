import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Messages from '../../../feed/Messages.jsx';
import TextField from 'material-ui/TextField';
import * as Utils from '../../../utils/utils.js';


const cardStyle = {
  'margin': '10px'
};

import BetContainer from '../../../makeBet/betContainer.jsx';

export default class AmbitGeneric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      ambitId: null,
      comment: '',
      messages: [],
      placeBet: false
    }
    this.handlePlaceBet = this.handlePlaceBet.bind(this);
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
    this.setState({comment: event.target.value});
  };

  handleSubmit = () => {
    var data = {avatar: 'no avatar', name: this.props.username, text: this.state.comment};
    Utils.submitComment(this.state.ambitId, data, (res) => {
      this.setState({messages: res.data.messages});
    });
  };

  handlePlaceBet() {
    this.setState({placeBet: !this.state.placeBet});
    console.log(this.state.placeBet);
  }

  render () {
    let betContainer = null;
    if (this.state.placeBet) {
      betContainer = <BetContainer
      ambitRefId={this.props.data.refId}
      placeBet={this.state.placeBet} />
    }

    return(
      <Card expanded={this.state.expanded} style={cardStyle} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.data.name}
          subtitle="Subtitle"
          avatar="images/ok-128.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <Messages data={this.state.messages}/>
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
          <FlatButton label="BET" onTouchTap={this.handlePlaceBet} />
        </CardActions>
      {betContainer}
      </Card>
    );
  }

}



      // <div><BetContainer
      // ambitRefId={this.props.data.refId}
      // placeBet={this.state.placeBet} /></div>
