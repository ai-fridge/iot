import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { crashReporter } from './middleware/logger';

const middlewares = [crashReporter];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

const Root = props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Root;