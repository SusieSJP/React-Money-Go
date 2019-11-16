import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { Link } from 'react-router-dom';

export default class ExpenseForm extends React.Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount/100).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(), //this would be the time now
    calendarFocused: false,
    categoryID: this.props.expense ? this.props.expense.categoryID : 'uncategorized',
    error: ''
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({focused}) => {
    this.setState(()=> ({ calendarFocused: focused }))
  }
  onCategoryChange = (e) => {
    e.persist();
    console.log('target value from category change:', e.target.value)
    this.setState(() => ({ categoryID: e.target.value }));
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({error: 'Please provide description and amount.'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        categoryID: this.state.categoryID
      });
    }
  }
  render() {
    return (
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <div>
            <select
              className="select-column"
              disabled={this.props.categories.length === 0}
              value={this.state.categoryID === "uncategorized" ? undefined : this.state.categoryID}
              onChange={this.onCategoryChange}>
                <option value="uncategorized">--Please choose a category--</option>
                {
                  this.props.categories.filter((category) => {
                    return category.id !== "uncategorized"
                  }).map((category) => {
                    return <option key={category.id} value={category.id}>{ category.name }</option>
                  })
                }
            </select>
            {this.props.categories.length === 0 && <Link className="header__link-grey" to="/setting"><span>Set Categories</span></Link>}

          </div>
          <input
            type="text"
            className="text-input"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            className="text-area"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <div>
            <button className="button button-blue">Save Expense</button>
          </div>

        </form>
    )
  }
}
