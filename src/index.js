import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
)
registerServiceWorker();
