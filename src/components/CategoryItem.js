import React from 'react';
import CategoryModal from './CategoryModal';
import { connect } from 'react-redux';
import { startEditCategory } from '../actions/category';
import { startRemoveCategory } from '../actions/category'

class CategoryItem extends React.Component {
  state = {
    modalIsOpen:false
  }
  closeModal = () => {
    this.setState(() => this.state.modalIsOpen = false);
  }
  handleSetCategory = (category) => {
    this.props.startEditCategory(this.props.id, category);
    this.closeModal();
  }
  handleRemoveCategory = () => {
    this.props.startRemoveCategory(this.props.id);
  }

  render(){
    return (
      <div>
        <div className="list-item">
          <h3 className="list-item__title" onClick={() => this.setState(() => this.state.modalIsOpen=true)}>{this.props.name}</h3>
          <div className="list-item__section">
            <div
            className="color-rec"
            style={{
              background: `${this.props.color}`
            }} ></div>
            <button onClick={this.handleRemoveCategory} className="button button-grey">Remove</button>
          </div>
        </div>
        <CategoryModal
          isOpen={this.state.modalIsOpen}
          name={this.props.name}
          color={this.props.color}
          handleSetCategory={this.handleSetCategory}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startEditCategory: (id, category) => dispatch(startEditCategory(id, category)),
    startRemoveCategory: (id) => dispatch(startRemoveCategory(id))
  }
}

export default connect(undefined, mapDispatchToProps)(CategoryItem);
