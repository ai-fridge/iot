import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRootTheme from '../withRootTheme';
import { withStyles } from '@material-ui/core/styles';
// import { LinearProgress } from '@material-ui/core';
import NavigationBar from './NavigationBar';
import Fridge from './Fridge';

const styles = theme => ({
  root: {
    textAlign: 'center',
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavigationBar />
        {/* <LinearProgress color="secondary" /> */}
        <Fridge />
        {/* <TaxContainer /> */}
        { /* <TaxContainer onSubmit={showResults} /> */ }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRootTheme(withStyles(styles)(App));
