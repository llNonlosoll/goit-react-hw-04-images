import { Component } from 'react';

export default class SearchBar extends Component {
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
      return;
    }

    this.props.onSubmit(this.state.pictureName);

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
// https://pixabay.com/api/?q=cat&page=1&key=35695662-2f1aa19a2cfb13ed0e26200f2&image_type=photo&orientation=horizontal&per_page=12

// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна
