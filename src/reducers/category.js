const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.category]
    case 'EDIT_CATEGORY':
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            category,
            ...action.updates
          }
        } else {
          return category;
        }
      });
    case 'LOAD_CATEGORIES':
      return action.categories
    default:
      return state;
  }
};
