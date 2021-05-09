import { client } from '@/api';

import {
  USER_LOGIN,
  USER_REQUEST,
  USER_FAILURE,
  USER_POST_REQUEST,
  GET_USER_BOOKS
} from './constants';

const userPostRequest = () => ({ type: USER_POST_REQUEST });

const userRequest = () => ({ type: USER_REQUEST });

const userFailure = (error) => ({
  type: USER_FAILURE,
  payload: error
});

const userLogin = (data) => ({
  type: USER_LOGIN,
  payload: data
});

const userBooks = (data) => ({
  type: GET_USER_BOOKS,
  payload: data
});

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(userRequest());

  client
    .post('/login', { email, password })
    .then((response) => {
      const { data } = response;
      dispatch(userLogin(data));
    })
    .catch(() => {
      dispatch(userFailure('Произошла ошибка, попробуйте подзднее'));
    });
};

export const checkAuth = () => (dispatch) => {
  dispatch(userRequest());

  client
    .get('/auth')
    .then((response) => {
      const { data } = response;
      dispatch(userLogin(data));
    })
    .catch(() => {
      dispatch(userFailure('Произошла ошибка, попробуйте подзднее'));
    });
};

export const getUserPosts = (userId) => (dispatch) => {
  dispatch(userPostRequest());

  client
    .get(`/user_posts?user=${userId}`)
    .then((response) => {
      dispatch(userBooks(response.data));
    })
    .catch(() => {
      dispatch(userFailure('Произошла ошибка, попробуйте подзднее'));
    });
};
