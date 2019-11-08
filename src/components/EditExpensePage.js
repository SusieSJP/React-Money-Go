import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm
          className="form"
          expense={props.expense}
          onSubmit={(expense) => {
            props.startEditExpense(props.expense.id, expense);
            props.history.push('/dashboard');
          }}
        />
        <button className="button button-grey" onClick={() => {
          props.startRemoveExpense({id: props.expense.id});
          props.history.push('/dashboard');
        }}>Remove Expense</button>
      </div>
    </div>

  );
}
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
