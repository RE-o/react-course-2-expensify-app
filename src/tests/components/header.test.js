import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

let wrapper, startLogout;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout}/>); // just pass as props a function that wo nothing
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot(); // expect(wrapper.find('h1').text()).toBe('Expensify');
  // expect(toJSON(wrapper)).toMatchSnapshot(); // expect(wrapper.find('h1').text()).toBe('Expensify');
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});






