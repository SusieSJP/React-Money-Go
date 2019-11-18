import React from 'react';
import { connect } from 'react-redux';
import getYears from '../selectors/start-year';
import moment from 'moment';
import { selectYear, selectMonth, selectCategory } from '../actions/groupby';


class ChartFilters extends React.Component {
  onYearChange = (e) => {
    e.persist();
    this.props.dispatch(selectYear(parseInt(e.target.value, 10)))
  }
  onMonthChange = (e) => {
    e.persist();
    this.props.dispatch(selectMonth(parseInt(e.target.value, 10)))
  }
  onCategoryChange = (e) => {
    e.persist();
    this.props.dispatch(selectCategory(e.target.value))
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <select className="select" onChange={this.onYearChange} defaultValue={moment().year()}>
              {
                this.props.years.map((year) => {
                  return <option key={year} value={year}>{year}</option>
                })
              }
            </select>
          </div>
          <div className="input-group__item">
            <select className="select" onChange={this.onMonthChange} defaultValue={moment().month()+1}>
              <option value={0}>All Months</option>
              {
                this.props.months.map((month) => {
                  return <option key={month} value={month}>{month}</option>
                })
              }
            </select>
          </div>
          <div className="input-group__item">
            <select
              className="select"
              onChange={this.onCategoryChange}
            >
              <option value="">Categories</option>
              {
                this.props.categories.map((category) => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    years: getYears(state.expenses),
    months: [1,2,3,4,5,6,7,8,9,10,11,12],
    categories: state.categories
  };
};
export default connect(mapStateToProps)(ChartFilters);

