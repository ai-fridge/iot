/* global shallow, mount */
import React from 'react';
import renderer from 'react-test-renderer';
import Root from '../Root';

const shallowComponent = (ComponentClass, props = {}, state = {}) => {
  return shallow(
    <Root>
      <ComponentClass {...props} />
    </Root>
  );
};

const mountComponent = (ComponentClass, props = {}, state = {}) => {
  return mount(
    <Root>
      <ComponentClass {...props} />
    </Root>
  );
};

const rendererComponent = (ComponentClass, props = {}, state = {}) => {
  const tree = renderer.create(
    <Root>
      <ComponentClass {...props} />
    </Root>
  ).toJSON();

  return tree;
};

export { rendererComponent, mountComponent, shallowComponent };
