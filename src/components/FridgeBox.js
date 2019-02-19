import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  Icon,
} from '@material-ui/core';
import FaceDetect from './FaceDetect';
import FridgeDetect from './FridgeDetect';
import FridgeList from './FridgeList';
import { FRIDGE_EXTRACTED_IMAGE } from '../config'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  },
  fridgeSwitch: {
    flexDirection: 'row-reverse',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const FaceInfoBox = (props) => {
  return (
    <div>
      <Icon fontSize="large" color="secondary">camera_front</Icon>
      Welcome {props.name}
    </div>
  )
}

const FridgeBox = props => {
  const { classes, fridgeSwitch, handleFridgeSwitch, name, foods, isFaceAuthentication, userId } = props

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Fridge</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={fridgeSwitch}
              onChange={handleFridgeSwitch('fridgeSwitch')}
              value="fridgeSwitch"
              color="primary"
              />
            }
          label="Switch"
          className={classes.fridgeSwitch}
        />
      </FormControl>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Icon fontSize="large" color="secondary">
              {fridgeSwitch ? 'videocam' : 'videocam_off'}
            </Icon>
            { fridgeSwitch &&
              <FaceDetect
                fridgeSwitch={fridgeSwitch}
                handleAuthentication={props.handleAuthentication}
                isFaceAuthentication={isFaceAuthentication}
              />
            }
            { !fridgeSwitch && isFaceAuthentication &&
              <FridgeDetect
                fridgeSwitch={fridgeSwitch}
                handleAuthentication={props.handleAuthentication}
                handleDetectFoods={props.handleDetectFoods}
                userId={userId}
              />
            }
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            {fridgeSwitch &&
              <FaceInfoBox name={name} />
            }
            {!fridgeSwitch && isFaceAuthentication &&
              <FridgeList foods={foods} />
            }
            {!fridgeSwitch && !isFaceAuthentication &&
              <img
                src={FRIDGE_EXTRACTED_IMAGE}
                alt="Fridge"
                width="100%"
                height="100%"
              />
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

FridgeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  fridgeSwitch: PropTypes.bool.isRequired,
  handleFridgeSwitch: PropTypes.func.isRequired,
  handleAuthentication: PropTypes.func.isRequired,
  handleDetectFoods: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  foods: PropTypes.arrayOf(PropTypes.object),
  isFaceAuthentication: PropTypes.bool,
};

export default withStyles(styles)(FridgeBox);