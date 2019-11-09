import database from '../firebase/firebase';

// Component calls action generator, action generator returns object
// component dispatches object, redux store changes

// Add expense
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log(uid);
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData; // deconstruction with default

    const expense = {description, note, amount, createdAt};
    database.ref('users/' + uid + '/expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })

  };
};


// Remove expense
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({id} = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref('users/'+ uid +'/expenses/' + id).remove().then(() => {
      dispatch(removeExpense({ id }))})
  };
};

// Edit Expense
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'+ uid +'/expenses/' + id).update(updates).then(() => {
      dispatch(editExpense(id, updates))})
  };
};

// Load expense
export const loadExpense = (expenses) => ({
  type: 'LOAD_EXPENSES',
  expenses
})

// fetch the expense data, parse the data into array, dispatch load_expense
// return a promise
export const startLoadExpense = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'+uid+'/expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      });

      dispatch(loadExpense(expenses));
    })
  }
}
