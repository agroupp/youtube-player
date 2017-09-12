import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* It works only this way because there is no renderer in @types */
const renderer = require('react-test-renderer');

import { YPMainComponent } from './YPMain';
import { YOUTUBE_API_KEY } from '../../api-key';

describe('<YPMainComponent />', function(){
  it('should render without crashing by React', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YPMainComponent apiKey={YOUTUBE_API_KEY} />, div);
  });

  it('should render and create JSON tree', () => {
    const component = renderer.create(<YPMainComponent apiKey={YOUTUBE_API_KEY} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
