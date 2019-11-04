import React from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilters from './ExpenseFilters';

const ExpenseDashboaardPage = () => (
  <div>
    This is my dashboard page.
    <ExpenseFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboaardPage;
