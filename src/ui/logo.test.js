import React from 'react';
import Logo from './logo';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('can set width and height', () => {
  {
    const logo = Enzyme.mount(<Logo />);
    expect(logo.html()).toContain('width="128"');
    expect(logo.html()).toContain('height="128"');
  }

  {
    const logo = Enzyme.mount(<Logo width="1" height="1" />);
    expect(logo.html()).toContain('width="1"');
    expect(logo.html()).toContain('height="1"');
  }
});
