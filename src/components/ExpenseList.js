import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from '../components/ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// we exported it since we snapshot test it unconnected
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
      props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses</span>
        </div>
      ) : (
          props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
        )
    }
    </div>
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
