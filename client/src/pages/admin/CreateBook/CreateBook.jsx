import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addBook, cleareBook } from '@/reducers/book/action';
import { loadSelector, newBookSelector } from '@/reducers/book/selectors';
import { Loader } from '@/components/Loader/Loader.jsx';

import './CreateBook.scss';

export const CreateBook = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { load, book } = useSelector(
    (state) => ({
      load: loadSelector(state),
      book: newBookSelector(state)
    }),
    shallowEqual
  );

  const [formdata, setFormdata] = useState({
    name: '',
    author: '',
    review: '',
    pages: '',
    rating: '5',
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

      dispatch(
        addBook({
          ...formdata,
          ownerId: user.id
        })
      );
    },
    [dispatch, formdata, user]
  );

  useEffect(() => {
    if (book && book.post) {
      dispatch(cleareBook());
      history.replace(`/book/${book.bookId}`);
    }
  }, [book, history, dispatch]);

  return (
    <form className="form" onSubmit={submitForm}>
      {load && <Loader />}
      <h2>Добавление новой книги</h2>

      <div className="form__element">
        <input
          type="text"
          placeholder="Название книги"
          value={formdata.name}
          onChange={(event) => handleInput(event, 'name')}
        />
      </div>

      <div className="form__element">
        <input
          type="text"
          placeholder="Автор книги"
          value={formdata.author}
          onChange={(event) => handleInput(event, 'author')}
        />
      </div>

      <div className="form__element">
        <textarea
          value={formdata.review}
          onChange={(event) => handleInput(event, 'review')}
        />
      </div>

      <div className="form__element">
        <input
          type="number"
          placeholder="Кол. страниц"
          value={formdata.pages}
          onChange={(event) => handleInput(event, 'pages')}
        />
      </div>

      <div className="form__element">
        <select
          value={formdata.rating}
          onChange={(event) => handleInput(event, 'rating')}
        >
          <option val="1">1</option>
          <option val="2">2</option>
          <option val="3">3</option>
          <option val="4">4</option>
          <option selected val="5">
            5
          </option>
        </select>
      </div>

      <div className="form__element">
        <input
          type="number"
          placeholder="Цена книги"
          value={formdata.price}
          onChange={(event) => handleInput(event, 'price')}
        />
      </div>

      <button type="submit">Создать книгу</button>
    </form>
  );
};
