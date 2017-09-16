import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

function isInDev(): boolean {
  return (process && process.env && process.env.NODE_ENV === 'development');
}
if (!isInDev() && location.protocol === 'http:') {
  location.assign(`https://${location.host}`);
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
