// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // we use concat to avoid changing the expense
      // return state.concat(action.expense);
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      // here id is also an object destructure
      return state.filter(({id}) => {
        return id !== action.id
      })
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense, // grab all the properties
            ...action.updates // overwrite the updates
          }
        } else {
          return expense;
        }
      });
    case 'LOAD_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};

export default expensesReducer;
