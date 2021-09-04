import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let startLogin, wrapper;

beforeEach( () => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={ startLogin } />);
});

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// In general you want to find the component that will call the Spy function
// In some cases like this we had to find something inside the HTML components props, i.e. onClick
test('should call startLogin on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});

