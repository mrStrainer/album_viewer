import React from 'react';
import Album from './album';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Album />).toJSON();
  expect(rendered).toMatchSnapshot();
});
