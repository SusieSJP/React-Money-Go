import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import { connect } from 'react-redux';
import { groupbyCategory } from '../selectors/groupby';

class DonutChart extends React.Component {
  options={
    // legend: {display: false},
    aspectRatio: 1,
    legend: {
      position: 'right'
    }
  };

  render() {
    return (
      <Doughnut
        data={this.props.expenses}
        width={null}
        height={null}
        options={this.options}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: groupbyCategory(state.expenses, state.categories, state.groupby)
})

export default connect(mapStateToProps)(DonutChart);
