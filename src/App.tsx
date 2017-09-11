import * as React from 'react';

import { YPMainComponent } from './lib';
import { YOUTUBE_API_KEY } from './api-key';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <YPMainComponent apiKey={YOUTUBE_API_KEY} />
      </div>
    );
  }
}

export default App;
