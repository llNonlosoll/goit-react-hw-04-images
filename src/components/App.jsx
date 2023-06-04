import { Component } from 'react';
import { fetchPictures } from 'services/api';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { ImageGallery } from './ImageGalleryComponent/ImageGallery';
import { Button } from './ButtonComponent/Button';
import { Loader } from './LoaderComponent/Loader.styled';
import { Modal } from './ModalComponent/Modal';

export class App extends Component {
  state = {
    pictureName: '',
    page: 1,
    pictures: [],
    totalPages: 0,
    per_page: 12,
    status: 'idle',
    modalImgURL: '',
    tagsImg: '',
    modalVisible: false,
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName, page: 1, pictures: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible,
    }));
  };

  getImgData = (modalImgURL, tagsImg) => {
    this.setState({ modalImgURL: modalImgURL, tagsImg: tagsImg });
    this.toggleModal();
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
    const { modalImgURL, tagsImg, modalVisible, page, totalPages, pictures } =
      this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {pictures.length > 0 ? (
          <ImageGallery
            pictures={pictures}
            onClick={this.getImgData}
          ></ImageGallery>
        ) : (
          <p>Image gallery is empty...</p>
        )}
        {pictures.length > 0 && totalPages !== page && (
          <Button onClick={this.handleLoadMore}></Button>
        )}
        <Loader></Loader>
        {modalVisible && (
          <Modal
            modalImgURL={modalImgURL}
            tagsImg={tagsImg}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
