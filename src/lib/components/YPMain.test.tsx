import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { YPMainComponent } from './YPMain';
import { YOUTUBE_API_KEY } from '../../api-key';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YPMainComponent apiKey={YOUTUBE_API_KEY} />, div);
});
