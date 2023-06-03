import { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    pictureName: '',
  };

  handlePictureNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.pictureName.trim()) {
      alert('Please insert text to search');

      // add notify!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      return;
    }

    this.props.onSubmit(this.state.pictureName.trim());

    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handlePictureNameChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
