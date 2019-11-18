import moment from 'moment';

// get and group by expenses on month and category
const groupbyExpenses = (expenses, { year, month, category }) => {
  const targetExpenses = expenses.filter((expense) => {
    const categoryMatch = category ? expense.categoryID === category : true;
    return categoryMatch;
  })
  console.log('year input and month input are: ', year,'/', month)
  console.log(typeof month)
  if (month === 0) {
    // user only specify the year and we need to group and display by month
    let monthlyTotal = new Array(12).fill(0);
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    targetExpenses.forEach((expense) => {
      // moment month is 0 index based
      const monthIdx = moment(expense.createdAt).month();
      console.log('month is ', monthIdx + 1)
      console.log('amount is ', expense.amount)
      monthlyTotal[monthIdx] += expense.amount/100;
    })
    console.log('monthly expenses:' ,monthlyTotal)
    return {
      labels,
      datasets: [
        {
          backgroundColor: '#c2c2c2',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          data: monthlyTotal
        }
      ]
    };
  } else {
    // user specify both year and month, display by day
    const specificExpenses = targetExpenses.filter((expense) => {
      const yearMatch = moment(expense.createdAt).year() === year;
      const monthMatch = moment(expense.createdAt).month() + 1 === month;
      return yearMatch && monthMatch;
    })

    const day = new Date(year, month, 1);
    const numDays = moment(day).endOf('month').date()
    console.log('nums of days of this month is ', numDays)
    const labels = [];
    for (let i = 1; i <= numDays; i++) {
      labels.push(i)
    }

    let dailyTotal = new Array(numDays).fill(0);

    specificExpenses.forEach((expense) => {
      // moment date is 1 index based
      const dayIdx = moment(expense.createdAt).date() - 1;
      console.log('day is ', dayIdx + 1)
      console.log('amount is ', expense.amount)
      dailyTotal[dayIdx] += expense.amount/100;
    })
    console.log('daily expenses:' ,dailyTotal)
    return {
      labels,
      datasets: [
        {
          label: false,
          backgroundColor: '#c2c2c2',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          data: dailyTotal
        }
      ]
    };
  }

};

export default groupbyExpenses;
