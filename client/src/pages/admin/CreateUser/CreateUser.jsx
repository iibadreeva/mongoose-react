import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getUsers, userRegister } from '@/reducers/user/action';
import {
  usersSelector,
  userLoadingSelector,
  usersErrorSelector
} from '@/reducers/user/selectors';
import { CreateUserList } from '@/pages/admin/CreateUser/CreateUserList/CreateUserList.jsx';
import { Loader } from '@/components/Loader/Loader.jsx';
import { Success } from '@/components/Success/Success.jsx';

import './CreateUser.scss';

export const CreateUser = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => ({
      users: usersSelector(state),
      loading: userLoadingSelector(state),
      error: usersErrorSelector(state)
    }),
    shallowEqual
  );

  const [formdata, setFormdata] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    success: false
  });

  const handleInputName = useCallback(
    (event) => {
      const newFormData = { ...formdata };
      newFormData.name = event.target.value;
      setFormdata(newFormData);
    },
    [formdata]
  );

  const handleInputLastname = useCallback(
    (event) => {
      const newFormData = { ...formdata };
      newFormData.lastname = event.target.value;
      setFormdata(newFormData);
    },
    [formdata]
  );

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

      dispatch(userRegister(formdata, users));

      const newFormData = { ...formdata };
      newFormData.name = '';
      newFormData.lastname = '';
      newFormData.email = '';
      newFormData.password = '';
      newFormData.success = true;
      setFormdata(newFormData);
    },
    [dispatch, formdata, users]
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (formdata.success) {
      setTimeout(() => {
        const newFormData = { ...formdata };
        newFormData.success = false;
        setFormdata(newFormData);
      }, 1000);
    }
  }, [formdata]);

  return (
    <form className="form" onSubmit={submitForm}>
      {loading && <Loader />}
      {formdata.success && <Success />}
      <h2>Добавить пользователя</h2>

      <div className="form__element">
        <input
          type="text"
          placeholder="Имя"
          value={formdata.name}
          onChange={handleInputName}
        />
      </div>

      <div className="form__element">
        <input
          type="text"
          placeholder="Фамилия"
          value={formdata.lastname}
          onChange={handleInputLastname}
        />
      </div>

      <div className="form__element">
        <input
          type="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handleInputEmail}
        />
      </div>

      <div className="form__element">
        <input
          type="password"
          placeholder="Пароль"
          value={formdata.password}
          onChange={handleInputPassword}
        />
      </div>

      <button type="submit">Создать</button>
      <div className="error">{error && error}</div>
      <div className="current_users">
        <h4>Все пользователи:</h4>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <CreateUserList key={user._id} user={user} />
              ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};
