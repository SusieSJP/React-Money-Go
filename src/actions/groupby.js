// select year
export const selectYear = (year) => ({
  type: 'SELECT_YEAR',
  year
});

export const selectMonth = (month = 0) => ({
  type: 'SELECT_MONTH',
  month
})

export const selectCategory = (category = '') => ({
  type: 'SELECT_CATEGORY',
  category
})

