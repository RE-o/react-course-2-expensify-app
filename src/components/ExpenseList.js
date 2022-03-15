import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from '../components/ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// we exported it since we snapshot test it unconnected
export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
      )
    }
    {/* in order to not pass down the id use the rest operator */}
    {/* { props.expenses.map(({id, ...expense}) => <ExpenseListItem key={id} {...expense} />) } */}
  </div>
);

const mapStateToProps = (state) => {
  const selected = selectExpenses(state.expenses, state.filters);

  return {
    expenses: selected
  };
};

export default connect(mapStateToProps)(ExpenseList);
