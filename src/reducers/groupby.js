import moment from 'moment';

const groupbyReducerDefaultState = {
  year: moment().year(), // default of current year
  month: moment().month() + 1, // default of current month
  category: ''
};
const groupbyReducer = (state = groupbyReducerDefaultState, action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    case 'SELECT_YEAR':
      return {
        ...state,
        year: action.year
      };
    case 'SELECT_MONTH':
      return {
        ...state,
        month: action.month
      };
    default:
      return state;
  }
};

export default groupbyReducer;
