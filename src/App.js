import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Searchbar from './components/Searchbar';

import pixabayAPI from './services/apiPixabay';
import ImagesErrorView from './components/ImagesErrorView';
import LoaderView from './components/LoaderView';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [arePicturesOver, setArePicturesOver] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [largeURL, setLargeURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);

    pixabayAPI
      .fetchPixabay(imageName, page)
      .then(newImages => {
        if (newImages.total !== 0) {
          setImages(prevImages => [...prevImages, ...newImages.hits]);
          setArePicturesOver(newImages.totalHits - page * 12 <= 0);
          setStatus(Status.RESOLVED);
        } else return Promise.reject(new Error('Invalid request'));
        return window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName, page, setImages]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handelFormSubmit = name => {
    setImageName(name);
    setImages([]);
    setPage(1);
  };

  const toggleModal = largeURL => {
    setShowModal(!showModal);
    setLargeURL(largeURL);
    setAlt('');
  };

  return (
    <Container>
      <Searchbar onSubmit={handelFormSubmit} />
      <ToastContainer autoClose={3000} />

      {status === Status.IDLE && <p>Please enter a value for search images</p>}

      {status === Status.PENDING && <LoaderView />}

      {status === Status.REJECTED && (
        <ImagesErrorView message={error.message} />
      )}

      {status === Status.RESOLVED && (
        <>
          <ImageGallery toggleModal={toggleModal} images={images} />

          {showModal && (
            <Modal onClose={toggleModal} src={largeURL} alt={alt} />
          )}

          {status === Status.RESOLVED && !arePicturesOver && (
            <Button onLoadMore={onLoadMore} />
          )}
        </>
      )}
    </Container>
  );
}

export default App;
