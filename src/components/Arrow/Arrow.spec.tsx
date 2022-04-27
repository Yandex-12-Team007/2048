import React from 'react';
import renderer from 'react-test-renderer';
import Arrow, {ArrowDirection} from './Arrow';

it('Arrow top', () => {
  const tree = renderer.create(
      <Arrow direction={ArrowDirection.TOP}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Arrow bottom', () => {
  const tree = renderer.create(
      <Arrow direction={ArrowDirection.TOP}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Arrow left', () => {
  const tree = renderer.create(
      <Arrow direction={ArrowDirection.LEFT}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Arrow right', () => {
  const tree = renderer.create(
      <Arrow direction={ArrowDirection.RIGHT}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
