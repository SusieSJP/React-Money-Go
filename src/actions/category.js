import database from '../firebase/firebase';
import { editExpense } from '../actions/expenses'

// Add category
export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
});

export const startAddCategory = (categoryData) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name,
      color
    } = categoryData; // deconstruction

    const category = {name, color};
    database.ref('users/' + uid + '/categories').push(category).then((ref) => {
      dispatch(addCategory({
        id: ref.key,
        ...category
      }))
    })

  };
};

// Edit Category
export const editCategory = (id, updates) => ({
  type: 'EDIT_CATEGORY',
  id,
  updates
});

export const startEditCategory = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'+ uid +'/categories/' + id).update(updates).then(() => {
      dispatch(editCategory(id, updates))})
  };
};

// Remove categories
export const removeCategory = (id) => ({
  type: 'REMOVE_CATEGORY',
  id
});

export const startRemoveCategory = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'+ uid +'/categories/' + id).remove().then(() => {
      database.ref('users/'+ uid +'/expenses')
      .orderByChild('categoryID')
      .equalTo(id)
      .on('child_added',(snap) => {
        let expenseID = snap.key
        database.ref('users/'+ uid +'/expenses/' + snap.key).update({"categoryID": "uncategorized"}).then(() => {
          dispatch(removeCategory(id))});
          dispatch(editExpense(expenseID, {"categoryID": "uncategorized"}));
        })
      });
    };
};

// Load categories
export const loadCategory = (categories) => ({
  type: 'LOAD_CATEGORIES',
  categories
})

// fetch the expense data, parse the data into array, dispatch load_expense
// return a promise
export const startLoadCategories = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref('users/'+uid+'/categories').once('value').then((snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        categories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      });

      dispatch(loadCategory(categories));
    })
  }
}
