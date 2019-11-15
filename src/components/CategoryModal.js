import React from 'react';
import Modal from 'react-modal';
import { TwitterPicker } from 'react-color';

Modal.setAppElement(document.getElementById('app'));
// this modal would be open with set new category and edit current category
// therefore, we need to define the default value of category
export default class CategoryModal extends React.Component {
  state = {
    name: this.props.name ? this.props.name : '',
    color: this.props.color ? this.props.color : 'fff',
    error: '',
    changeMade: false
  }
  onNameChange = (event) => {
    const name = event.target.value;
    this.setState(() => ({ name, changeMade: true }));
  }
  handleChangeComplete = (color) => {
    this.setState(() => ({color: color.hex, changeMade: true}))
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.color && this.state.changeMade) {
      this.setState(() => this.state.error = '')
      this.props.handleSetCategory({
        name: this.state.name,
        color: this.state.color
      });
    } else {
      if (!this.state.changeMade) {
        this.props.closeModal();
      } else {
        this.setState(() => this.state.error = 'Sorry, please complete category name and color :(')
      }
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel="Set Category"
        onRequestClose={this.props.closeModal}
        closeTimeoutMS={700}
        className="modal"
      >
        <form className="modal__form" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={this.state.name}
            onChange={this.onNameChange}
            className="modal__input"
          />
          <TwitterPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
            triangle="hide"
            className="modal__picker"
          />
          <button className="button button-grey">Save</button>

        </form>
        {this.state.error && <p>{ this.state.error }</p>}
    </Modal>
    );
  }
}
