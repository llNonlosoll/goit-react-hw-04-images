import { Component } from 'react';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { fetchPictures } from 'services/api';

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
            return alert('Sorry image not found...');
            // add notify!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          }
          console.log(elements);
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...elements.hits],
            status: 'idle',
          }));
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}
