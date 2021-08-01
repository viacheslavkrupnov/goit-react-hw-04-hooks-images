import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ src, alt, toggleModal, largeImageURL }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        className={s.ImageGalleryItem_image}
        onClick={() => toggleModal(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
