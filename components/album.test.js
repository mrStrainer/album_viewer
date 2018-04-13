import React from 'react';
import Album from './album';
import AlbumHeader from './albumHeader';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Album match={{params:{id:'test'}}}/>).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<AlbumHeader />).toJSON();
  expect(rendered).toMatchSnapshot();
});
