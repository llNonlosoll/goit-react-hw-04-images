import PropTypes from 'prop-types';
import { ButtonLoadMore, ButtonContainer } from './Button.styled';

// Кнопка загрузити ще
export const Button = ({ onClick }) => {
  return (
    <ButtonContainer>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load more
      </ButtonLoadMore>
    </ButtonContainer>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
