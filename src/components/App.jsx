import { Component } from 'react';
import { Notify } from 'notiflix';
import { fetchPictures } from 'services/api';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { ImageGallery } from './ImageGalleryComponent/ImageGallery';
import { Button } from './ButtonComponent/Button';
import { Loader } from './LoaderComponent/Loader';
import { Modal } from './ModalComponent/Modal';
import { AppContainer, AppEmptyText } from './App.styled';

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

  // Стадія оновленння (життєвий цикл)
  componentDidUpdate(_, prevState) {
    const { page, pictureName, per_page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.pictureName !== this.state.pictureName
    ) {
      this.setState({ status: 'pending' });

      //Fetch
      fetchPictures(pictureName, page, per_page)
        .then(elements => {
          if (elements.hits.length === 0) {
            this.setState({ status: 'idle' });
            return Notify.failure('Sorry images not found...', {
              position: 'center-center',
            });
          }

          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...elements.hits],
            totalPages: Math.ceil(elements.totalHits / per_page),
            status: 'idle',
          }));
        })
        .catch(error => console.log(error));
    }
  }

  //Приймаємо та оновлюємо данні в this.state
  handleFormSubmit = pictureName => {
    this.setState({ pictureName, page: 1, pictures: [] });
  };

  //Додаємо сторінку
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  //Функія по кліку на картинку, для запису data в this.state та відкриття модалки
  getImgData = (modalImgURL, tagsImg) => {
    this.setState({ modalImgURL: modalImgURL, tagsImg: tagsImg });
    this.toggleModal();
  };

  // Закриття модалки
  toggleModal = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible,
    }));
  };

  render() {
    const {
      status,
      modalImgURL,
      tagsImg,
      modalVisible,
      page,
      totalPages,
      pictures,
    } = this.state;

    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {pictures.length > 0 ? (
          <ImageGallery pictures={pictures} onClick={this.getImgData} />
        ) : (
          <AppEmptyText>Image gallery is empty...</AppEmptyText>
        )}

        {status === 'pending' && <Loader />}

        {pictures.length > 0 && totalPages !== page && (
          <Button onClick={this.handleLoadMore}></Button>
        )}

        {modalVisible && (
          <Modal
            modalImgURL={modalImgURL}
            tagsImg={tagsImg}
            onClose={this.toggleModal}
          />
        )}
      </AppContainer>
    );
  }
}
