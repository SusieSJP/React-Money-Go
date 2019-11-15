import React from 'react';
import { connect } from 'react-redux';
import { startAddCategory } from '../actions/category';
import CategoryModal from './CategoryModal';
import CategoryItem from './CategoryItem';

class CategoryPage extends React.Component {
  state = {
    modalIsOpen: false
  }
  openModal = () => {
    this.setState(() => this.state.modalIsOpen = true);
  };
  closeModal = () => {
    this.setState(() => this.state.modalIsOpen = false)
  };
  handleSetCategory = (category) => {
    this.props.startAddCategory(category);
    this.closeModal();
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
          {
            this.props.categories.length === 0 ? (
              <h1 className="page-header__title">Set Categories</h1>
            ) : (
              <h1 className="page-header__title">Currently <span>{this.props.categories.length}</span> categories, with <span>{5-this.props.categories.length}</span> remaining.</h1>
            )
          }
          </div>
        </div>
        <div className="content-container">
          <div className="list-header">
            <div className="show-for-mobile">Categories</div>
            <div className="show-for-desktop">Category</div>
            <div className="show-for-desktop">Color</div>
          </div>
          {
            this.props.categories.map((category) => {
              return <CategoryItem key={category.id} {...category}/>
            })
          }
          {this.props.categories.length < 5 && <button className="button button-blue vertical-large-margin" onClick={this.openModal}>Add Category</button>}
          <CategoryModal
            isOpen={this.state.modalIsOpen}
            handleSetCategory={this.handleSetCategory}
            closeModal={this.closeModal}
          />
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    startAddCategory: (category) => dispatch(startAddCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
