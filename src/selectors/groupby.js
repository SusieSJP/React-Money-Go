import moment from 'moment';

// get and group by expenses on month and category
export const groupbyExpenses = (expenses, { year, month, category }) => {
  const targetExpenses = expenses.filter((expense) => {
    const categoryMatch = category ? expense.categoryID === category : true;
    return categoryMatch;
  })

  if (month === 0) {
    // user only specify the year and we need to group by the
    const specificExpenses = targetExpenses.filter((expense) => {
      const yearMatch = moment(expense.createdAt).year() === year;
      return yearMatch;
    })

    let monthlyTotal = new Array(12).fill(0);
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    specificExpenses.forEach((expense) => {
      // moment month is 0 index based
      const monthIdx = moment(expense.createdAt).month();
      monthlyTotal[monthIdx] += expense.amount/100;
    })

    return {
      labels,
      datasets: [
        {
          backgroundColor: '#d2d2d2',
          borderColor: '#727272',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
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
    const labels = [];
    for (let i = 1; i <= numDays; i++) {
      labels.push(i)
    }

    let dailyTotal = new Array(numDays).fill(0);

    specificExpenses.forEach((expense) => {
      // moment date is 1 index based
      const dayIdx = moment(expense.createdAt).date() - 1;
      dailyTotal[dayIdx] += expense.amount/100;
    })
    console.log('daily expenses:' ,dailyTotal)
    return {
      labels,
      datasets: [
        {
          label: false,
          backgroundColor: '#d2d2d2',
          borderColor: '#727272',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dailyTotal
        }
      ]
    };
  }

};

// group by the expense amount by category
export const groupbyCategory = (expenses, categories, { year, month, category }) => {
  const targetExpenses = expenses.filter((expense) => {
    const categoryMatch = category ? expense.categoryID === category : true;
    return categoryMatch;
  })
  const labels = categories.map((category) => {
    return category.name
  })
  const backgroundColor = categories.map((category) => {
    return category.color
  })
  const categoryOrder = categories.map((category) => {
    return category.id
  })
  let categoryData = new Array(categories.length).fill(0);

  if (month === 0) {
    // user only specify the year and we need to group by the
    const specificExpenses = targetExpenses.filter((expense) => {
      const yearMatch = moment(expense.createdAt).year() === year;
      return yearMatch;
    })

    specificExpenses.forEach((expense) => {
      const idx = categoryOrder.indexOf(expense.categoryID);
      categoryData[idx] += expense.amount/100;
    })
  } else {
    // user specify both year and month, display by day
    const specificExpenses = targetExpenses.filter((expense) => {
      const yearMatch = moment(expense.createdAt).year() === year;
      const monthMatch = moment(expense.createdAt).month() + 1 === month;
      return yearMatch && monthMatch;
    })

    specificExpenses.forEach((expense) => {
      const idx = categoryOrder.indexOf(expense.categoryID);
      categoryData[idx] += expense.amount/100;
    })
  }

  return {
    labels,
    datasets: [
      {
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor,
        data: categoryData
      }
    ]
  };
}
