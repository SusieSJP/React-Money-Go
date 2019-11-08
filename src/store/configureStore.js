import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import filtersReducer from '../reducers/filters';
import expensesReducer from '../reducers/expenses';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// Store creation
export default () => {
  const store = createStore(
    // call the function with argument of object - key value pairs
    // key is the root state name and the value is the reducer that manages that state
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
