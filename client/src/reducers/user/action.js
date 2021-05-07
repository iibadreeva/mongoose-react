import { USER_LOGIN } from './constants';
import { client } from '../../api';

const userRequest = () => {
  return {
    type: 'BOOKS_REQUEST'
  };
};

const userFailure = (error) => {
  return {
    type: '',
    payload: error
  };
};

const userLogin = (data) => {
  return {
    type: USER_LOGIN,
    payload: data
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
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
