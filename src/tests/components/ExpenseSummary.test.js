import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should correctly render ExpensesSummary with 1 expese', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={12020} />)
  expect(wrapper).toMatchSnapshot();
});

test('should render 2 expensis correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={12020} />)

  expect(wrapper).toMatchSnapshot();
});
