import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseFilters extends React.Component {
  state = {
    calenderFocused: null
  };
  onDatesChange = ({startDate, endDate}) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };
  onFocusChange = (calenderFocused) => {
    this.setState(() => ({ calenderFocused}));
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
            className="text-input"
            type="text"
            value={this.props.filters.text}
            placeholder="Search expenses"
            onChange={(event)=>{
              this.props.dispatch(setTextFilter(event.target.value))
            }}/>
          </div>
          <div className="input-group__item">
            <select className="select" onChange={(event) => {
              if (event.target.value === "amount") {
                this.props.dispatch(sortByAmount());
              } else {
                this.props.dispatch(sortByDate());
              }
            }}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calenderFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};
export default connect(mapStateToProps)(ExpenseFilters);

