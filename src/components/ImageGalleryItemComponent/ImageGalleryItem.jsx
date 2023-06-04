import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';

// Картки в галереї
export const ImageGalleryItem = ({ picture, onImgClick }) => {
  return (
    <ListItem className="gallery-item">
      <Image
        //викликаємо функцію App.getImgData з необхідними data
        onClick={() => {
          onImgClick(picture.largeImageURL, picture.tags);
        }}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
