import React from 'react';
import renderer from 'react-test-renderer';
import Arrow, {ArrowDirection} from './Arrow';

it('Стрелка вверх', () => {
  const component = renderer.create(
      <Arrow direction={ArrowDirection.TOP} />
  )
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('Стрелка вниз', () => {
  const component = renderer.create(
      <Arrow direction={ArrowDirection.BOTTOM} />
  )
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('Стрелка влево', () => {
  const component = renderer.create(
      <Arrow direction={ArrowDirection.BOTTOM} />
  )
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('Стрелка вправо', () => {
  const component = renderer.create(
      <Arrow direction={ArrowDirection.BOTTOM} />
  )
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
