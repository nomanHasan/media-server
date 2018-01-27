import React, {Component} from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from 'material-ui';
import {Audiotrack} from 'material-ui-icons';
import {FileApi} from '../api/fileApi.js';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  scrolled: {
    overflow: 'auto',
    height: '100vh'
  }
})

class Explorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [
        ['awd', 'dawd ad']
      ]
    }

    FileApi
      .getFiles()
      .then(res => {
        this.setState({
          files: res
            .data
        });
        this.render();
      })
  }

  onItemClick = (e, index) => {
    this
      .props
      .onItemClick(e, index)
  };

  render() {
    return FileList({files: this.state.files, onItemClick: this.onItemClick})
  }
}

export default withStyles(styles)(Explorer);

const FileList = props => {

  const {classes} = props;
  const style = {
    overflow: 'auto',
    height: '70vh'
  }

  return (
    <List style={style}>
      {props
        .files
        .map((file, index) => FileItem({file, index, onItemClick: props.onItemClick}))}
    </List>
  )
}

const FileItem = props => {

  return (
    <ListItem
      button
      key={props.file.name}
      onClick={e => props.onItemClick(e, props.file._id)}>
      <ListItemIcon>
        <Audiotrack/>
      </ListItemIcon>
      <ListItemText primary={props.index+": "+props.file.name}/>
    </ListItem>
  )
}
