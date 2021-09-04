import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startLogout, wrapper;

beforeEach( () => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={ startLogout } />);
});

test('should render Header correctly', () => {
    //const wrapper = shallow(<Header startLogout={() => {} } />);
    expect(wrapper).toMatchSnapshot();
});

// In general you want to find the component that will call the Spy function
// In some cases like this we had to find something inside the HTML components props, i.e. onClick
test('should call startLogout on button click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});
