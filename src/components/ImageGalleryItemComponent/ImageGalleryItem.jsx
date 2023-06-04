import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ picture, onImgClick }) => {
  return (
    <li className="gallery-item">
      <img
        onClick={() => {
          onImgClick(picture.largeImageURL, picture.tags);
        }}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
