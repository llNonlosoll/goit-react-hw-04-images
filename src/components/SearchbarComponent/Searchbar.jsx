import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    pictureName: '',
  };
  // Додавання pictureName в state при зміні інпута
  handlePictureNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  // Функція при сабміті форми
  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.pictureName.trim()) {
      Notify.info('Please enter a topic to search for images...', {
        position: 'center-center',
      });

      return;
    }

    // Передаємо SearchBar.state в App.state
    this.props.onSubmit(this.state.pictureName.trim());

    // Резетаємо інпут
    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            Search
          </SearchFormButton>
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.pictureName}
            onChange={this.handlePictureNameChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
