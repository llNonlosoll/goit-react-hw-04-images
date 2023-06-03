import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ picture }) => {
  return (
    <li className="gallery-item">
      <img src={picture.webformatURL} alt={picture.tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
