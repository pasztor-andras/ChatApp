import React from 'react';
import CustomListItem from './CustomListItem';


describe('CustomListItem', () => {
  let props;
  let wrapper;

  function setup(opts = {}) {
    props = {
      children: 'some text',
      ...opts,
    };

    return shallow(<CustomListItem {...props} />);
  }

  beforeEach(() => {
    wrapper = setup();
  });

  test('should work when clicked', () => {
        wrapper.find('CustomListItem').simulate('click');
        expect(props.onClick).toBeCalled();
  });

  test('should work when clicked', () => {
    expect(props.onClick).toHaveBeenCalledTimes(0);
    wrapper.find(testID('customlistitem')).simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
});

  test('should render text content', () => {
    const CHILDREN = 'dM2nyMNxs0';
    wrapper = setup({ children: CHILDREN });
    expect(wrapper.find('button')).toHaveText(CHILDREN);
  });
});