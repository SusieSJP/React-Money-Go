import { Bar } from 'react-chartjs-2';
import React from 'react';
import { connect } from 'react-redux';
import groupbyExpenses from '../selectors/groupby';

class BarChart extends React.Component {
  options={
    legend: {display: false},
    aspectRatio: 2
  };

  render() {
    return (
      <Bar
        data={this.props.expenses}
        width={null}
        height={null}
        options={this.options}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: groupbyExpenses(state.expenses, state.groupby)
})

export default connect(mapStateToProps)(BarChart);
