import React, {Component} from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from 'material-ui';
import {Audiotrack} from 'material-ui-icons';
import {FileApi} from '../api/fileApi.js';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  scrolled : {
    overflow: 'auto',
    height: '100vh'
  }
})

class Explorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [
        [
          'awd','dawd ad'
        ]
      ]
    }
    console.log(this.state.files);

    FileApi.getFiles().then(res => {
      this.setState({files: res.data.slice(0,100)});
      this.render();
      console.log(this.state.files);
    })
  }

  

  


    render() {
      return  FileList(this.state.files)
    }
}

export default withStyles(styles)(Explorer);

const FileList = props => {

  const {classes} = props;
  const style = {
    overflow: 'auto',
    height: '70vh'
  }

  console.log(props);
  return (
    <List style={style} >
      {props.map(file =>FileItem(file))}
    </List>
  )
}

const FileItem = props => {

  console.log(props);
  return (<ListItem button key={props[1]} >
  <ListItemIcon>
    <Audiotrack />
  </ListItemIcon>
  <ListItemText primary={props[1]} />
</ListItem>)
} 

