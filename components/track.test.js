import React from 'react';
import Track from './track';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Track />).toJSON();
  expect(rendered).toMatchSnapshot();
});
