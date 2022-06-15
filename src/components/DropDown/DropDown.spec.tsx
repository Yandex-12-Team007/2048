import React from 'react';
import renderer from 'react-test-renderer';
import DropDown, {DropDownItemType} from './';

it('Dropdown with options', () => {
  const options = [
    {
      title: 'test link',
      type: DropDownItemType.LINK,
      link: '#',
    },
    {
      title: 'test action',
      type: DropDownItemType.BUTTON,
      action: () => console.log('test'),
    },
  ];

  const tree = renderer.create(
      <DropDown options={options} >
        <h2>Test</h2>
      </DropDown>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
