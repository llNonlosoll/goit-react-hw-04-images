import { ImageGalleryItem } from 'components/ImageGalleryItemComponent/ImageGalleryItem';
import { List } from './ImageGallery.styled';

//Галерея
export function ImageGallery({ pictures, onClick }) {
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
}
