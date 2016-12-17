import FlatButton from 'material-ui/FlatButton';

//mid page
const style = {
  color: 'white',
  backgroundColor:'orange',
};

export default const Controls = (props) => {
  return (<div>
   <FlatButton onTouchTap={props.handleCreateAmbit}>Create Ambit</FlatButton>
    </div>);
};  