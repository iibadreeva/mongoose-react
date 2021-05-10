import { client } from '@/api';

import {
  GET_BOOKS,
  GET_BOOK,
  BOOKS_FAILURE,
  BOOKS_REQUEST,
  ADD_BOOK,
  UPDATE_BOOK,
  CLEAR_BOOK,
  DELETE_BOOK
} from './constants';

const bookRequest = () => ({ type: BOOKS_REQUEST });

const bookFailure = (error) => ({
  type: BOOKS_FAILURE,
  payload: error
});

const booksSuccess = (data) => ({
  type: GET_BOOKS,
  payload: data
});

const bookSuccess = (data) => ({
  type: GET_BOOK,
  payload: data
});

const addBookSuccess = (data) => ({
  type: ADD_BOOK,
  payload: data
});

const updateBookSuccess = (data) => ({
  type: UPDATE_BOOK,
  payload: data
});

const deleteBookSuccess = (data) => ({
  type: DELETE_BOOK,
  payload: data
});

export const cleareBook = () => ({
  type: CLEAR_BOOK,
  payload: { book: null, newbook: null, updatebook: false, deletebook: false }
});

export const getBooks = (limit = 10, start = 0, order = 'asc', list = '') => (
  dispatch
) => {
  dispatch(bookRequest());
  // api/books?skip=1&limit=5&order=asc
  client
    .get(`/books?limit=${limit}&skip=${start}&order=${order}`)
    .then((res) => {
      if (list) {
        dispatch(booksSuccess([...list, ...res.data]));
      } else {
        dispatch(booksSuccess(res.data));
      }
    })
    .catch(() => {
      dispatch(bookFailure('Произошла ошибка, попробуйти повторить позднее'));
    });
};

export const getBookReviewer = (id) => (dispatch) => {
  dispatch(bookRequest());

  client
    .get(`/getBook?id=${id}`)
    .then((response) => {
      const book = response.data;
      client
        .get(`/getReviewer?id=${book.ownerId}`)
        .then((res) => {
          const user = res.data;
          const data = {
            book,
            reviewer: user
          };
          dispatch(bookSuccess(data));
        })
        .catch(() => {
          dispatch(
            bookFailure('Произошла ошибка, попробуйти повторить позднее')
          );
        });
    })
    .catch(() => {
      dispatch(bookFailure('Произошла ошибка, попробуйти повторить позднее'));
    });
};

export const addBook = (book) => (dispatch) => {
  dispatch(bookRequest());

  client
    .post('/book', book)
    .then((response) => {
      if (response.status === 200) {
        dispatch(addBookSuccess(response.data));
      }
    })
    .catch(() => {
      dispatch(bookFailure('Произошла ошибка, попробуйти повторить позднее'));
    });
};

export const updateBook = (book) => (dispatch) => {
  dispatch(bookRequest());

  client
    .put('/book_update', book)
    .then((response) => {
      if (response.status === 200) {
        dispatch(updateBookSuccess(response.data));
      }
    })
    .catch(() => {
      dispatch(bookFailure('Произошла ошибка, попробуйти повторить позднее'));
    });
};

export const removeBook = (id) => (dispatch) => {
  dispatch(bookRequest());

  client
    .delete(`/delete_book?id=${id}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(deleteBookSuccess(response.data));
      }
    })
    .catch(() => {
      dispatch(bookFailure('Произошла ошибка, попробуйти повторить позднее'));
    });
};
