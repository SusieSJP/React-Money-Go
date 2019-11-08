import React from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import ExpensesSummary from './ExpensesSummary'

const ExpenseDashboaardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboaardPage;
