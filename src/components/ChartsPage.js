import React from 'react';
import ChartFilters from './ChartFilters';
import BarChart from './BarChart';
import DonutChart from './DonutChart';

export default class ChartsPage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Expense Dashboard</h1>
          </div>
        </div>
        <ChartFilters />
        <div className="content-container">
          <div className="chart-container">
            <div className="chart">
              <BarChart />
            </div>
            <div className="pie-chart">
              <DonutChart/>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
