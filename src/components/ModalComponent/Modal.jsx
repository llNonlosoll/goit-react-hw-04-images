import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = 'visible';
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
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={modalImgURL} alt={tagsImg} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalImgURL: PropTypes.string.isRequired,
  tagsImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
