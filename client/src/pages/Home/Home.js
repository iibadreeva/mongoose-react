import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  booksSelector,
  loadSelector,
  errorSelector
} from '../../reducers/book/selectors';
import { getBooks } from '../../reducers/book/action';
import { BookList } from './BookList/BookList';

import './Home.scss';

export const Home = () => {
  const [books, setBook] = useState([]);
  const { booksData, error, loading } = useSelector(
    (state) => ({
      booksData: booksSelector(state),
      loading: loadSelector(state),
      error: errorSelector(state)
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    const count = booksData.length;
    dispatch(getBooks(2, count, 'desc', booksData));
    setBook(booksData);
  }, [dispatch, booksData]);

  useEffect(() => {
    dispatch(getBooks(2, 0, 'desc'));
  }, [dispatch]);

  useEffect(() => {
    setBook(booksData);
  }, [booksData]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="home">
      <div>
        {error && error}
        {books && books.length === 0 && <p>На данный момент книг нет</p>}
        {books && books.map((item) => <BookList key={item._id} {...item} />)}
      </div>
      <div className="home__loadmore" onClick={loadMore} role="presentation">
        Показать еще
      </div>
    </div>
  );
};
