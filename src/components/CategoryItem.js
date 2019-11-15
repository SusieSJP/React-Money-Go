import React from 'react';
import CategoryModal from './CategoryModal';
import { connect } from 'react-redux';
import { startEditCategory } from '../actions/category';

class CategoryItem extends React.Component {
  state = {
    modalIsOpen:false
  }
  handleSetCategory = (category) => {
    this.props.startEditCategory(this.props.id, category);
    this.setState(() => this.state.modalIsOpen = false);
  }
  render(){
    return (
      <div>
        <div className="list-item" onClick={() => this.setState(() => this.state.modalIsOpen=true)}>
          <h3 className="list-item__title">{this.props.name}</h3>
          <div
            className="color-rec"
            style={{
              background: `${this.props.color}`
          }} ></div>
        </div>
        <CategoryModal
          isOpen={this.state.modalIsOpen}
          name={this.props.name}
          color={this.props.color}
          handleSetCategory={this.handleSetCategory}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startEditCategory: (id, category) => dispatch(startEditCategory(id, category))
  }
}

export default connect(undefined, mapDispatchToProps)(CategoryItem);
