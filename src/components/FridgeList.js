import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  List,
  ListSubheader,
} from '@material-ui/core';
import FridgeItem from './FridgeItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const renderedItem = (foods) => {
  if (foods !== undefined && foods.length !== 0) {
    foods.map(food => {
      return (
        <FridgeItem
          key={food.id}
          food={food}
        />
      );
    });
  } else {
    return 'Oh My God!! Your fridge is empty, please treat yourself better...'
  }
}

const FridgeList = props => {
  const { classes, foods } = props

  return <List
    className={classes.root}
    subheader={<ListSubheader component="div">Inventory</ListSubheader>}>
    {renderedItem(foods)}
  </List>;
};

FridgeList.propTypes = {
  classes: PropTypes.object.isRequired,
  foods: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(FridgeList);