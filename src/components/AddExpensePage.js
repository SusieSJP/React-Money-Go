import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      // the function here is for child to pass up data
      onSubmit = {(expense) => {
        props.dispatch(addExpense(expense));
        props.history.push('/'); // redirect to the URL page
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
