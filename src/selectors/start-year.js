import moment from 'moment';

// get the years from the earliest expense record
export default (expenses) => {
  const startAtMoment = moment(expenses.sort((a, b) => {
    return a.createdAt - b.createdAt
  })[0].createdAt)

  const year = startAtMoment.year();

  let years = [];
  for (let y = year; y <= moment().year(); y++) {
    years.push(y)
  }
  return years
};
