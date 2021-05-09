import {
  USER_LOGIN,
  USER_POST_REQUEST,
  GET_USER_BOOKS,
  USER_REQUEST,
  USER_FAILURE,
  AUTH_REQUEST,
  AUTH_CHECK_FAILURE
} from './constants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, error: null, pending: true };
    case AUTH_CHECK_FAILURE:
      return { ...state, pending: false, isAuth: false };
    case USER_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
        pending: false
      };
    case USER_FAILURE:
      return { ...state, load: false, error: action.payload };
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        load: false,
        error: false
      };
    case USER_POST_REQUEST:
      return { ...state, error: false, loader: true };
    case GET_USER_BOOKS:
      return {
        ...state,
        error: false,
        loader: false,
        userBooks: action.payload
      };
    default:
      return state;
  }
};
