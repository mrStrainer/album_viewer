import React from 'react';
import Album from './album';
import AlbumHeader from './albumHeader';
import FetchError from './fetchError';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Album />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<AlbumHeader />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<FetchError />).toJSON();
  expect(rendered).toMatchSnapshot();
});