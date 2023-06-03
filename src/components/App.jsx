import { Component } from 'react';
import { SearchBar } from './SearchbarComponent/Searchbar';
// import { fetchPictures } from 'api-services/api';

export class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}
