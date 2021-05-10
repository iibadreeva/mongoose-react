import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userLogout } from '@/reducers/user/action';
import { pendingSelector, usersErrorSelector } from '@/reducers/user/selectors';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/Loader/Loader.jsx';

export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useAuth();

  const { loading, error } = useSelector(
    (state) => ({
      loading: pendingSelector(state),
      error: usersErrorSelector(state)
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(userLogout());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      history.replace('/');
    }
  }, [isAuth, history]);
  return (
    <div>
      {error && error}
      {loading && <Loader />}
    </div>
  );
};
