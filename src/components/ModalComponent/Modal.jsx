import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImgURL, tagsImg } = this.props;

    return (
      <div className="overlay" onClick={this.onBackdropClick}>
        <div className="modal">
          <img src={modalImgURL} alt={tagsImg} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImgURL: PropTypes.string.isRequired,
  tagsImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
