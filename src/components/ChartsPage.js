import React from 'react';
import ChartFilters from './ChartFilters';
import BarChart from './BarChart';

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
          <div className="list-item__section">
            <div className="chart">
              <BarChart />
            </div>
            <div className="chart">
              <BarChart/>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
