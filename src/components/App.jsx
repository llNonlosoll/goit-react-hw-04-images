import { Component } from 'react';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { fetchPictures } from 'services/api';
import { ImageGallery } from './ImageGalleryComponent/ImageGallery';

export class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    pictures: [],
    status: 'idle',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  componentDidUpdate(_, prevState) {
    const { page, pictureName } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.pictureName !== this.state.pictureName
    ) {
      this.setState({ status: 'loading' });

      fetchPictures(pictureName, page)
        .then(elements => {
          if (elements.hits.length === 0) {
            this.setState({ status: 'idle' });
            return alert('Sorry image not found...');

            // add notify!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...elements.hits],
            status: 'resolved',
          }));
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <p>Image gallery is empty...</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={this.state.pictures}></ImageGallery>
        </div>
      );
    }
  }
}
