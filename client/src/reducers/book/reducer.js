import {
  GET_BOOKS,
  GET_BOOK,
  BOOKS_FAILURE,
  BOOKS_REQUEST,
  ADD_BOOK,
  UPDATE_BOOK,
  CLEAR_UPDATE,
  DELETE_BOOK
} from './constants';

export const bookReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return { ...state, load: true, error: false };
    case BOOKS_FAILURE:
      return { ...state, load: false, error: action.payload };
    case GET_BOOKS:
      return { ...state, list: action.payload, load: false };
    case GET_BOOK:
      return { ...state, book: action.payload, load: false, updatebook: null };
    case ADD_BOOK:
      return { ...state, newbook: action.payload, load: false };
    case UPDATE_BOOK:
      return { ...state, updatebook: action.payload, load: false };
    case DELETE_BOOK:
      return { ...state, load: false };
    case CLEAR_UPDATE:
      return { ...state, updatebook: null };
    default:
      return state;
  }
};
