import { GET_BOOKS, GET_BOOK, BOOKS_FAILURE, BOOKS_REQUEST } from './constants';

export const bookReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return { ...state, load: true, error: false };
    case BOOKS_FAILURE:
      return { ...state, load: false, error: action.error };
    case GET_BOOKS:
      return { ...state, list: action.payload, load: false };
    case GET_BOOK:
      return { ...state, book: action.payload, load: false };
    default:
      return state;
  }
};
