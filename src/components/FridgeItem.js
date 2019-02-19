import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  inline: {
    display: 'inline',
  },
});

const FridgeItem = props => {
  const { classes, food } = props

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="guava" src={`/images/foods/${food.food_name}.jpg`} />
      </ListItemAvatar>
      <ListItemText
        primary={food.food_name}
        secondary={
          <React.Fragment>
            <Typography component="span" className={classes.inline} color="textPrimary">
              Quantity
            </Typography>
            - {food.food_qty}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

FridgeItem.propTypes = {
  classes: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
};

export default withStyles(styles)(FridgeItem);