import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

//add expenses --> water bill & gas bill
const waterBill = {
  description: 'water bill',
  note: '',
  amount: 15,
  createdAt: 100
}
store.dispatch(addExpense(waterBill));
store.dispatch(addExpense({description: 'Gas Bill', amount: 30}));
// console.log(store.getState());

//set text filter and view the result
store.dispatch(setTextFilter('gas'));
const state = store.getState();
const result = getVisibleExpenses(state.expenses, state.filters);
// console.log(result);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
ReactDOM.render(jsx, document.getElementById('app'));
