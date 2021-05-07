import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../../reducers/user/action';
import { loginSelector } from '../../reducers/user/selectors';

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

  const handleInputEmail = useCallback((event) => {
    formdata.email = event.target.value;
    const newFormData = { ...formdata };
    setFormdata(newFormData);
  }, []);

  const handleInputPassword = useCallback((event) => {
    formdata.password = event.target.value;
    const newFormData = { ...formdata };
    setFormdata(newFormData);
  }, []);

  const submitForm = useCallback((event) => {
    event.preventDefault();
    dispatch(loginUser(formdata));
  }, []);

  useEffect(() => {
    if (login && login.isAuth) {
      history.replace('/');
    }
  }, [login]);

  return (
    <div className="rl_container">
      <form onSubmit={submitForm}>
        <h2>Log in here</h2>

        <div className="form_element">
          <input
            type="email"
            placeholder="Enter your mail"
            value={formdata.email}
            onChange={handleInputEmail}
          />
        </div>

        <div className="form_element">
          <input
            type="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleInputPassword}
          />
        </div>

        <button type="submit">Log in</button>

        <div className="error">{login ? <div>{login.message}</div> : null}</div>
      </form>
    </div>
  );
};
