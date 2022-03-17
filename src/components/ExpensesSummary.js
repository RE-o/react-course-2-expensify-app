import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import expenseTotal from '../selectors/expenses-total';
import expenseCount from '../selectors/expenses-count';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
  const expenseWord = (expenseCount === 1) ? 'expense' : 'expenses';
  const formattedExpensesTotal =  numeral(expensesTotal / 100).format('$0,0.00');

  return (
    <div>
      <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  const selected = selectExpenses(state.expenses, state.filters);
  const count = expenseCount(selected);
  const total = expenseTotal(selected);

  return {
    expenseCount: count,
    expensesTotal: total
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
