import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

const TEST_ID = 'name';
const TEST_LABEL = 'label name';
const TEST_CLASS = 'test_class';
const ERROR_MESSAGE = 'error message';
const ERROR_CLASS = 'test_error_class';
const TYPE = 'text';

describe('Test Input', () => {
  it('check props', () => {
    const render = renderer.create(
        <Input
          id={TEST_ID}
          label={TEST_LABEL}
          type={TYPE}
          className={TEST_CLASS}
          errorClassName={ERROR_CLASS}
          errorMessage={ERROR_MESSAGE}
        />
    ).toJSON();

    expect(render).toMatchSnapshot();
  });
})
