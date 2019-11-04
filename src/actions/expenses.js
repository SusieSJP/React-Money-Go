import uuid from 'uuid';
// Add expense
export const addExpense = (
  // destructure the object
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(), // use the uuid library to generate unique id
    description,
    note,
    amount,
    createdAt
  }
});

// Remove expense
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// Edit Expense
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
