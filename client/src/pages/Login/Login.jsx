import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '@/reducers/user/action';
import { loginSelector } from '@/reducers/user/selectors';

export const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector(loginSelector);
  const history = useHistory();

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
    error: '',
    success: false
  });

  const handleInputEmail = useCallback(
    (event) => {
      const newFormData = { ...formdata };
      newFormData.email = event.target.value;
      setFormdata(newFormData);
    },
    [formdata]
  );

  const handleInputPassword = useCallback(
    (event) => {
      const newFormData = { ...formdata };
      newFormData.password = event.target.value;
      setFormdata(newFormData);
    },
    [formdata]
  );

  const submitForm = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginUser(formdata));
    },
    [dispatch, formdata]
  );

  useEffect(() => {
    if (login && login.isAuth) {
      history.replace('/');
    }
  }, [login, history]);

  return (
    <form className="form" onSubmit={submitForm}>
      <h2>Авторизация</h2>

      <div className="form__element">
        <input
          type="email"
          placeholder="Введите свой email"
          value={formdata.email}
          onChange={handleInputEmail}
        />
      </div>

      <div className="form__element">
        <input
          type="password"
          placeholder="Введите свой пароль"
          value={formdata.password}
          onChange={handleInputPassword}
        />
      </div>

      <button type="submit">Отправить</button>

      <div className="error">{login ? <div>{login.message}</div> : null}</div>
    </form>
  );
};
