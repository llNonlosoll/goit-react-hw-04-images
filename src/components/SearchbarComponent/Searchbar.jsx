import { useState } from 'react';
import { Notify } from 'notiflix';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  // Додавання pictureName в state при зміні інпута
  const handlePictureNameChange = event => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };

  // Функція при сабміті форми
  const handleSubmit = event => {
    event.preventDefault();

    if (!pictureName.trim()) {
      Notify.info('Please enter a topic to search for images...', {
        position: 'center-center',
      });

      return;
    }

    // Передаємо SearchBar.state в App.state
    onSubmit(pictureName.trim());

    // Резетаємо інпут
    setPictureName('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          Search
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handlePictureNameChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}
