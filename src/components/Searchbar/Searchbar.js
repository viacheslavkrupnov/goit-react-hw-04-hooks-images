import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handelFormSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      return toast.info('Please enter search query');
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handelFormSubmit}>
        <button type="submit" className={s.SearchFormBtn}>
          <GrSearch />
          {/* <span className={s.SearchForm_button_label}>Search</span> */}
        </button>

        <input
          value={imageName}
          onChange={handleNameChange}
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
