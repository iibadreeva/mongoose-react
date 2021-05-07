import { GET_BOOKS, GET_BOOK, BOOKS_FAILURE, BOOKS_REQUEST } from './constants';
import { client } from '../../api';

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
