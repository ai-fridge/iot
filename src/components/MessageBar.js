import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  snackbarContent: {
    background: green[600],
  },
});

const MessageBar = props => {
  const { classes, taxRefundSnack, taxRefund, taxInfoText } = props

  return (
    <Snackbar
      open={taxRefundSnack}
      autoHideDuration={6000}
    >
      <SnackbarContent
        anchororigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={classes.snackbarContent}
        message={
          `${taxInfoText} \
          $${taxRefund}`
        } />
    </Snackbar>
  )
}

MessageBar.propTypes = {
  classes: PropTypes.object.isRequired,
  taxRefundSnack: PropTypes.any.isRequired,
  taxRefund: PropTypes.number,
  taxInfoText: PropTypes.string,
};

export default withStyles(styles)(MessageBar);