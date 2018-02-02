import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Explorer from './explorer/explorer';
import Player from './player/player';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  scrolled: {
    overflow: 'auto',
    height: '100vh'
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "5a6af291970c551dd96b2524"
    }
  }
  
  onItemClick = (e, id) => {
    this.setState({
      id: id
    })
  }

  render () {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={this.props.classes.paper}>
              Media Server
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Explorer onItemClick={this.onItemClick}></Explorer>
          </Grid>
          <Grid item xs={8}>
            <Player url={this.state.id} className={this.props.classes.paper}></Player>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);