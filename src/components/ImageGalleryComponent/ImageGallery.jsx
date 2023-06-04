import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItemComponent/ImageGalleryItem';
import { List } from './ImageGallery.styled';

//Галерея
export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <List>
      {pictures.map(picture => (
        <ImageGalleryItem
          onImgClick={onClick}
          key={picture.id}
          picture={picture}
        />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
