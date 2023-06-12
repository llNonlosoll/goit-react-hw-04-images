import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { fetchPictures } from 'services/api';
import { SearchBar } from './SearchbarComponent/Searchbar';
import { ImageGallery } from './ImageGalleryComponent/ImageGallery';
import { Button } from './ButtonComponent/Button';
import { Loader } from './LoaderComponent/Loader';
import { Modal } from './ModalComponent/Modal';
import { AppContainer, AppText } from './App.styled';

export function App() {
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [modalImgURL, setModalImgURL] = useState('');
  const [tagsImg, setTagsImg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);

  const per_page = 12;

  // Стадія оновленння (життєвий цикл)

  useEffect(() => {
    if (pictureName === '') {
      return;
    }
    setStatus('pending');

    //Fetch
    fetchPictures(pictureName, page, per_page)
      .then(elements => {
        if (elements.hits.length === 0) {
          setStatus('idle');
          return Notify.failure('Sorry images not found...', {
            position: 'center-center',
          });
        }

        setPictures(prevPicture => [...prevPicture, ...elements.hits]);
        setTotalPages(Math.ceil(elements.totalHits / per_page));
        setStatus('idle');
      })
      .catch(error => {
        setError(true);
        console.log(error);
      });
  }, [pictureName, page, per_page]);

  //Приймаємо та оновлюємо данні в this.state
  const handleFormSubmit = pictureName => {
    setPictureName(pictureName);
    setPage(1);
    setPictures([]);
  };

  //Додаємо сторінку
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //Функія по кліку на картинку, для запису data в state та відкриття модалки
  const getImgData = (modalImgURL, tagsImg) => {
    setModalImgURL(modalImgURL);
    setTagsImg(tagsImg);
    toggleModal();
  };

  // Закриття модалки
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={handleFormSubmit} />

      {pictures.length === 0 && !error && (
        <AppText>Image gallery is empty...</AppText>
      )}

      {error && (
        <AppText>
          Oops... Something went wrong ☹ Please reload the page and try again
        </AppText>
      )}

      {pictures.length > 0 && !error && (
        <ImageGallery pictures={pictures} onClick={getImgData} />
      )}

      {status === 'pending' && !error && <Loader />}

      {pictures.length > 0 && totalPages !== page && !error && (
        <Button onClick={handleLoadMore} />
      )}

      {modalVisible && (
        <Modal
          modalImgURL={modalImgURL}
          tagsImg={tagsImg}
          onClose={toggleModal}
        />
      )}
    </AppContainer>
  );
}
