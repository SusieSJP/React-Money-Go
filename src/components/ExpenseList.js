import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item--message">
            <p>No expenses</p>
          </div>
        ) : (
              props.expenses.map((expense) => {
                let colorArr = props.categories.filter((category) => category.id === expense.categoryID);
                return <ExpenseListItem key={expense.id} color={colorArr[0].color} {...expense} />;
            })
          )
      }
    </div>
    <div className="list-item__section">
      <span>Notes: </span>
      {
        props.categories.map((category) => {
          return (
            <div key={category.id} className="list-item__section">
              <div className="color-circle-small" style={{background: `${category.color}`}}></div>
              <span>{category.name} </span>
            </div>
          )
        })
      }
    </div>
  </div>
);
const mapStateToProps = (state) => {
  return {
    expenses: selectedExpenses(state.expenses, state.filters),
    categories: state.categories
  };
}
export default connect(mapStateToProps)(ExpenseList);
