import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItemComponent/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ pictures }) => {
  return (
    <List>
      {pictures.map(picture => (
        <ImageGalleryItem key={picture.id} picture={picture} />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
