import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getBookReviewer,
  updateBook,
  clearUpdateBook,
  removeBook
} from '@/reducers/book/action';
import {
  bookSelector,
  loadSelector,
  errorSelector,
  updateBookSelector
} from '@/reducers/book/selectors';
import { Loader } from '@/components/Loader/Loader.jsx';
import { Success } from '@/components/Success/Success.jsx';

export const EditBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { load, error, book, upbook } = useSelector(
    (state) => ({
      load: loadSelector(state),
      error: errorSelector(state),
      book: bookSelector(state),
      upbook: updateBookSelector(state)
    }),
    shallowEqual
  );

  const [isBook, setBook] = useState(false);
  const [errorMessege, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formdata, setFormdata] = useState({
    _id: id,
    name: '',
    author: '',
    review: '',
    pages: '',
    rating: '',
    price: ''
  });

  const handleInput = useCallback(
    (event, name) => {
      const newFormData = { ...formdata };
      newFormData[name] = event.target.value;
      setFormdata(newFormData);
    },
    [formdata]
  );

  const submitForm = useCallback(
    (event) => {
      event.preventDefault();

      dispatch(updateBook(formdata));
    },
    [dispatch, formdata]
  );

  const deleteBook = useCallback(
    (event) => {
      event.preventDefault();
      console.log(id);

      dispatch(removeBook(id));
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (upbook && upbook.success) {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        dispatch(clearUpdateBook());
      }, 1000);
    }
    setError(error);
  }, [dispatch, upbook, error]);

  useEffect(() => {
    dispatch(getBookReviewer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (book && !isBook && book.book._id === id) {
      const newFormData = { ...formdata };
      newFormData.name = book.book.name;
      newFormData.author = book.book.author;
      newFormData.review = book.book.review;
      newFormData.pages = book.book.pages;
      newFormData.rating = book.book.rating;
      newFormData.price = book.book.price;

      setFormdata(newFormData);
      setBook(true);
    }
  }, [book, formdata, isBook, id]);

  return (
    <div className="rl_container article">
      {load && <Loader />}
      {error && errorMessege}
      {success && <Success />}

      <form onSubmit={submitForm}>
        <h2>Редактирование книги</h2>

        <div className="form_element">
          <input
            type="text"
            placeholder="Название книги"
            value={formdata.name}
            onChange={(event) => handleInput(event, 'name')}
          />
        </div>

        <div className="form_element">
          <input
            type="text"
            placeholder="Автор книги"
            value={formdata.author}
            onChange={(event) => handleInput(event, 'author')}
          />
        </div>

        <textarea
          value={formdata.review}
          onChange={(event) => handleInput(event, 'review')}
        />

        <div className="form_element">
          <input
            type="number"
            placeholder="Кол. страниц"
            value={formdata.pages}
            onChange={(event) => handleInput(event, 'pages')}
          />
        </div>

        <div className="form_element">
          <select
            value={formdata.rating}
            onChange={(event) => handleInput(event, 'rating')}
          >
            <option val="1" selected={formdata.rating === '1'}>
              1
            </option>
            <option val="2" selected={formdata.rating === '2'}>
              2
            </option>
            <option val="3" selected={formdata.rating === '3'}>
              3
            </option>
            <option val="4" selected={formdata.rating === '4'}>
              4
            </option>
            <option val="5" selected={formdata.rating === '5'}>
              5
            </option>
          </select>
        </div>

        <div className="form_element">
          <input
            type="number"
            placeholder="Цена книги"
            value={formdata.price}
            onChange={(event) => handleInput(event, 'price')}
          />
        </div>

        <button type="submit">Редактировать книгу</button>
        <button
          className="delete_post__button"
          type="button"
          onClick={deleteBook}
        >
          Удалить книгу
        </button>
      </form>
    </div>
  );
};
