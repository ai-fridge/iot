import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  title: {
    margin: theme.spacing.unit * 2
  }
});

const NavigationBar = ({ classes, title }) => (
  <AppBar position="static" color="primary" className={classes.root}>
    <Toolbar>
      <Typography
        variant="title"
        color="inherit"
        className={classNames(classes.flex, classes.title)}
        align="left"
      >
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(NavigationBar);