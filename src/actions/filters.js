// Set text filter
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// Sort by Date and Sort by Amount
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// Set start data and Set end date
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
