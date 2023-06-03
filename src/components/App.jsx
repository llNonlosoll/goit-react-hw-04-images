import { Component } from 'react';
import { fetchPictures } from 'services/api';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { ImageGallery } from './ImageGalleryComponent/ImageGallery';
import { Button } from './ButtonComponent/Button';
import { Loader } from './LoaderComponent/Loader.styled';

export class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    pictures: [],
    totalPages: 0,
    per_page: 12,
    status: 'idle',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName, page: 1, pictures: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { page, pictureName, per_page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.pictureName !== this.state.pictureName
    ) {
      fetchPictures(pictureName, page, per_page)
        .then(elements => {
          if (elements.hits.length === 0) {
            return alert('Sorry image not found...');

            // add notify!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...elements.hits],
            totalPages: Math.ceil(elements.totalHits / per_page),
          }));
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { page, totalPages, pictures } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {pictures.length > 0 ? (
          <ImageGallery pictures={pictures}></ImageGallery>
        ) : (
          <p>Image gallery is empty...</p>
        )}
        {pictures.length > 0 && totalPages !== page && (
          <Button onClick={this.handleLoadMore}></Button>
        )}
        <Loader></Loader>
      </div>
    );
  }
}
