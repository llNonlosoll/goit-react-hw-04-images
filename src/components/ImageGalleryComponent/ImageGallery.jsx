import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItemComponent/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => {
  return (
    <ul>
      {pictures.map(picture => (
        <ImageGalleryItem key={picture.id} picture={picture} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
