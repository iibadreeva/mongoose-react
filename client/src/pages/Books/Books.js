import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getBookReviewer } from '../../reducers/book/action';
import {
  bookSelector,
  errorSelector,
  loadSelector
} from '../../reducers/book/selectors';

import './Books.scss';

export const Books = () => {
  const [book, setBook] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { bookData, error, loading } = useSelector((state) => {
    return {
      bookData: bookSelector(state),
      loading: loadSelector(state),
      error: errorSelector(state)
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getBookReviewer(id));
  }, [dispatch, id]);

  useEffect(() => {
    setBook(bookData);
  }, [bookData]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="books">
      {error && error}
      {book && (
        <>
          <div className="books__header">
            <h2>{book.book.name}</h2>
            <h5>{book.book.author}</h5>
            <div className="books__header__reviewer">
              <span>Обзор:</span> {book.reviewer.name} {book.reviewer.lastname}
            </div>
          </div>
          <div className="books__review">{book.book.review}</div>
          <div className="books__box">
            <div className="books__box__left">
              <div>
                <span>Страниц:</span> {book.book.pages}
              </div>
              <div>
                <span>Цена:</span> {book.book.price} руб.
              </div>
            </div>
            <div className="books__box__right">
              <span>Рейтинг</span>
              <div>{book.book.rating}/5</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
